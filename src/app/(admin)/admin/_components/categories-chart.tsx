"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// Interface for the passenger category data
interface PassengerCategory {
    category: string; // The seat category name
    totalPassengers: number; // Total passengers for this category
}

// Props for the PassengersDistributionChart component
interface PassengersDistributionChartProps {
    chartData: PassengerCategory[]; // Receive chart data as a prop
}

// Component to display the passenger distribution chart
export function PassengersDistributionChart({ chartData }: PassengersDistributionChartProps) {
    const chartConfig = {
        totalPassengers: {
            label: "Quantity",
            color: "hsl(var(--chart-1))",
        },
        label: {
            color: "hsl(var(--background))",
        },
    } satisfies ChartConfig

    return (
        <Card className={"col-span-full lg:col-span-2"}>
            <CardHeader>
                <CardTitle>Passenger Distribution by Seat Category</CardTitle>
                <CardDescription>Showing passenger distribution data</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="category"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            hide
                        />
                        <XAxis dataKey="totalPassengers" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar
                            dataKey="totalPassengers"
                            layout="vertical"
                            fill="var(--color-totalPassengers)"
                            radius={4}
                        >
                            <LabelList
                                dataKey="category"
                                position="insideLeft"
                                offset={8}
                                className="fill-[--color-label]"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="totalPassengers"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
