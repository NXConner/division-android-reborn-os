import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart } from 'recharts';

const barData = [
  { mission: 'Alpha', success: 12, failure: 2 },
  { mission: 'Bravo', success: 9, failure: 3 },
  { mission: 'Charlie', success: 15, failure: 1 },
  { mission: 'Delta', success: 8, failure: 4 },
];

const lineData = [
  { time: '00:00', intel: 10 },
  { time: '06:00', intel: 14 },
  { time: '12:00', intel: 22 },
  { time: '18:00', intel: 18 },
  { time: '24:00', intel: 26 },
];

const barConfig = {
  success: { label: 'Success', color: 'hsl(var(--success))' },
  failure: { label: 'Failure', color: 'hsl(var(--destructive))' },
} satisfies ChartConfig;

const lineConfig = {
  intel: { label: 'Intel Collected', color: 'hsl(var(--primary))' },
} satisfies ChartConfig;

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <Card variant="tactical">
        <CardHeader className="pb-4">
          <CardTitle>MISSION OUTCOMES</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barConfig} className="w-full">
            <BarChart data={barData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="mission" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="success" fill="var(--color-success)" radius={4} />
              <Bar dataKey="failure" fill="var(--color-failure)" radius={4} />
              <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card variant="tactical">
        <CardHeader className="pb-4">
          <CardTitle>INTEL COLLECTION OVER TIME</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineConfig} className="w-full">
            <LineChart data={lineData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="intel" stroke="var(--color-intel)" strokeWidth={2} dot={false} />
              <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}