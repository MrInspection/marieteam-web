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
}

type SeatCategory = {
  id: string
  name: string
  seatTypes: SeatType[]
  maxCapacity: number // Capacité maximale ajustée restante pour la catégorie
}

type ConfigureSeatsProps = {
  crossingId: string
  seatCategories: SeatCategory[]
}

export function ConfigureSeats({ crossingId, seatCategories }: ConfigureSeatsProps) {
  const [selectedSeats, setSelectedSeats] = useState<Record<string, number>>({})
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalSeatsByCategory, setTotalSeatsByCategory] = useState<Record<string, number>>({})

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
      const currentQuantity = prev[seatTypeId] || 0
      const newQuantity = Math.max(0, currentQuantity + change)

      const seatType = seatCategories.flatMap(cat => cat.seatTypes).find(st => st.id === seatTypeId)
      const totalSeatsForCategory = totalSeatsByCategory[seatCategoryId] || 0

      if (
          seatType &&
          newQuantity <= seatType.availableSeats &&
          totalSeatsForCategory + change <= seatCategories.find(cat => cat.id === seatCategoryId)?.maxCapacity!
      ) {
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
        <p className="text-muted-foreground text-sm">Select the seats you want to book for your trip.</p>
        <ScrollArea className="h-[26rem] mt-8 pr-6">
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
                              <span className="text-sm bg-blue-700/10 text-blue-500 px-1.5 py-0.5 rounded-lg font-bold ml-1">
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
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span>{selectedSeats[seatType.id] || 0}</span>
                            <Button
                                onClick={() => handleQuantityChange(seatType.id, category.id, 1)}
                                disabled={selectedSeats[seatType.id] >= seatType.availableSeats}
                                size="icon"
                                variant="outline"
                            >
                              <Plus className="w-4 h-4" />
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
          <Button onClick={handleContinue} className="mt-4 w-full">
            Continue <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
  )
}
