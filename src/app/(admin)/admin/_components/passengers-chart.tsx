"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

// Pass passenger counts as a prop
interface PassengerChartProps {
    chartData: { date: string; totalPassengers: number }[];
}

const chartConfig = {
    views: {
        label: "Passengers",
    },
    desktop: {
        label: "Passengers",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export function PassengersChart({ chartData }: PassengerChartProps) {
    React.useMemo(() => chartData.reduce((acc, curr) => acc + curr.totalPassengers, 0),
        [chartData]
    );

    return (
        <Card className={"col-span-full lg:col-span-3 rounded-2xl"}>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Passengers Transported</CardTitle>
                    <CardDescription>
                        Showing total passengers transported for the selected period
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        });
                                    }}
                                />
                            }
                        />
                        <Bar dataKey="totalPassengers" fill={`var(--color-desktop)`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
