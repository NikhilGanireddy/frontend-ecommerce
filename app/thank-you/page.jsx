'use client'

import Navbar from '@/components/shared/Navbar'
import { useCart } from '../../context/CartContext'
import { useEffect } from 'react'
import { RedirectToSignIn, SignedOut } from '@clerk/nextjs'

export default function ThankYouPage () {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className=' h-full flex flex-col items-center'>
      <Navbar />
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <div className='mt-36 max-w-full lg:min-w-[80vw] sm:px-4 lg:px-0 min-w-full lg:max-w-[75vw]  py-4'>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-4 animate-fadeInUp'>
          Thank You!
        </h1>
        <p className='text-lg text-gray-600  text-left mb-8 animate-fadeInUpDelay'>
          Your order has been successfully placed. We appreciate your business
          and hope you enjoy your purchase. 
        </p>
        <a
          href="/products"
          className='bg-black text-white px-6 py-3 rounded-lg hover:bg-black hover:scale-105 transition-transform duration-300 animate-fadeInUpDelay2'
        >
          Continue Shopping
        </a>
      </div>
    </div>
  )
}
