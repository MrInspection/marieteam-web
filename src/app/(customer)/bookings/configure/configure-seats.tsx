'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight, Minus, Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { configureSeatAction } from './configure.action'
import { formatName } from "@/app/(customer)/bookings/_components/utils"

type SeatType = {
  id: string
  name: string
  description: string
  price: number
  seatCategoryId: string
  availableSeats: number
  maxCapacity: number // Ajout de maxCapacity pour chaque type de siège
}

type SeatCategory = {
  id: string
  name: string
  seatTypes: SeatType[]
  availableSeats: number
}

type ConfigureSeatsProps = {
  crossingId: string
  seatCategories: SeatCategory[]
}

export function ConfigureSeats({ crossingId, seatCategories }: ConfigureSeatsProps) {
  const [selectedSeats, setSelectedSeats] = useState<Record<string, number>>({})
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalSeats, setTotalSeats] = useState(0)

  useEffect(() => {
    let amount = 0
    let seats = 0
    Object.entries(selectedSeats).forEach(([seatTypeId, quantity]) => {
      const seatType = seatCategories.flatMap(cat => cat.seatTypes).find(st => st.id === seatTypeId)
      if (seatType) {
        amount += seatType.price * quantity
        seats += quantity
      }
    })
    setTotalAmount(amount)
    setTotalSeats(seats)
  }, [selectedSeats, seatCategories])

  const handleQuantityChange = (seatTypeId: string, change: number) => {
    setSelectedSeats(prev => {
      const currentQuantity = prev[seatTypeId] || 0
      const newQuantity = Math.max(0, currentQuantity + change)
      const seatType = seatCategories.flatMap(cat => cat.seatTypes).find(st => st.id === seatTypeId)

      // On vérifie que la nouvelle quantité ne dépasse pas la capacité disponible
      if (seatType && newQuantity <= seatType.availableSeats) {
        return { ...prev, [seatTypeId]: newQuantity }
      }
      return prev
    })
  }

  const handleContinue = async () => {
    try {
      await configureSeatAction(crossingId, selectedSeats)
      console.log("Reservation successful")
    } catch (error) {
      console.error('Failed to create reservation:', error)
    }
  }

  return (
      <div>
        <h1 className="font-bold text-2xl">Book your seats</h1>
        <p className="text-muted-foreground text-sm">
          Select the seats you want to book for your trip.
        </p>
        <ScrollArea className="h-[26rem] mt-8 pr-6">
          <section className="space-y-6">
            {seatCategories.map((category) => (
                <div key={category.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">{formatName(category.name)}</h2>
                    <div className={"border-2 rounded-xl px-2 py-0.5 w-fit text-sm font-medium"}>0 seats</div>
                  </div>

                  <div className="grid gap-4">
                    {category.seatTypes.map((seatType) => (
                        <section
                            key={seatType.id}
                            className="border-2 rounded-2xl px-4 py-3 flex items-center justify-between"
                        >
                          <div>
                            <h3 className="font-medium">
                              {formatName(seatType.name)}{" "}
                              <span className="text-sm bg-blue-700/10 text-blue-500 px-1.5 py-0.5 rounded-lg font-bold ml-1">
                                {seatType.price.toFixed(2)}€
                              </span>
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {seatType.description}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleQuantityChange(seatType.id, -1)}
                                disabled={selectedSeats[seatType.id] === undefined || selectedSeats[seatType.id] <= 0}
                            >
                              <Minus className="size-4" />
                            </Button>
                            <span className="mx-2 w-6 text-center font-medium">
                        {selectedSeats[seatType.id] || 0}
                      </span>
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleQuantityChange(seatType.id, 1)}
                                disabled={selectedSeats[seatType.id] >= seatType.availableSeats}
                            >
                              <Plus className="size-4" />
                            </Button>
                          </div>
                        </section>
                    ))}
                  </div>
                </div>
            ))}
          </section>
        </ScrollArea>
        <div className="mt-8 border-t-2 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Selected Amount</p>
              <p className="font-medium text-xl">{totalSeats} Seats</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground text-right">Total Amount</p>
              <p className="font-medium text-xl text-right">{totalAmount.toFixed(2)} €</p>
            </div>
          </div>
          <Button
              className="w-full"
              size="lg"
              onClick={handleContinue}
              disabled={totalSeats === 0}
          >
            Continue
            <ChevronRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
  )
}
