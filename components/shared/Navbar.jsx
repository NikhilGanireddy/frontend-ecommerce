"use client"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { useCart } from './../../context/CartContext';


const Navbar = () => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();

    //   console.log(cartItems.length)

    return <div>
        <div className=" lg:min-w-[80vw] min-w-[100vw] sm:px-4 lg:px-0 max-w-full lg:max-w-[75vw] w-full flex flex-row  pt-16 pb-4 border-b-[0.5px] border-b-black bg-transparent  justify-between ">
            <Link href="/" className="text-3xl font-bold  no-underline animate-fadeInUp">Wine & Liquor Store</Link>
            <div className="flex flex-row gap-4 justify-between items-center">
                <Link href="/products" className="no-underline animate-fadeInUpDelay">
                    Products
                </Link>
                <Link href="/cart" className="no-underline relative animate-fadeInUpDelay2">
                    {cartItems.length > 0 ? <span className="flex justify-between items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>{cartItems.length} </span>
                        : "Cart"}

                </Link>
                <SignedIn>
                    <UserButton className="animate-fadeInUpDelay2" afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                    <Link href="/sign-in" className="nav-link">Sign-in</Link>
                </SignedOut>
            </div>
        </div>
    </div>
}

export default Navbar