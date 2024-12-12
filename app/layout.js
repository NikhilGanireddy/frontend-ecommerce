import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { CartProvider } from '../context/CartContext';
import Navbar from '@/components/shared/Navbar';
import { Poppins } from 'next/font/google'
import Image from 'next/image';
import { Toaster } from "./../components/ui/sonner"

export const metadata = {
  title: 'Wine & Liquor Store',
  description: 'An E-commerce store for wine and liquor'
}

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({ subsets: ['latin'], weight: '400' })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`min-w-[100vw] h-full min-h-screen flex flex-col items-center ${poppins.className}`}>
        <ClerkProvider>
          <CartProvider>
            {/* Wrap main content in a fade container for a smoother entry */}
            <div className="min-w-[100vw] min-h-screen flex flex-col items-center">
              {children}
            </div>
            <Toaster />
            
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}