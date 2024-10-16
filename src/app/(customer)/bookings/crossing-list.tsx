import { CrossingCard } from "./crossing-card";
import { Crossing } from "@/app/(customer)/bookings/crossing.schema";

interface TripListProps {
  crossings: Crossing[];
  selectedCrossing: Crossing | null;
  onSelectCrossing: (crossing: Crossing) => void;
}

export function CrossingList({
  crossings,
  selectedCrossing,
  onSelectCrossing,
}: TripListProps) {
  return (
    <div>
      <div className="space-y-4">
        {crossings.map((crossing) => (
          <CrossingCard
            key={crossing.id}
            crossing={crossing}
            isSelected={selectedCrossing?.id === crossing.id}
            onSelect={() => onSelectCrossing(crossing)}
          />
        ))}
      </div>
    </div>
  );
}
