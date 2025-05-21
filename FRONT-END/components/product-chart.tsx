"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "lucide-react"

interface ProductChartProps {
  data: {
    labels: string[]
    values: number[]
    colors?: string[]
  }
  title: string
  description?: string
}

export default function ProductChart({ data, title, description }: ProductChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Clear previous chart
    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height)

    const chartWidth = chartRef.current.width
    const chartHeight = chartRef.current.height
    const padding = 40
    const labelPadding = 10
    const availableWidth = chartWidth - 2 * padding
    const availableHeight = chartHeight - 2 * padding - labelPadding
    const barWidth = availableWidth / data.labels.length / 2

    // Find the maximum value for scaling
    const maxValue = Math.max(...data.values, 1)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, chartHeight - padding)
    ctx.lineTo(chartWidth - padding, chartHeight - padding)
    ctx.strokeStyle = "rgba(100, 100, 100, 0.2)"
    ctx.stroke()

    // Draw bars
    data.values.forEach((value, index) => {
      const x = padding + (index * availableWidth) / data.labels.length + availableWidth / data.labels.length / 4
      const barHeight = (value / maxValue) * availableHeight
      const y = chartHeight - padding - barHeight

      // Draw bar
      ctx.fillStyle = data.colors?.[index] || "hsl(var(--primary))"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw value on top of bar
      ctx.fillStyle = "hsl(var(--foreground))"
      ctx.textAlign = "center"
      ctx.font = "12px sans-serif"
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5)

      // Draw label below bar
      ctx.fillText(data.labels[index], x + barWidth / 2, chartHeight - padding + labelPadding + 5)
    })
  }, [data])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="bar" className="text-xs">
                <BarChart className="h-4 w-4 mr-1" />
                Bar
              </TabsTrigger>
              <TabsTrigger value="line" className="text-xs">
                <LineChart className="h-4 w-4 mr-1" />
                Line
              </TabsTrigger>
              <TabsTrigger value="pie" className="text-xs">
                <PieChart className="h-4 w-4 mr-1" />
                Pie
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="bar" className="mt-0">
            <div className="w-full aspect-[2/1] relative">
              <canvas ref={chartRef} width={500} height={250} className="w-full h-full" />
            </div>
          </TabsContent>
          <TabsContent value="line" className="mt-0">
            <div className="w-full aspect-[2/1] flex items-center justify-center text-muted-foreground">
              Line chart visualization coming soon
            </div>
          </TabsContent>
          <TabsContent value="pie" className="mt-0">
            <div className="w-full aspect-[2/1] flex items-center justify-center text-muted-foreground">
              Pie chart visualization coming soon
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
