import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

function currency(n: number) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

function num(v: unknown, d = 0) {
  const n = Number(v)
  return Number.isFinite(n) ? n : d
}

export default function EstimatorPage() {
  // === Company context (static per your setup) ===
  const businessAddress = '337 Ayers Orchard Road, Stuart, VA 24171'
  const supplier = 'SealMaster, 703 West Decatur Street, Madison, NC 27025'

  // === Global knobs (you can tweak anytime) ===
  const [overheadPct, setOverheadPct] = useState(12)
  const [profitPct, setProfitPct] = useState(20)
  const [mobilization, setMobilization] = useState(200)
  const [miscAllowance, setMiscAllowance] = useState(0)

  // Labor and crew
  const [crewSize, setCrewSize] = useState(3) // 2 FT + 1 PT
  const [blendedRatePerHour, setBlendedRatePerHour] = useState(55) // $/person-hour

  // Travel / fuel
  const [roundTripMiles, setRoundTripMiles] = useState(0)
  const [truckMpg, setTruckMpg] = useState(15)
  const [fuelPrice, setFuelPrice] = useState(3.6)
  const [idleHours, setIdleHours] = useState(1) // general idle during setup
  const [equipGphActive, setEquipGphActive] = useState(2) // 2 gal/hr active operation

  // === Materials pricing (current) ===
  const [pmmPrice, setPmmPrice] = useState(3.79) // $/gal concentrate
  const [sandBagPrice, setSandBagPrice] = useState(10) // $/50lb bag
  const [prepSealBucketPrice, setPrepSealBucketPrice] = useState(50) // 5-gal
  const [fastDryBucketPrice, setFastDryBucketPrice] = useState(50) // 5-gal
  const [crackBoxPrice, setCrackBoxPrice] = useState(44.95) // 30 lb box

  // === Sealcoat mix and coverage ===
  const [waterPct, setWaterPct] = useState(20) // % of concentrate volume
  const [sandBagsPer100, setSandBagsPer100] = useState(6) // 300 lbs per 100 gal
  const [coveragePerMixedGal, setCoveragePerMixedGal] = useState(76) // sf per mixed gal
  const [fastDryGalPer125Concentrate, setFastDryGalPer125Concentrate] = useState(2)

  // === Sealcoat job inputs ===
  const [sealSqft, setSealSqft] = useState(0)
  const [sealCoats, setSealCoats] = useState(2)
  const [oilSpotArea, setOilSpotArea] = useState(0)

  // === Crack fill inputs ===
  const [crackLf, setCrackLf] = useState(0)
  const [lfPerBox, setLfPerBox] = useState(200) // default assumed yield per 30lb box
  const [crackProdLfPerHourPerPerson, setCrackProdLfPerHourPerPerson] = useState(100)

  // === Patching inputs ===
  const [patchSqft, setPatchSqft] = useState(0)
  const [patchDepthIn, setPatchDepthIn] = useState(2)
  const [hotMixInstalledPerTon, setHotMixInstalledPerTon] = useState(165) // $/ton installed (material+labor)

  // === Striping inputs ===
  const [stripeLf, setStripeLf] = useState(0)
  const [stdStalls, setStdStalls] = useState(0) // 20 lf each (single share)
  const [dblStalls, setDblStalls] = useState(0) // 25 lf each
  const [adaStalls, setAdaStalls] = useState(0)
  const [stencils, setStencils] = useState(0)
  const [lineRate, setLineRate] = useState(0.85) // $/lf
  const [adaEachCost, setAdaEachCost] = useState(45)
  const [stencilEachCost, setStencilEachCost] = useState(18)

  // === Transport load check ===
  const [tankFillPercent, setTankFillPercent] = useState(50) // % of 550 gal
  const [gvwr, setGvwr] = useState(12000) // enter the truck GVWR for comparison

  // Compute helpers
  const waterRatio = Math.max(0, Math.min(100, waterPct)) / 100

  // Sealcoat material calcs
  const seal = useMemo(() => {
    const mixedGallons = sealSqft > 0 && coveragePerMixedGal > 0
      ? (sealSqft / coveragePerMixedGal) * Math.max(1, sealCoats)
      : 0
    // Mixed = concentrate + water (ignore sand volume for simplicity)
    const concentrateGallons = mixedGallons > 0 ? mixedGallons / (1 + waterRatio) : 0
    const sandBags = concentrateGallons > 0 ? Math.ceil((concentrateGallons / 100) * sandBagsPer100) : 0
    const pmmCost = concentrateGallons * pmmPrice
    const sandCost = sandBags * sandBagPrice

    // Fast-dry additive
    const fastDryGallonsNeeded = concentrateGallons * (fastDryGalPer125Concentrate / 125)
    const fastDryBuckets = fastDryGallonsNeeded > 0 ? Math.ceil(fastDryGallonsNeeded / 5) : 0
    const fastDryCost = fastDryBuckets * fastDryBucketPrice

    // Oil spot primer (Prep Seal) – avg 875 sf per 5-gal bucket
    const prepSealBuckets = oilSpotArea > 0 ? Math.ceil(oilSpotArea / 875) : 0
    const prepSealCost = prepSealBuckets * prepSealBucketPrice

    const materialCost = pmmCost + sandCost + fastDryCost + prepSealCost

    // Labor: simple productivity model – first coat 6000 sf/hr, subsequent 0.85x time
    const baseRateSfPerHourPerCrew = 6000
    const firstCoatHours = sealSqft > 0 ? sealSqft / baseRateSfPerHourPerCrew : 0
    const extraCoats = Math.max(0, sealCoats - 1)
    const extraCoatsHours = firstCoatHours * 0.85 * extraCoats
    const totalCrewHours = firstCoatHours + extraCoatsHours
    const manHours = totalCrewHours * crewSize
    const laborCost = manHours * blendedRatePerHour

    return {
      mixedGallons,
      concentrateGallons,
      sandBags,
      fastDryBuckets,
      prepSealBuckets,
      materialCost,
      laborCost,
      crewHours: totalCrewHours,
      manHours,
    }
  }, [sealSqft, coveragePerMixedGal, sealCoats, waterRatio, sandBagsPer100, pmmPrice, sandBagPrice, fastDryGalPer125Concentrate, fastDryBucketPrice, oilSpotArea, prepSealBucketPrice, crewSize, blendedRatePerHour])

  // Crack fill calcs
  const crack = useMemo(() => {
    const boxes = crackLf > 0 && lfPerBox > 0 ? Math.ceil(crackLf / lfPerBox) : 0
    const materialCost = boxes * crackBoxPrice

    const manHours = crackLf > 0 && crackProdLfPerHourPerPerson > 0
      ? crackLf / crackProdLfPerHourPerPerson
      : 0
    const laborCost = manHours * blendedRatePerHour

    return { boxes, materialCost, manHours, laborCost }
  }, [crackLf, lfPerBox, crackBoxPrice, crackProdLfPerHourPerPerson, blendedRatePerHour])

  // Patching calcs – using installed $/ton (material + labor bundled)
  const patch = useMemo(() => {
    const sqyd = patchSqft / 9
    const tons = Math.max(1, sqyd * patchDepthIn * 0.009) // 0.009 tons/in/sqyd
    const installed = tons * hotMixInstalledPerTon
    return { tons, installed }
  }, [patchSqft, patchDepthIn, hotMixInstalledPerTon])

  // Striping calcs
  const stripe = useMemo(() => {
    const inferredLf = (stdStalls * 20) + (dblStalls * 25) + stripeLf
    const lineCost = inferredLf * lineRate
    const adaCost = adaStalls * adaEachCost
    const stencilCost = stencils * stencilEachCost
    const total = lineCost + adaCost + stencilCost
    return { inferredLf, lineCost, adaCost, stencilCost, total }
  }, [stdStalls, dblStalls, stripeLf, lineRate, adaStalls, adaEachCost, stencils, stencilEachCost])

  // Fuel & equipment
  const fuel = useMemo(() => {
    const travelGallons = roundTripMiles > 0 && truckMpg > 0 ? roundTripMiles / truckMpg : 0
    const travelFuelCost = travelGallons * fuelPrice

    // Active hours = crewHours of sealcoat only for equipment; adjust as needed
    const activeHours = seal.crewHours
    const activeGallons = activeHours * equipGphActive
    const activeFuelCost = activeGallons * fuelPrice

    // Idle
    const idleCost = idleHours * 50 // per constraints

    return {
      travelGallons,
      travelFuelCost,
      activeGallons,
      activeFuelCost,
      idleCost,
      activeHours,
    }
  }, [roundTripMiles, truckMpg, fuelPrice, seal.crewHours, equipGphActive, idleHours])

  // Subtotals and totals
  const directCosts = useMemo(() => {
    const materials = seal.materialCost + crack.materialCost
    const labor = seal.laborCost + crack.laborCost
    const patchInstalled = patch.installed
    const striping = stripe.total
    const fuelEquip = fuel.travelFuelCost + fuel.activeFuelCost + fuel.idleCost
    const subtotal = materials + labor + patchInstalled + striping + fuelEquip + mobilization + miscAllowance
    const overhead = subtotal * (overheadPct / 100)
    const profit = (subtotal + overhead) * (profitPct / 100)
    const total = subtotal + overhead + profit
    return { materials, labor, patchInstalled, striping, fuelEquip, subtotal, overhead, profit, total }
  }, [seal.materialCost, crack.materialCost, seal.laborCost, crack.laborCost, patch.installed, stripe.total, fuel.travelFuelCost, fuel.activeFuelCost, fuel.idleCost, mobilization, miscAllowance, overheadPct, profitPct])

  // Transport load check
  const transport = useMemo(() => {
    const tankCapacity = 550
    const sealerDensityLbPerGal = 10
    const emptyUnitLb = 1865 // SK 550
    const truckCurbLb = 4300 // 1978 C30 approx
    const crewLb = crewSize * 180 // estimate person weight

    const fillFraction = Math.max(0, Math.min(100, tankFillPercent)) / 100
    const sealerGallons = tankCapacity * fillFraction
    const sealerWeight = sealerGallons * sealerDensityLbPerGal
    const unitLoaded = emptyUnitLb + sealerWeight

    const totalLoaded = truckCurbLb + unitLoaded + crewLb
    const warn = totalLoaded > gvwr

    return { sealerGallons, sealerWeight, unitLoaded, totalLoaded, warn }
  }, [tankFillPercent, crewSize, gvwr])

  return (
    <div className="space-y-6">
      <Card variant="tactical">
        <CardHeader className="pb-4">
          <CardTitle>ASPHALT ESTIMATOR — VIRGINIA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-muted-foreground">Business</div>
              <div className="font-semibold">{businessAddress}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Supplier</div>
              <div className="font-semibold">{supplier}</div>
            </div>
            <div className="flex items-end justify-end">
              <a
                className="text-primary underline underline-offset-4"
                href="https://www.asphaltkingdom.com/surface-area-measurement-tool"
                target="_blank"
                rel="noreferrer noopener"
              >Measure with AK Surface Area Tool</a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card variant="tactical">
        <CardHeader className="pb-4">
          <CardTitle>GLOBAL SETTINGS</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-3">
            <div className="font-semibold">Overhead & Profit</div>
            <div>
              <Label htmlFor="ovh">Overhead (%)</Label>
              <Input id="ovh" type="number" min={0} value={overheadPct} onChange={e => setOverheadPct(num(e.target.value, overheadPct))} />
            </div>
            <div>
              <Label htmlFor="prf">Profit (%)</Label>
              <Input id="prf" type="number" min={0} value={profitPct} onChange={e => setProfitPct(num(e.target.value, profitPct))} />
            </div>
            <div>
              <Label htmlFor="mob">Mobilization ($)</Label>
              <Input id="mob" type="number" min={0} value={mobilization} onChange={e => setMobilization(num(e.target.value, mobilization))} />
            </div>
            <div>
              <Label htmlFor="misc">Misc Allowance ($)</Label>
              <Input id="misc" type="number" min={0} value={miscAllowance} onChange={e => setMiscAllowance(num(e.target.value, miscAllowance))} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-semibold">Labor & Crew</div>
            <div>
              <Label htmlFor="crew">Crew size</Label>
              <Input id="crew" type="number" min={1} value={crewSize} onChange={e => setCrewSize(num(e.target.value, crewSize))} />
            </div>
            <div>
              <Label htmlFor="rate">Blended labor rate ($/hr/person)</Label>
              <Input id="rate" type="number" min={0} value={blendedRatePerHour} onChange={e => setBlendedRatePerHour(num(e.target.value, blendedRatePerHour))} />
            </div>
            <Separator className="my-2" />
            <div className="font-semibold">Travel & Fuel</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="miles">Round trip miles</Label>
                <Input id="miles" type="number" min={0} value={roundTripMiles} onChange={e => setRoundTripMiles(num(e.target.value, roundTripMiles))} />
              </div>
              <div>
                <Label htmlFor="mpg">Truck MPG</Label>
                <Input id="mpg" type="number" min={1} value={truckMpg} onChange={e => setTruckMpg(num(e.target.value, truckMpg))} />
              </div>
              <div>
                <Label htmlFor="fuel">Fuel price ($/gal)</Label>
                <Input id="fuel" type="number" min={0} step="0.01" value={fuelPrice} onChange={e => setFuelPrice(num(e.target.value, fuelPrice))} />
              </div>
              <div>
                <Label htmlFor="idle">Idle hours</Label>
                <Input id="idle" type="number" min={0} value={idleHours} onChange={e => setIdleHours(num(e.target.value, idleHours))} />
              </div>
              <div>
                <Label htmlFor="gph">Equip active (gal/hr)</Label>
                <Input id="gph" type="number" min={0} step="0.1" value={equipGphActive} onChange={e => setEquipGphActive(num(e.target.value, equipGphActive))} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-semibold">Materials</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="pmm">PMM Conc. ($/gal)</Label>
                <Input id="pmm" type="number" min={0} step="0.01" value={pmmPrice} onChange={e => setPmmPrice(num(e.target.value, pmmPrice))} />
              </div>
              <div>
                <Label htmlFor="sand">Sand 50lb ($/bag)</Label>
                <Input id="sand" type="number" min={0} step="0.01" value={sandBagPrice} onChange={e => setSandBagPrice(num(e.target.value, sandBagPrice))} />
              </div>
              <div>
                <Label htmlFor="prep">Prep Seal 5gal ($)</Label>
                <Input id="prep" type="number" min={0} step="0.01" value={prepSealBucketPrice} onChange={e => setPrepSealBucketPrice(num(e.target.value, prepSealBucketPrice))} />
              </div>
              <div>
                <Label htmlFor="fast">Fast Dry 5gal ($)</Label>
                <Input id="fast" type="number" min={0} step="0.01" value={fastDryBucketPrice} onChange={e => setFastDryBucketPrice(num(e.target.value, fastDryBucketPrice))} />
              </div>
              <div className="col-span-2">
                <Label htmlFor="box">CrackMaster 30lb ($/box)</Label>
                <Input id="box" type="number" min={0} step="0.01" value={crackBoxPrice} onChange={e => setCrackBoxPrice(num(e.target.value, crackBoxPrice))} />
              </div>
            </div>
            <Separator className="my-2" />
            <div className="font-semibold">Seal Mix / Coverage</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="wpct">Water (% of concentrate)</Label>
                <Input id="wpct" type="number" min={0} max={50} value={waterPct} onChange={e => setWaterPct(num(e.target.value, waterPct))} />
              </div>
              <div>
                <Label htmlFor="bags">Sand bags / 100 gal conc.</Label>
                <Input id="bags" type="number" min={0} value={sandBagsPer100} onChange={e => setSandBagsPer100(num(e.target.value, sandBagsPer100))} />
              </div>
              <div>
                <Label htmlFor="cov">Coverage (sf / mixed gal)</Label>
                <Input id="cov" type="number" min={1} value={coveragePerMixedGal} onChange={e => setCoveragePerMixedGal(num(e.target.value, coveragePerMixedGal))} />
              </div>
              <div>
                <Label htmlFor="fd">Fast Dry (gal / 125 gal conc.)</Label>
                <Input id="fd" type="number" min={0} step="0.1" value={fastDryGalPer125Concentrate} onChange={e => setFastDryGalPer125Concentrate(num(e.target.value, fastDryGalPer125Concentrate))} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card variant="tactical">
        <CardHeader className="pb-4">
          <CardTitle>SERVICES & INPUTS</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="seal">
            <TabsList>
              <TabsTrigger value="seal">Sealcoating</TabsTrigger>
              <TabsTrigger value="crack">Crack Filling</TabsTrigger>
              <TabsTrigger value="patch">Patching</TabsTrigger>
              <TabsTrigger value="stripe">Line Striping</TabsTrigger>
            </TabsList>

            <TabsContent value="seal" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="ssf">Seal area (sq ft)</Label>
                    <Input id="ssf" type="number" min={0} value={sealSqft} onChange={e => setSealSqft(num(e.target.value, sealSqft))} />
                  </div>
                  <div>
                    <Label htmlFor="coats">Coats</Label>
                    <Input id="coats" type="number" min={1} value={sealCoats} onChange={e => setSealCoats(num(e.target.value, sealCoats))} />
                  </div>
                  <div>
                    <Label htmlFor="oil">Oil spot area (sq ft)</Label>
                    <Input id="oil" type="number" min={0} value={oilSpotArea} onChange={e => setOilSpotArea(num(e.target.value, oilSpotArea))} />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Need area? Use the AK Surface Area Tool above, then paste sq ft here.
                  </div>
                </div>

                <div className="col-span-2 grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Mixed gallons</div>
                    <div className="font-semibold">{seal.mixedGallons.toFixed(1)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Concentrate gallons</div>
                    <div className="font-semibold">{seal.concentrateGallons.toFixed(1)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Sand bags</div>
                    <div className="font-semibold">{seal.sandBags}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Fast Dry buckets (5 gal)</div>
                    <div className="font-semibold">{seal.fastDryBuckets}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Prep Seal buckets (5 gal)</div>
                    <div className="font-semibold">{seal.prepSealBuckets}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Seal labor (man-hours)</div>
                    <div className="font-semibold">{seal.manHours.toFixed(1)}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Coverage: {coveragePerMixedGal} sf/mixed gal, Water {waterPct}%, {sandBagsPer100} bags/100 gal conc.</div>
                <div className="text-lg font-bold text-primary">Material: {currency(seal.materialCost)} | Labor: {currency(seal.laborCost)}</div>
              </div>
            </TabsContent>

            <TabsContent value="crack" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="clf">Crack length (LF)</Label>
                    <Input id="clf" type="number" min={0} value={crackLf} onChange={e => setCrackLf(num(e.target.value, crackLf))} />
                  </div>
                  <div>
                    <Label htmlFor="yield">LF per 30lb box</Label>
                    <Input id="yield" type="number" min={50} value={lfPerBox} onChange={e => setLfPerBox(num(e.target.value, lfPerBox))} />
                  </div>
                  <div>
                    <Label htmlFor="prod">Productivity (LF/hr/person)</Label>
                    <Input id="prod" type="number" min={10} value={crackProdLfPerHourPerPerson} onChange={e => setCrackProdLfPerHourPerPerson(num(e.target.value, crackProdLfPerHourPerPerson))} />
                  </div>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Boxes (30 lb)</div>
                    <div className="font-semibold">{crack.boxes}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Crack labor (man-hours)</div>
                    <div className="font-semibold">{crack.manHours.toFixed(1)}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Range ref: $0.50–$3.00 per LF (incl. material+labor)</div>
                <div className="text-lg font-bold text-primary">Material: {currency(crack.materialCost)} | Labor: {currency(crack.laborCost)}</div>
              </div>
            </TabsContent>

            <TabsContent value="patch" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="psf">Patch area (sq ft)</Label>
                    <Input id="psf" type="number" min={0} value={patchSqft} onChange={e => setPatchSqft(num(e.target.value, patchSqft))} />
                  </div>
                  <div>
                    <Label htmlFor="pdepth">Depth (inches)</Label>
                    <Input id="pdepth" type="number" min={1} value={patchDepthIn} onChange={e => setPatchDepthIn(num(e.target.value, patchDepthIn))} />
                  </div>
                  <div>
                    <Label htmlFor="pton">Installed $/ton (hot mix)</Label>
                    <Input id="pton" type="number" min={0} value={hotMixInstalledPerTon} onChange={e => setHotMixInstalledPerTon(num(e.target.value, hotMixInstalledPerTon))} />
                  </div>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Estimated tons</div>
                    <div className="font-semibold">{patch.tons.toFixed(2)} t</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Installed (material+labor)</div>
                    <div className="font-semibold">{currency(patch.installed)}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Ref: $2.00–$5.00/sf @ 2" for surface repairs</div>
                <div className="text-lg font-bold text-primary">Total: {currency(patch.installed)}</div>
              </div>
            </TabsContent>

            <TabsContent value="stripe" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="std">Standard stalls (single)</Label>
                    <Input id="std" type="number" min={0} value={stdStalls} onChange={e => setStdStalls(num(e.target.value, stdStalls))} />
                  </div>
                  <div>
                    <Label htmlFor="dbl">Double stalls</Label>
                    <Input id="dbl" type="number" min={0} value={dblStalls} onChange={e => setDblStalls(num(e.target.value, dblStalls))} />
                  </div>
                  <div>
                    <Label htmlFor="lf">Extra line LF</Label>
                    <Input id="lf" type="number" min={0} value={stripeLf} onChange={e => setStripeLf(num(e.target.value, stripeLf))} />
                  </div>
                  <div>
                    <Label htmlFor="ada">ADA stalls</Label>
                    <Input id="ada" type="number" min={0} value={adaStalls} onChange={e => setAdaStalls(num(e.target.value, adaStalls))} />
                  </div>
                  <div>
                    <Label htmlFor="stc">Stencils (arrows/text)</Label>
                    <Input id="stc" type="number" min={0} value={stencils} onChange={e => setStencils(num(e.target.value, stencils))} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="rate">Line rate ($/LF)</Label>
                    <Input id="rate" type="number" min={0} step="0.01" value={lineRate} onChange={e => setLineRate(num(e.target.value, lineRate))} />
                  </div>
                  <div>
                    <Label htmlFor="adac">ADA each ($)</Label>
                    <Input id="adac" type="number" min={0} step="0.01" value={adaEachCost} onChange={e => setAdaEachCost(num(e.target.value, adaEachCost))} />
                  </div>
                  <div>
                    <Label htmlFor="stenc">Stencil each ($)</Label>
                    <Input id="stenc" type="number" min={0} step="0.01" value={stencilEachCost} onChange={e => setStencilEachCost(num(e.target.value, stencilEachCost))} />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-1 grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Inferred LF</div>
                    <div className="font-semibold">{stripe.inferredLf}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Line cost</div>
                    <div className="font-semibold">{currency(stripe.lineCost)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">ADA cost</div>
                    <div className="font-semibold">{currency(stripe.adaCost)}</div>
                  </div>
                  <div className="p-3 border border-border rounded-sm">
                    <div className="text-muted-foreground">Stencils cost</div>
                    <div className="font-semibold">{currency(stripe.stencilCost)}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Ref: $0.75–$1.00 per LF; average stall $4–$5</div>
                <div className="text-lg font-bold text-primary">Total: {currency(stripe.total)}</div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Fuel / Equipment */}
      <Card variant="tactical">
        <CardHeader className="pb-2">
          <CardTitle>EQUIPMENT & FUEL</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Travel gallons</div>
            <div className="font-semibold">{fuel.travelGallons.toFixed(2)} gal</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Travel fuel cost</div>
            <div className="font-semibold">{currency(fuel.travelFuelCost)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Active gallons</div>
            <div className="font-semibold">{fuel.activeGallons.toFixed(2)} gal</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Active fuel cost</div>
            <div className="font-semibold">{currency(fuel.activeFuelCost)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Idle cost</div>
            <div className="font-semibold">{currency(fuel.idleCost)}</div>
          </div>
        </CardContent>
      </Card>

      {/* Transport load check */}
      <Card variant="tactical">
        <CardHeader className="pb-2">
          <CardTitle>TRANSPORT LOAD CHECK (SK 550 + 1978 C30)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <div>
            <Label htmlFor="fill">Tank fill (%)</Label>
            <Input id="fill" type="number" min={0} max={100} value={tankFillPercent} onChange={e => setTankFillPercent(num(e.target.value, tankFillPercent))} />
          </div>
          <div>
            <Label htmlFor="gvwr">Truck GVWR (lb)</Label>
            <Input id="gvwr" type="number" min={8000} value={gvwr} onChange={e => setGvwr(num(e.target.value, gvwr))} />
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Sealer gallons</div>
            <div className="font-semibold">{transport.sealerGallons.toFixed(0)} gal</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Sealer weight</div>
            <div className="font-semibold">{transport.sealerWeight.toFixed(0)} lb</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Total loaded</div>
            <div className={`font-semibold ${transport.warn ? 'text-destructive' : ''}`}>{transport.totalLoaded.toLocaleString()} lb</div>
          </div>
        </CardContent>
      </Card>

      {/* Proposal */}
      <Card variant="tactical">
        <CardHeader className="pb-2">
          <CardTitle>PROPOSAL SUMMARY</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Materials (seal + crack)</div>
            <div className="font-semibold">{currency(directCosts.materials)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Labor (seal + crack)</div>
            <div className="font-semibold">{currency(directCosts.labor)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Patching (installed)</div>
            <div className="font-semibold">{currency(directCosts.patchInstalled)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Striping</div>
            <div className="font-semibold">{currency(directCosts.striping)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Fuel + Equipment</div>
            <div className="font-semibold">{currency(directCosts.fuelEquip)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Mobilization</div>
            <div className="font-semibold">{currency(mobilization)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Misc Allowance</div>
            <div className="font-semibold">{currency(miscAllowance)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm md:col-span-2">
            <div className="text-muted-foreground">Subtotal</div>
            <div className="font-semibold">{currency(directCosts.subtotal)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Overhead ({overheadPct}%)</div>
            <div className="font-semibold">{currency(directCosts.overhead)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <div className="text-muted-foreground">Profit ({profitPct}%)</div>
            <div className="font-semibold">{currency(directCosts.profit)}</div>
          </div>
          <div className="p-3 border border-border rounded-sm md:col-span-2">
            <div className="text-muted-foreground">Total Estimated Cost</div>
            <div className="text-2xl font-bold text-primary">{currency(directCosts.total)}</div>
          </div>
          <div className="md:col-span-2 text-xs text-muted-foreground space-y-1">
            <div>Notes:</div>
            <ul className="list-disc ml-4">
              <li>Estimate valid for 30 days. Subject to site inspection and substrate condition.</li>
              <li>Coverage rates and productivity vary with pavement porosity, weather, access, and layout.</li>
              <li>Transport load must remain within the C30 GVWR. Reduce tank fill if approaching limits.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quick prompt for generating via chat persona */}
      <Card variant="tactical">
        <CardHeader className="pb-2">
          <CardTitle>NEED A BID? — I’LL ASK THE RIGHT QUESTIONS</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="text-muted-foreground">Provide the following details and I’ll generate an estimate:</div>
          <ul className="list-disc ml-4">
            <li>Service(s): crack fill, patching, sealcoat (area + coats + oil spots), line striping (stalls, ADA, stencils).</li>
            <li>Site condition: oxidation, porosity, oil spots, crack severity.</li>
            <li>Job location for mileage from {businessAddress}.</li>
            <li>Desired schedule window.</li>
            <li>Whether you want a transport load check for the SK 550 and C30.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}