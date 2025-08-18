"use client";

import { getDailyGrowthStats, IDailyGrowthStats } from "@/actions/overview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";

type Period = "7d" | "30d" | "90d";

const fetcher = async (period: Period): Promise<IDailyGrowthStats[]> => {
  const result = await getDailyGrowthStats(period);
  if (!result.success) {
    throw new Error(result.error || "Failed to load chart data.");
  }
  return result.data ?? [];
};

export const GrowthChart = () => {
  const t = useTranslations("Overview");
  const [period, setPeriod] = useState<Period>("30d");

  const { data, error, isLoading } = useSWR(
    ["daily-growth-stats", period],
    () => fetcher(period),
    {
      dedupingInterval: 300000, // 5 minutes
    }
  );

  const chartData = data ?? [];

  const totalUsers = chartData.reduce(
    (sum, item) => sum + item.new_users_count,
    0
  );
  const totalOrders = chartData.reduce(
    (sum, item) => sum + item.new_orders_count,
    0
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background border rounded-md shadow-lg">
          <p className="font-bold">{label}</p>
          <p style={{ color: "hsl(var(--chart-2))" }}>
            {t("newUsers")}: {payload[0].value}
          </p>
          <p style={{ color: "hsl(var(--chart-1))" }}>
            {t("newOrders")}: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("growthTrend")}</CardTitle>
          <CardDescription>
            {t("totalUsers")}: {totalUsers} | {t("totalOrders")}: {totalOrders}
          </CardDescription>
        </div>
        <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">{t("last7Days")}</SelectItem>
            <SelectItem value="30d">{t("last30Days")}</SelectItem>
            <SelectItem value="90d">{t("last90Days")}</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[350px] w-full" />
        ) : error ? (
          <div className="flex items-center justify-center h-[350px]">
            <p className="text-red-500">{error.message}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="report_date"
                // tickFormatter={(str) =>
                //   new Date(str).toLocaleDateString(undefined, {
                //     month: "short",
                //     day: "numeric",
                //   })
                // }
                tickFormatter={(str) => dayjs(str).format("MM/DD")}
                tickLine={false}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="new_users_count"
                name={t("newUsers")}
                stroke="hsl(var(--chart-2))"
                fill="url(#colorUsers)"
                fillOpacity={1}
              />
              <Area
                type="monotone"
                dataKey="new_orders_count"
                name={t("newOrders")}
                stroke="hsl(var(--chart-1))"
                fill="url(#colorOrders)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
