'use client';

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

import Image from "next/image";
import { MenuItem } from "@/data/MenuData";

interface DescriptionPopupProps {
  item: MenuItem;
  onClose: () => void;
}

export default function DescriptionPopup({ item, onClose }: DescriptionPopupProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-xl">{item.name}</DialogTitle>
        </DialogHeader>
        
        {item.photo && (
          <div className="relative w-full h-40 mx-auto">
            <Image 
              src={item.photo} 
              alt={item.name} 
              fill 
              className="object-cover rounded" 
              sizes="(max-width: 640px) 100vw, 640px"
            />
          </div>
        )}

        <DialogDescription className="text-gray-700 text-base mb-2">
           {item.description}
        </DialogDescription>

        <DialogFooter>
            <div className="flex flex-row w-full justify-between items-center">
                <p className="font-bold text-lg">Price: ₹{typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price).toFixed(2)}</p>
                
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <Image
                src={item.isVeg ? '/veg.png' : '/nonveg.png'}
                width={20}
                height={20}
                alt={item.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
              />
              {item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
            </div>

            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}