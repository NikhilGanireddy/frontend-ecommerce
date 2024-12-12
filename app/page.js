"use client"
import Navbar from '@/components/shared/Navbar'
import Image from 'next/image'
import Wine from './../public/wine-bg.svg'
import Hero from './../public/hero2.jpg'
import { useAuth } from '@clerk/nextjs'

export default function HomePage () {

  const isSigned = useAuth()
  return (
    <div className=''>
      <Image
        className='absolute inset-0 w-full h-full -z-50 object-cover'
        src={Wine}
        alt='Wine Background'
        layout='fill'
        priority
      />
      <div className='relative lg:min-w-[80vw] min-w-[100vw] mx-4 lg:mx-0 max-w-full lg:max-w-[75vw] '>
        <Navbar />

        <div className='mt-48'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 py-20 items-center'>
            {/* Text Content */}
            <div className='space-y-6'>
              <h1 className='text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl animate-fadeInUp'>
                Welcome to the{' '}
                <span className='text-white'>Wine & Liquor Store</span>
              </h1>
              <p className='text-lg text-gray-700 max-w-prose animate-fadeInUpDelay'>
                Discover a world of fine wines, premium liquors, and exquisite
                spirits. Whether you’re looking for a rare vintage or the
                perfect bottle for a special occasion, we’ve got you covered.
              </p>
              <div className='space-x-4 animate-fadeInUpDelay2 flex justify-start w-full items'>
                <a
                  href='/products'
                  className='inline-block rounded-lg bg-black border-black px-5 py-3 text-base font-medium text-white hover:bg-black transform hover:scale-105 transition duration-300'
                >
                  Shop Now
                </a>
                {isSigned?<a
                  href='/cart'
                  className='flex justify-between items-center  rounded-lg border  border-black  px-5 py-3 text-base font-medium text-black  hover:text-white transform hover:scale-105 transition duration-300'
                >
                  Cart
                  
                </a>: <a
                  href='/sign-in'
                  className='flex justify-between items-center w-max rounded-lg border  border-black  px-5 py-3 text-base font-medium text-black  hover:text-white transform hover:scale-105 transition duration-300'
                >
                  Sign In
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-6 ml-2'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>}
                
              </div>
            </div>

            {/* Hero Image */}
            <div className='animate-fadeIn'>
              <Image
                src={Hero}
                alt='A selection of fine wines and liquors'
                className='w-full h-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
