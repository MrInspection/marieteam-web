import { format } from "date-fns";
import { Ship, Waves } from "lucide-react";
import { Crossing } from "@/app/(customer)/bookings/crossing.schema";
import { SeaCondition, SeatType } from "@prisma/client";
import Image from "next/image";

interface TripDetailsProps {
  crossing: Crossing;
}

export function CrossingDetails({ crossing }: TripDetailsProps) {
  const getSeaConditionInfo = (condition: SeaCondition) => {
    switch (condition) {
      case "CALM":
        return {
          color: "text-green-500",
          bgColor: "bg-green-100",
          label: "Calm",
        };
      case "SLIGHTLY_ROUGH":
        return {
          color: "text-yellow-500",
          bgColor: "bg-yellow-100",
          label: "Slightly Rough",
        };
      case "ROUGH":
        return {
          color: "text-orange-500",
          bgColor: "bg-orange-100",
          label: "Rough",
        };
      case "VERY_ROUGH":
        return {
          color: "text-purple-700",
          bgColor: "bg-purple-100",
          label: "Very Rough",
        };
      default:
        return {
          color: "text-gray-500",
          bgColor: "bg-gray-100",
          label: "Unknown",
        };
    }
  };

  const captainLog = crossing.captainLogs?.[0];
  const seaCondition = captainLog?.seaCondition || "CALM";

  const getSeatTypeLabel = (seatType: SeatType) => {
    switch (seatType) {
      case "PASSENGER":
        return "Passenger";
      case "VEHICLE_UNDER_2M":
        return "Vehicle < 2m";
      case "VEHICLE_OVER_2M":
        return "Vehicle > 2m";
      default:
        return seatType;
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 p-2 rounded-2xl">
        <img
          src={
            crossing.boat.imageUrl ||
            "/placeholder.svg"
          }
          alt={crossing.boat.name}
          className="rounded-xl w-full aspect-video border-2 grayscale"
        />
        <div className="flex items-center space-x-2 border-2 px-4 py-2 rounded-xl mt-2">
          <Ship className="size-4" />
          <span className="font-semibold text-sm">{crossing.boat.name}</span>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-2">
        <div className="border-2 py-2 px-3 rounded-xl">
          <p className="text-sm text-muted-foreground">Departure</p>
          <p className="font-medium">{crossing.route.departurePort}</p>
        </div>
        <div className="border-2 py-2 px-3 rounded-xl">
          <p className="text-sm text-muted-foreground">Arrival</p>
          <p className="font-bold">{crossing.route.arrivalPort}</p>
        </div>
        <div className="border-2 py-2 px-3 rounded-xl">
          <p className="text-sm text-muted-foreground">Departure Time</p>
          <p className="font-medium">
            {format(crossing.departureTime, "HH:mm")}
          </p>
        </div>
        <div className="border-2 py-2 px-3 rounded-xl">
          <p className="text-sm text-muted-foreground">Sea Condition</p>
          <div
            className={`flex items-center space-x-1 ${
              getSeaConditionInfo(seaCondition).color
            }`}
          >
            <Waves className="w-4 h-4" />
            <span className="text-sm">
              {getSeaConditionInfo(seaCondition).label}
            </span>
          </div>
        </div>
      </section>

      <div>
        <h4 className="font-semibold mb-2">Available Seats:</h4>
        <div className="grid grid-cols-2 gap-2">
          {crossing.seatAvailability.map((seat) => (
            <div key={seat.seatType} className="border-2 py-2 px-3 rounded-xl">
              <p className="text-sm text-muted-foreground">
                {getSeatTypeLabel(seat.seatType)}:{" "}
                {seat.quantity - seat.bookedSeats}/{seat.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
