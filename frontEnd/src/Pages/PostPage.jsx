import { Button, CircularProgress } from '@mui/material';
import React,{useEffect, useState} from 'react'
import './Style/postPage.css'
import { Link, useParams } from 'react-router-dom'
import imagePostTest from '../assets/img2.jpg'
import CalltoAction from '../Components/callToAction/CalltoAction';
import CommentSection from '../Components/commentSection/CommentSection';
import PostCart from '../Components/postCart/PostCart';

const PostPage = () => {

    const {postSlug} = useParams();

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [post ,setPost] = useState(null)

    useEffect(()=>{
        const fetchPost = async() =>{
            try {    
                setLoading(true)
                const res = await fetch(`/backend/post/getPosts?slug=${postSlug}`);
                const data = await res.json();

                if(!res.ok){
                    setError(true)
                    setLoading(false)
                    return;
                }if(res.ok){
                    setPost(data.posts[0]);
                    setLoading(false)
                    setError(false) 
                }
            } catch (error) {
               setLoading(false);
               setError(true) 
            }
        }

        fetchPost();
    },[postSlug])

    const [recentPosts,setRecentPosts] = useState(null);
    useEffect(() =>{
        try{
            const fetchRecentPosts = async () =>{
                const res = await fetch(`/backend/post/getPosts?limit=3`);
                const data = await res.json();

                if(res.ok){
                    setRecentPosts(data.posts)
                }
            }
            fetchRecentPosts();
         }catch(error){
            console.log(error.message)
        } 
    },[])



    if(loading) return(
        <div className='flex justify-center items-center min-h-screen' >
            <CircularProgress size={40} color='error' className='circularprogress'/>
        </div>
    )
    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen postpageContainer' >
            <h1 className='text-2xl md:text-3xl lg:text-4xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto' >
                {post && post.title}
            </h1>

            <Link to={`/search?category=${post&& post.category}`} className='self-center mt-5'>
                <Button className='catego_btn' >
                   {post && post.category} 
                </Button>
            </Link>

            <img src={post && post.image ? post.image : imagePostTest} 
                 alt={post && post.image ? post.image : post.title} 
                 className='mt-10 p-3 max-h-[600px] w-full object-cover '
            />

            <div className='flex justify-between p-3 border-b border-slate-300 max-w-2xl w-full 
              mx-auto text-xs ' >
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic' >{post && (post.content.length/1000).toFixed(0) } min de Lectures </span>
            </div>
            
            <div className='p-3 max-w-2xl mx-auto w-full content_Post'  
                           dangerouslySetInnerHTML={{__html:post && post.content}} >
            </div>

            <div className='max-w-4xl mx-auto w-full' >
                <CalltoAction/>
            </div>
           
            <CommentSection postId={post._id} />  {/*je met le postId dans cette composant */}

            <div className='flex flex-col justify-center items-center mb-5' >
                <h1 className='text-xl mt-5 '>Articles Récents</h1>

                <div className='flex flex-wrap 2xl:flex-nowrap gap-5 mt-5 justify-center' >
                   { recentPosts &&
                    recentPosts.map((posts,i) =>(
                        <PostCart
                        key={i}
                        post={posts}
                        />
                    ))
                   }
                </div>
            </div>

        </main>
    )

}

export default PostPage
