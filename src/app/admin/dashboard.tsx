"use client";

import {DateRange} from "react-day-picker";
import {useState, useEffect} from "react";
import {getDashboardKPIs} from "@/app/admin/dashboard-kpi.action";
import {
  getDailyRevenue,
  getPassengerCounts,
  getPassengerDistributionByCategory
} from "@/app/admin/dashboard.action";
import {Card, CardHeader} from "@/components/ui/card";
import {DollarSign, Sigma, Users, CreditCard} from "lucide-react";
import {DatePickerWithRange} from "@/app/admin/_components/date-picker";
import {PassengersChart} from "@/app/admin/_components/passengers-chart";
import {RevenueChart} from "@/app/admin/_components/revenues-chart";
import {PassengersDistributionChart} from "@/app/admin/_components/categories-chart";

type PassengerChartData = {
  date: string;
  totalPassengers: number;
}

type RevenueChartData = {
  date: string;
  totalRevenue: number;
}

type PassengerCategory = {
  category: string;
  totalPassengers: number;
}

export default function AdminDashboard() {
  const [kpis, setKpis] = useState({
    totalRevenue: 0,
    passengersTransported: 0,
    totalSales: 0,
    avgSpending: 0,
  });

  const [passengerChartData, setPassengerChartData] = useState<PassengerChartData[]>([]);
  const [revenueChartData, setRevenueChartData] = useState<RevenueChartData[]>([]); // State for revenue chart data
  const [passengerDistributionData, setPassengerDistributionData] = useState<PassengerCategory[]>([]); // State for passenger distribution data

  const initialFrom = new Date(2024, 5, 20);
  const initialTo = new Date(2024, 8, 20);

  useEffect(() => {
    const fetchData = async () => {
      const initialKPIs = await getDashboardKPIs(initialFrom, initialTo);
      setKpis(initialKPIs);

      const initialPassengerCounts = await getPassengerCounts(initialFrom, initialTo);
      setPassengerChartData(initialPassengerCounts); // Set initial chart data

      const initialRevenueData = await getDailyRevenue(initialFrom, initialTo); // Fetch initial revenue data
      setRevenueChartData(initialRevenueData); // Set initial revenue chart data

      // Fetch initial passenger distribution data
      const initialPassengerDistribution = await getPassengerDistributionByCategory(initialFrom, initialTo);
      setPassengerDistributionData(initialPassengerDistribution); // Set initial passenger distribution data
    };
    fetchData();
  }, []);

  const handleDateChange = async (range: DateRange) => {
    if (range.from && range.to) {
      // Fetch new KPIs based on selected date range
      const newKPIs = await getDashboardKPIs(range.from, range.to);
      setKpis(newKPIs); // Update state with new KPIs

      // Fetch new passenger counts for the selected date range
      const newPassengerCounts = await getPassengerCounts(range.from, range.to);
      setPassengerChartData(newPassengerCounts); // Update state with new chart data

      // Fetch new revenue data for the selected date range
      const newRevenueData = await getDailyRevenue(range.from, range.to); // Fetch new revenue data
      setRevenueChartData(newRevenueData); // Update state with new revenue chart data

      // Fetch new passenger distribution data for the selected date range
      const newPassengerDistribution = await getPassengerDistributionByCategory(range.from, range.to);
      setPassengerDistributionData(newPassengerDistribution); // Update state with new passenger distribution data
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <>
      <div className="flex max-md:flex-col max-md:gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <DatePickerWithRange onDateChange={handleDateChange}/>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between pb-1">
              <p className="font-medium text-sm tracking-tight">Total Revenue</p>
              <DollarSign className="size-4 text-muted-foreground"/>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(kpis.totalRevenue)}</p>
          </CardHeader>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between pb-1">
              <p className="font-medium text-sm tracking-tight">Passengers Transported</p>
              <Users className="size-4 text-muted-foreground"/>
            </div>
            <p className="text-2xl font-bold">{kpis.passengersTransported}</p>
          </CardHeader>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between pb-1">
              <p className="font-medium text-sm tracking-tight">Sales</p>
              <CreditCard className="size-4 text-muted-foreground"/>
            </div>
            <p className="text-2xl font-bold">{kpis.totalSales}</p>
          </CardHeader>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between pb-1">
              <p className="font-medium text-sm tracking-tight">Average Spending</p>
              <Sigma className="size-4 text-muted-foreground"/>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(kpis.avgSpending)}</p>
          </CardHeader>
        </Card>
      </div>
      <div className="mt-8 grid grid-cols-5 gap-4">
        <RevenueChart chartData={revenueChartData}/>
        <PassengersChart chartData={passengerChartData}/>
        <PassengersDistributionChart chartData={passengerDistributionData}/>
      </div>
    </>
  );
}
