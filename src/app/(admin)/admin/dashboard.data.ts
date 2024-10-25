"use server"

import {prisma} from "@/lib/db";

interface PassengerChartData {
    date: string;
    totalPassengers: number;
}

export async function getPassengerCounts(startDate: Date, endDate: Date): Promise<PassengerChartData[]> {
    const reservations = await prisma.reservation.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lte: endDate,
            },
            status: "PAID",
        },
        include: {
            seats: true, // Include related seats to count the passengers
        },
    });

    // Aggregate passenger counts by date
    const passengerCounts: Record<string, number> = {};

    reservations.forEach(reservation => {
        const date = reservation.createdAt.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
        const passengerCount = reservation.seats.reduce((sum, seat) => sum + seat.bookedSeats, 0); // Sum the booked seats

        // Accumulate total passengers for each date
        if (passengerCounts[date]) {
            passengerCounts[date] += passengerCount;
        } else {
            passengerCounts[date] = passengerCount;
        }
    });

    // Create a list of all dates in the range
    const allDates: PassengerChartData[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        const totalPassengers = passengerCounts[dateString] || 0; // Use 0 if no reservations on this date
        allDates.push({ date: dateString, totalPassengers });
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return allDates;
}

interface RevenueChartData {
    date: string;
    totalRevenue: number;
}

export async function getDailyRevenue(startDate: Date, endDate: Date): Promise<RevenueChartData[]> {
    const reservations = await prisma.reservation.findMany({
        where: {
            status: "PAID",
            createdAt: {
                gte: startDate,
                lte: endDate,
            },
        },
    });

    // Aggregate revenue by date
    const revenueByDate: Record<string, number> = {};

    reservations.forEach(reservation => {
        const date = reservation.createdAt.toISOString().split('T')[0];
        const totalAmount = reservation.totalAmount;

        if (revenueByDate[date]) {
            revenueByDate[date] += totalAmount;
        } else {
            revenueByDate[date] = totalAmount;
        }
    });

    // Create a list of all dates in the range
    const allDates: RevenueChartData[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        const totalRevenue = revenueByDate[dateString] || 0;
        allDates.push({ date: dateString, totalRevenue });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return allDates;
}

interface PassengerCategoryChartData {
    category: string; // The name of the seat category
    totalPassengers: number; // Total passengers for this category
}

export async function getPassengerDistributionByCategory(startDate: Date, endDate: Date): Promise<PassengerCategoryChartData[]> {
    const reservations = await prisma.reservation.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lte: endDate,
            },
            status: "PAID",
        },
        include: {
            seats: {
                include: {
                    seatType: {
                        include: {
                            seatCategory: true, // Include seat category to categorize passengers
                        },
                    },
                },
            },
        },
    });

    // Aggregate passenger counts by seat category
    const categoryCounts: Record<string, number> = {};

    reservations.forEach(reservation => {
        reservation.seats.forEach(seat => {
            const category = seat.seatType.seatCategory.name; // Get the name of the seat category

            if (categoryCounts[category]) {
                categoryCounts[category] += seat.bookedSeats; // Accumulate booked seats
            } else {
                categoryCounts[category] = seat.bookedSeats; // Initialize with booked seats
            }
        });
    });

    // Transform the aggregated data into the desired format
    const passengerDistribution: PassengerCategoryChartData[] = Object.keys(categoryCounts).map(category => ({
        category,
        totalPassengers: categoryCounts[category],
    }));

    return passengerDistribution;
}
