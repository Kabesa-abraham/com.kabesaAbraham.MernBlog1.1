import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
import { FaGithub ,FaDiscord } from "react-icons/fa";
import {BsFacebook,BsInstagram,BsTwitter ,BsGithub} from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className='bg-[#ffffff0f] border border-t-4 border-t-pink-500 rounded-md py-10 px-4' >
      <div className='w-full max-w-7xl mx-auto' >
        <div className='grid w-full justify-between sm:flex md:grid-cols-1' >
            <div className='mt-2' >
              <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold' >
                  <span className='px-2 py-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 text-white
                  rounded-lg 
                ' >Abram's</span>Blog
              </Link>
            </div>

            <div className='grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6' >

              <div className='flex flex-col aboutContainer' >
                <h1 className='text-xl font-bold text-gray-500 my-3' >A PROPOS</h1>
                <div className='flex flex-col gap-4 text-lg font-semibold text-gray-400' >
                  <span>
                    <a href="/#" target='_blank'>100 Projets JS</a>
                  </span>
                  <span>
                    <a href="/about" target='_blank'>Abram's Blog</a>
                  </span>
                </div>
              </div>

              <div className='flex flex-col followContainer' >
                <h1 className='text-xl font-bold text-gray-500 my-3' >NOUS SUIVREZ</h1>
                <div className='flex flex-col gap-4 text-lg font-semibold text-gray-400' >
                  <span>
                    <a href="https://www.github.com/Kabesa-abraham" target='_blank' 
                       className='flex gap-3 items-center' >Github <FaGithub/></a>
                  </span>
                  <span>
                    <a href="/#" target='_blank'
                      className='flex gap-3 items-center'>Discord <FaDiscord/></a>
                  </span>
                </div>
              </div>

              <div className='flex flex-col legalContainer' >
                <h1 className='text-xl font-bold text-gray-500 my-3' >LEGAL</h1>
                <div className='flex flex-col gap-4 text-lg font-semibold text-gray-400' >
                  <span>
                    <a href="/#" target='_blank'> Politique de Confidentialité</a>
                  </span>
                  <span>
                    <a href="/about" target='_blank'>Termes &amp; Conditions</a>
                  </span>
                </div>
              </div>

            </div>
        </div>

       <hr className='my-5' />
        <div className='w-full sm:flex sm:items-center sm:justify-between' >
          <a href='#' className='text-gray-400 text-xl '>&#169; {new Date().getFullYear()} Abram's Blog  </a>
          <div className='flex gap-6 sm:gap-11 sm:mt-0 mt-4 text-3xl sm:justify-center text-gray-400' >
             <a href="#"><BsFacebook/></a>
             <a href="#"><BsInstagram/></a>
             <a href="#"><BsTwitter/></a>
             <a href="#"><BsGithub/></a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
