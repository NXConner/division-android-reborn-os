import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const data = [
  { time: '00:00', threats: 3, scans: 12 },
  { time: '02:00', threats: 5, scans: 18 },
  { time: '04:00', threats: 4, scans: 16 },
  { time: '06:00', threats: 6, scans: 22 },
  { time: '08:00', threats: 8, scans: 25 },
  { time: '10:00', threats: 7, scans: 23 },
  { time: '12:00', threats: 10, scans: 30 },
  { time: '14:00', threats: 9, scans: 28 },
  { time: '16:00', threats: 11, scans: 34 },
  { time: '18:00', threats: 8, scans: 26 },
  { time: '20:00', threats: 6, scans: 20 },
  { time: '22:00', threats: 4, scans: 15 },
];

const chartConfig = {
  threats: {
    label: 'Threats',
    color: 'hsl(var(--destructive))',
  },
  scans: {
    label: 'Scans',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function IntelPage() {
  return (
    <div className="space-y-6">
      <Card variant="tactical">
        <CardHeader className="pb-4">
          <CardTitle>INTELLIGENCE ANALYSIS</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full">
            <AreaChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area dataKey="threats" type="monotone" fill="var(--color-threats)" stroke="var(--color-threats)" fillOpacity={0.2} />
              <Area dataKey="scans" type="monotone" fill="var(--color-scans)" stroke="var(--color-scans)" fillOpacity={0.2} />
              <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}