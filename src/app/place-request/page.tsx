'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/RequestCartContext';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft } from 'lucide-react';
import Image from 'next/image';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();

  if (cartItems.length === 0) {
    return (
      // <div className="flex flex-col items-center justify-center h-screen">
      //   <p className="text-lg text-gray-500">No Requests</p>
      // </div>
      router.back()
    );  
  }

  // const renderedCategories = new Set<string>();

  return (
    <div className="w-full flex flex-col h-screen bg-white">
          <div className="flex items-center p-4 border-b sticky top-0 z-50 bg-white">
            <button 
              onClick={() => router.back()}
              className="absolute text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-6 h-6" />
              {/* <span>Back</span> */}
            </button>
            <h1 className="mx-auto text-xl font-semibold">Review Requests</h1>
          </div>      
        <div className='flex-grow p-4'> 
        {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2 p-4 shadow-md rounded-lg">
          <div className="flex items-center">
            <Image src={item.image} alt={item.title} className="w-8 h-8 mr-4" />
            <span className="font-semibold text-sm">{item.title}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeFromCart(item.id)}
            className="p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      </div>
      <div className="sticky bottom-0 w-full p-4 bg-white border-t shadow-md">
          <Button className="w-full text-base rounded-full bg-blue-500 hover:bg-blue-600" size={'lg'}>Place Requests</Button>
      </div>
    </div>
  );
};

export default Cart;
