"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePickerWithRange({
                                        className,
                                        onDateChange,
                                    }: React.HTMLAttributes<HTMLDivElement> & { onDateChange: (range: DateRange) => void }) {
    const [date, setDate] = React.useState<DateRange>({
        from: new Date(2024, 9, 20),
        to: addDays(new Date(2024, 9, 20), 20), // Correct the month to 9 (October)
    });

    const handleDateChange = (range: DateRange | undefined) => {
        if (range && range.from && range.to) {
            setDate(range);
            onDateChange(range); // Notify the parent of the date change
        }
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date.from}
                        selected={date}
                        onSelect={handleDateChange} // Pass the date change
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}