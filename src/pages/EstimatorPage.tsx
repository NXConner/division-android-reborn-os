import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'

// Simple unit costs and production rates (Virginia small business assumptions)
const RATES = {
  // Crack fill
  crackfill_per_linear_ft: 1.5, // $/LF hot pour
  // Patching
  patch_base_per_ton: 165.0, // $/ton installed (material + labor small job)
  patch_density_ton_per_inch_sqyd: 0.009, // tons per inch per sq yd (approx)
  mobilization_small_job: 150.0,
  // Sealcoat
  sealcoat_per_sqft_two_coats: 0.22, // $/sf for 2 coats small lot
  sand_additive_pct: 0.05, // 5%
  // Striping
  line_per_linear_ft: 0.45, // $/LF standard 4" line
  stencil_each: 18.0, // letters/arrows each
  handicap_stall_each: 45.0,
  curb_stop_each: 22.0,
  // Overheads
  overhead_pct: 0.12,
  profit_pct: 0.18,
}

function currency(n: number) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

export default function EstimatorPage() {
  const [tab, setTab] = useState('crack')

  // Crack fill inputs
  const [crackLf, setCrackLf] = useState(0)

  // Patching inputs
  const [patchSqft, setPatchSqft] = useState(0)
  const [patchDepthIn, setPatchDepthIn] = useState(3)

  // Sealcoat inputs
  const [sealSqft, setSealSqft] = useState(0)
  const [twoCoats, setTwoCoats] = useState(true)

  // Striping inputs
  const [stripeLf, setStripeLf] = useState(0)
  const [numStencils, setNumStencils] = useState(0)
  const [numADA, setNumADA] = useState(0)
  const [numCurbStops, setNumCurbStops] = useState(0)

  const crack = useMemo(() => {
    const materialLabor = crackLf * RATES.crackfill_per_linear_ft
    const subtotal = materialLabor + RATES.mobilization_small_job
    const overhead = subtotal * RATES.overhead_pct
    const profit = (subtotal + overhead) * RATES.profit_pct
    const total = subtotal + overhead + profit
    return { materialLabor, subtotal, overhead, profit, total }
  }, [crackLf])

  const patch = useMemo(() => {
    const sqyd = patchSqft / 9
    const tons = sqyd * patchDepthIn * RATES.patch_density_ton_per_inch_sqyd
    const base = Math.max(tons, 1) // minimum 1 ton small job
    const materialLabor = base * RATES.patch_base_per_ton
    const subtotal = materialLabor + RATES.mobilization_small_job
    const overhead = subtotal * RATES.overhead_pct
    const profit = (subtotal + overhead) * RATES.profit_pct
    const total = subtotal + overhead + profit
    return { tons: base, materialLabor, subtotal, overhead, profit, total }
  }, [patchSqft, patchDepthIn])

  const seal = useMemo(() => {
    const coatsFactor = twoCoats ? 1 : 0.6 // single coat discount factor
    const base = sealSqft * RATES.sealcoat_per_sqft_two_coats * coatsFactor
    const additives = base * RATES.sand_additive_pct
    const subtotal = base + additives + RATES.mobilization_small_job
    const overhead = subtotal * RATES.overhead_pct
    const profit = (subtotal + overhead) * RATES.profit_pct
    const total = subtotal + overhead + profit
    return { base, additives, subtotal, overhead, profit, total }
  }, [sealSqft, twoCoats])

  const stripe = useMemo(() => {
    const lines = stripeLf * RATES.line_per_linear_ft
    const stencils = numStencils * RATES.stencil_each
    const ada = numADA * RATES.handicap_stall_each
    const stops = numCurbStops * RATES.curb_stop_each
    const subtotal = lines + stencils + ada + stops + RATES.mobilization_small_job
    const overhead = subtotal * RATES.overhead_pct
    const profit = (subtotal + overhead) * RATES.profit_pct
    const total = subtotal + overhead + profit
    return { lines, stencils, ada, stops, subtotal, overhead, profit, total }
  }, [stripeLf, numStencils, numADA, numCurbStops])

  return (
    <div className="space-y-6">
      <Card variant="tactical">
        <CardHeader className="pb-4">
          <CardTitle>ASPHALT ESTIMATOR - VIRGINIA</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="crack">Crack Filling</TabsTrigger>
              <TabsTrigger value="patch">Patching</TabsTrigger>
              <TabsTrigger value="seal">Sealcoating</TabsTrigger>
              <TabsTrigger value="stripe">Line Striping</TabsTrigger>
            </TabsList>

            <TabsContent value="crack" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="crlf">Linear Feet of Cracks</Label>
                  <Input id="crlf" type="number" min={0} value={crackLf} onChange={e => setCrackLf(Number(e.target.value))} />
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Material + Labor</div>
                    <div className="font-semibold">{currency(crack.materialLabor)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Mobilization</div>
                    <div className="font-semibold">{currency(RATES.mobilization_small_job)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Overhead</div>
                    <div className="font-semibold">{currency(crack.overhead)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Profit</div>
                    <div className="font-semibold">{currency(crack.profit)}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Rate: {currency(RATES.crackfill_per_linear_ft)}/LF</div>
                <div className="text-lg font-bold text-primary">Total: {currency(crack.total)}</div>
              </div>
            </TabsContent>

            <TabsContent value="patch" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="psf">Patch Area (sq ft)</Label>
                    <Input id="psf" type="number" min={0} value={patchSqft} onChange={e => setPatchSqft(Number(e.target.value))} />
                  </div>
                  <div>
                    <Label htmlFor="pdepth">Depth (inches)</Label>
                    <Input id="pdepth" type="number" min={1} value={patchDepthIn} onChange={e => setPatchDepthIn(Number(e.target.value))} />
                  </div>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Estimated Tons</div>
                    <div className="font-semibold">{patch.tons.toFixed(2)} t</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Material + Labor</div>
                    <div className="font-semibold">{currency(patch.materialLabor)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Mobilization</div>
                    <div className="font-semibold">{currency(RATES.mobilization_small_job)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Overhead</div>
                    <div className="font-semibold">{currency(patch.overhead)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Profit</div>
                    <div className="font-semibold">{currency(patch.profit)}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Rate: {currency(RATES.patch_base_per_ton)}/ton</div>
                <div className="text-lg font-bold text-primary">Total: {currency(patch.total)}</div>
              </div>
            </TabsContent>

            <TabsContent value="seal" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ssf">Area (sq ft)</Label>
                    <Input id="ssf" type="number" min={0} value={sealSqft} onChange={e => setSealSqft(Number(e.target.value))} />
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <input id="two" type="checkbox" checked={twoCoats} onChange={e => setTwoCoats(e.target.checked)} />
                    <Label htmlFor="two">Two coats</Label>
                  </div>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Sealcoat Base</div>
                    <div className="font-semibold">{currency(seal.base)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Additives</div>
                    <div className="font-semibold">{currency(seal.additives)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Mobilization</div>
                    <div className="font-semibold">{currency(RATES.mobilization_small_job)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Overhead</div>
                    <div className="font-semibold">{currency(seal.overhead)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Profit</div>
                    <div className="font-semibold">{currency(seal.profit)}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Rate: {currency(RATES.sealcoat_per_sqft_two_coats)}/sf (two-coat baseline)</div>
                <div className="text-lg font-bold text-primary">Total: {currency(seal.total)}</div>
              </div>
            </TabsContent>

            <TabsContent value="stripe" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="slf">Linear Feet of Lines</Label>
                    <Input id="slf" type="number" min={0} value={stripeLf} onChange={e => setStripeLf(Number(e.target.value))} />
                  </div>
                  <div>
                    <Label htmlFor="stencils">Stencils (ea)</Label>
                    <Input id="stencils" type="number" min={0} value={numStencils} onChange={e => setNumStencils(Number(e.target.value))} />
                  </div>
                  <div>
                    <Label htmlFor="ada">ADA Stalls (ea)</Label>
                    <Input id="ada" type="number" min={0} value={numADA} onChange={e => setNumADA(Number(e.target.value))} />
                  </div>
                  <div>
                    <Label htmlFor="curb">Curb Stops (ea)</Label>
                    <Input id="curb" type="number" min={0} value={numCurbStops} onChange={e => setNumCurbStops(Number(e.target.value))} />
                  </div>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Lines</div>
                    <div className="font-semibold">{currency(stripe.lines)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Stencils</div>
                    <div className="font-semibold">{currency(stripe.stencils)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">ADA</div>
                    <div className="font-semibold">{currency(stripe.ada)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Curb Stops</div>
                    <div className="font-semibold">{currency(stripe.stops)}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Line rate: {currency(RATES.line_per_linear_ft)}/LF</div>
                <div className="text-lg font-bold text-primary">Total: {currency(stripe.total)}</div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card variant="tactical">
        <CardHeader className="pb-2">
          <CardTitle>PROPOSAL SUMMARY</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 border border-border rounded-sm">
            <div className="text-xs text-muted-foreground">Crack Filling Total</div>
            <div className="text-lg font-semibold">{currency(crack.total)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-xs text-muted-foreground">Patching Total</div>
            <div className="text-lg font-semibold">{currency(patch.total)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-xs text-muted-foreground">Sealcoating Total</div>
            <div className="text-lg font-semibold">{currency(seal.total)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-xs text-muted-foreground">Striping Total</div>
            <div className="text-lg font-semibold">{currency(stripe.total)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm md:col-span-2">
            <div className="text-xs text-muted-foreground">Grand Total</div>
            <div className="text-2xl font-bold text-primary">
              {currency(crack.total + patch.total + seal.total + stripe.total)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}