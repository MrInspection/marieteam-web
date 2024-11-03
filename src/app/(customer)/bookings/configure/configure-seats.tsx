'use client'

import React, {useState, useEffect} from 'react'
import {Button} from "@/components/ui/button"
import {ChevronRight, Loader, Minus, Plus} from "lucide-react"
import {ScrollArea} from "@/components/ui/scroll-area"
import {configureSeatAction} from './configure.action'
import {formatName} from "@/utils/text-formatter"
import {toast} from "sonner";

type SeatType = {
  id: string
  name: string
  description: string
  price: number
  seatCategoryId: string
  availableSeats: number
}

type SeatCategory = {
  id: string
  name: string
  seatTypes: SeatType[]
  maxCapacity: number
}

type ConfigureSeatsProps = {
  crossingId: string
  seatCategories: SeatCategory[]
  userId: string | undefined
}

export function ConfigureSeats({crossingId, seatCategories, userId}: ConfigureSeatsProps) {

  const [selectedSeats, setSelectedSeats] = useState<Record<string, number>>({})
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalSeatsByCategory, setTotalSeatsByCategory] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let amount = 0
    const categoryTotals: Record<string, number> = {}

    Object.entries(selectedSeats).forEach(([seatTypeId, quantity]) => {
      const seatType = seatCategories.flatMap(cat => cat.seatTypes).find(st => st.id === seatTypeId)
      if (seatType) {
        amount += seatType.price * quantity
        categoryTotals[seatType.seatCategoryId] = (categoryTotals[seatType.seatCategoryId] || 0) + quantity
      }
    })

    setTotalAmount(amount)
    setTotalSeatsByCategory(categoryTotals)
  }, [selectedSeats, seatCategories])

  const handleQuantityChange = (seatTypeId: string, seatCategoryId: string, change: number) => {
    setSelectedSeats(prev => {
      const currentQuantity = prev[seatTypeId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);

      const seatType = seatCategories.flatMap(cat => cat.seatTypes).find(st => st.id === seatTypeId);
      const totalSeatsForCategory = totalSeatsByCategory[seatCategoryId] || 0;

      const category = seatCategories.find(cat => cat.id === seatCategoryId);
      const maxCapacity = category ? category.maxCapacity : 0;

      if (
        seatType &&
        newQuantity <= seatType.availableSeats &&
        totalSeatsForCategory + change <= maxCapacity
      ) {
        return {...prev, [seatTypeId]: newQuantity};
      }
      return prev;
    });
  };

  const handleContinue = async () => {
    if (!userId) {
      toast.error("You must be connected in order to create a reservation");
      return;
    }

    setIsLoading(true);
    const seatsToReserve = Object.entries(selectedSeats).map(([seatTypeId, bookedSeats]) => ({
      seatTypeId,
      bookedSeats,
    }));

    try {
      await configureSeatAction(crossingId, seatsToReserve, totalAmount, userId);
      toast.success("Your reservation has been registered.");
    } catch (error) {
      setIsLoading(false)
      toast.error(`${error}`);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">Book your seats</h1>
      <p className="text-muted-foreground text-sm">Select the seats you want to book for your trip.</p>
      <ScrollArea className="lg:h-[26rem] mt-8 lg:pr-6">
        <section className="space-y-6">
          {seatCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <h2 className="font-bold text-lg">{formatName(category.name)}</h2>
              <div className="grid gap-4">
                {category.seatTypes.map((seatType) => (
                  <section
                    key={seatType.id}
                    className="border-2 rounded-2xl px-4 py-3 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-medium">
                        {formatName(seatType.name)}{" "}
                        <span
                          className="text-sm bg-violet-700/10 dark:bg-violet-700/25 text-violet-500 px-1.5 py-0.5 rounded-lg font-bold ml-1">
                                {seatType.price.toFixed(2)} €
                              </span>
                      </h3>
                      <p className="text-sm text-muted-foreground">{seatType.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleQuantityChange(seatType.id, category.id, -1)}
                        disabled={selectedSeats[seatType.id] === 0}
                        size="icon"
                        variant="outline"
                      >
                        <Minus className="w-4 h-4"/>
                      </Button>
                      <span>{selectedSeats[seatType.id] || 0}</span>
                      <Button
                        onClick={() => handleQuantityChange(seatType.id, category.id, 1)}
                        disabled={selectedSeats[seatType.id] >= seatType.availableSeats}
                        size="icon"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4"/>
                      </Button>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          ))}
        </section>
      </ScrollArea>
      <div className="mt-8">
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>{totalAmount.toFixed(2)} €</span>
        </div>
        <Button onClick={handleContinue} className="mt-4 w-full" disabled={totalAmount === 0 || isLoading}>
          {isLoading && <Loader className="size-4 animate-spin"/>}
          Continue <ChevronRight className="w-4 h-4"/>
        </Button>
      </div>
    </div>
  )
}
