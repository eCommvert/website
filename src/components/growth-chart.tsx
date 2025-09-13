"use client";

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartLegendContent, ChartTooltipContent } from "@/components/charts/charts-base";
import { cx } from "@/utils/cx";

const chartData = [
  {
    month: "Month 1",
    growth: 45,
    current: 40,
  },
  {
    month: "Month 2", 
    growth: 35,
    current: 42,
  },
  {
    month: "Month 3",
    growth: 75,
    current: 38,
  },
  {
    month: "Month 4",
    growth: 55,
    current: 41,
  },
  {
    month: "Month 5",
    growth: 65,
    current: 39,
  },
  {
    month: "Month 6",
    growth: 50,
    current: 43,
  },
  {
    month: "Month 7",
    growth: 60,
    current: 44,
  },
];

export function GrowthChart() {

  const colors: Record<string, string> = {
    growth: "text-primary",
    current: "text-primary",
  };

  return (
    <div className="w-full">
      <div className="flex h-75 flex-col gap-2 bg-card/30 border border-border/50 rounded-lg p-4">
        <div className="mb-2 text-center">
          <h3 className="text-base font-medium text-muted-foreground">Performance Growth</h3>
          <p className="text-xs text-muted-foreground/70">Your performance is ahead of where you normally are</p>
        </div>
        
        <ResponsiveContainer className="h-full">
          <AreaChart
            data={chartData}
            className="text-muted-foreground [&_.recharts-text]:text-xs"
            margin={{
              left: -25,
              right: 10,
              top: 8,
              bottom: 8,
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="currentColor" className="text-primary" stopOpacity="0.7" />
                <stop offset="95%" stopColor="currentColor" className="text-primary" stopOpacity="0" />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="currentColor" className="text-border" strokeOpacity={0.05} />

            <Legend
              verticalAlign="top"
              align="center"
              layout="horizontal"
              content={<ChartLegendContent className="-translate-y-1" />}
            />

            <XAxis
              fill="currentColor"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              dataKey="month"
              padding={{ left: 0, right: 0 }}
              tick={{ fontSize: 10 }}
            />

            <YAxis
              fill="currentColor"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              tickFormatter={(value) => Number(value).toLocaleString()}
              tick={{ fontSize: 10 }}
            />

            <Tooltip
              content={<ChartTooltipContent />}
              formatter={(value) => Number(value).toLocaleString()}
              labelFormatter={(value) => value}
              cursor={{
                className: "stroke-primary stroke-2",
              }}
            />

            {/* Growth line (solid) - 20% growth */}
            <Area
              isAnimationActive={false}
              className={cx(colors["growth"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
              dataKey="growth"
              name="Growth"
              type="monotone"
              stroke="currentColor"
              strokeWidth={1.5}
              fill="url(#gradient)"
              fillOpacity={0.05}
              activeDot={{
                className: "fill-background stroke-primary stroke-1.5",
                r: 3,
              }}
            />

            {/* Current performance line (dashed) - past performance */}
            <Area
              isAnimationActive={false}
              className={cx(colors["current"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
              dataKey="current"
              name="Current Performance"
              type="monotone"
              stroke="currentColor"
              strokeWidth={1}
              fill="none"
              strokeDasharray="3 3"
              strokeLinecap="round"
              strokeOpacity={0.5}
              activeDot={{
                className: "fill-background stroke-primary stroke-1.5",
                r: 1.5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
