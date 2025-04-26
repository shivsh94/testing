"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react"; // Added useMemo
import { useCart } from "@/context/FoodCartContext";
import { MenuItem } from "@/store/useProjectStore";
import Image from "next/image";

interface AddonsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MenuItem;
  category: string;
  categoryId: string;
}

export function Addons({ open, onOpenChange, item, category, categoryId }: AddonsProps) {
  const { addToCart } = useCart();
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const hasSubItems = item.sub_items && item.sub_items.length > 0;
  const displayItems = useMemo(() => { 
    return hasSubItems ? (item.sub_items ?? []) : [item];
  }, [hasSubItems, item]);

  useEffect(() => {
    if (hasSubItems && (displayItems?.length ?? 0) > 0) {
      setSelectedSubItem(displayItems?.[0]?.id ?? null);
    }
  }, [hasSubItems, displayItems]);

  const selectedItem = hasSubItems
    ? displayItems?.find((subItem) => subItem.id === selectedSubItem) ?? null
    : item;


  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const getPrice = () => {
    if (!selectedItem?.price) return 0;
    return Number(selectedItem.price) * quantity;
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;
    
    addToCart({
      id: `${selectedItem.id}-${Date.now()}`,
      menuItemId: selectedItem.id,
      name: selectedItem.name,
      photo: selectedItem.photo || item.photo || "",
      category,
      categoryId,
      price: selectedItem.price ? Number(selectedItem.price) : 0,
      quantity,
      isVeg: (selectedItem.food_type === "Vegetarian").toString(),
      parentName: hasSubItems ? item.name : null,
      parentId: hasSubItems ? item.id : null,
    });
    onOpenChange(false);
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="translate-y-0 rounded-t-2xl -my-4">
        <DialogHeader className="flex flex-row items-center justify-between space-x-2 relative">
          <DialogTitle>
            <p className="text-sm text-muted-foreground font-medium text-start">
              {item.name} - ₹{item?.price}
              {hasSubItems && selectedItem && ` - ${selectedItem.name}`}
              {selectedItem?.price &&
                ` - ₹${Number(selectedItem.price).toFixed(2)}`}
            </p>
            <p className="text-xl font-bold mt-1 text-start text-secondary-foreground">
              Customize your drink
            </p>
          </DialogTitle>

          {(selectedItem?.photo || item.photo) && (
            <div className="relative w-20 h-20">
              <Image
                src={selectedItem?.photo || item.photo || "/fallback-image.jpg"}
                alt={selectedItem?.name || item.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
        </DialogHeader>
        <Separator />

        <div className="grid gap-4 pb-4">
          <div>
            <h3 className="text-base font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground">Select serving size</p>
          </div>

          {displayItems.map((subItem) => (
            <div
              key={subItem.id}
              className={`flex items-center justify-between rounded-md border p-3 cursor-pointer ${
                selectedSubItem === subItem.id
                  ? "bg-accent border-primary"
                  : ""
              }`}
              onClick={() => setSelectedSubItem(subItem.id)}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="variant"
                  checked={selectedSubItem === subItem.id}
                  onChange={() => setSelectedSubItem(subItem.id)}
                  className="h-4 w-4"
                />
                <label className="text-sm font-medium">{subItem.name}</label>
              </div>
              <p className="text-sm font-medium">₹{Number(subItem.price).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <DialogFooter className="sticky bottom-0 bg-background">
          <div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="text-sm font-medium">{quantity}</span>
              <Button variant="outline" size="sm" onClick={incrementQuantity}>
                +
              </Button>
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            className="w-full h-fit"
            disabled={!selectedItem?.price}
          >
            Add to Cart | ₹{getPrice().toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}