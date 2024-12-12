"use client";

import { useCart } from '../../context/CartContext';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import Navbar from '@/components/shared/Navbar';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);

  if (!isSignedIn) {
    router.push('/sign-in');
    return null;
  }

  const total = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const handleQuantityChange = (productId, qty) => {
    updateQuantity(productId, Number(qty));
  }

  const handleCheckout = () => {
    setCheckoutInProgress(true);
    // Simulate checkout
    setTimeout(() => {
      router.push('/thank-you');
    }, 1000);
  }

  return (

    <div className=" h-full flex flex-col items-center">
      <Navbar />
      <div className='w-full mt-48 '>
        <h1 className='text-3xl font-bold'>Your Cart</h1>
        {cartItems.length === 0 && <p>Your cart is empty.</p>}
        {cartItems.length > 0 && (
          <div className='w-full'>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price Each</TableHead>
                  <TableHead>Sub Total</TableHead>

                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium"><img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell><Input

                      min="1"
                      className="form-control"
                      style={{ width: '60px' }}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    /></TableCell>
                    <TableCell className="text-right">${item.price}</TableCell>
                    <TableCell className="text-right">${item.price * item.quantity}</TableCell>
                    <TableCell className="text-right"><AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">
                          Remove
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will delete this item from your
                            cart.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className={`flex justify-between items-center`}>
                          <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                          <AlertDialogAction className="mt-2 bg-black text-white" onClick={() => removeFromCart(item.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog></TableCell>

                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">${total}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>

            <Button variant="outline" className=" mb-12" onClick={handleCheckout} disabled={checkoutInProgress}>
              {checkoutInProgress ? 'Processing...' : 'Checkout'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
