import React from 'react'
import { Link } from "react-router-dom";

const PostCart = ({post}) => {
  return (
    <div className='group relative w-full border border-indigo-500 hover:border-2 h-[365px] overflow-hidden 
        max-w-[408px] rounded-xl transition-all '>  {/*j'ai mis la classe group de tailwind */}
        <Link to={`/post/${post.slug}`} >
          <img src={post.image} alt="post cover" 
               className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20 '
          />
        </Link>
        <div className='p-3 flex flex-col gap-2' >
            <p className='text-lg font-semibold line-clamp-2' >
                {post.title}
            </p>
            <p className='italic' >{post.category}</p>
            <Link to={`/post/${post.slug}`}
                  className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-pink-500 text-pink-500
                  hover:bg-gradient-to-r from-indigo-500 via-purple-500 via-50% to-pink-500 hover:text-white hover:border-none m-2 
                  transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none'
              >
             <span>Lire Article</span>
            </Link>
        </div>
    </div>
  )
}

export default PostCart
