export async function playIsacChime(): Promise<void> {
	try {
		const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext
		if (!AudioCtx) return
		const ctx = new AudioCtx()
		const now = ctx.currentTime

		function tone(freq: number, start: number, duration: number, gainDb = -6) {
			const osc = ctx.createOscillator()
			const gain = ctx.createGain()
			osc.type = 'sine'
			osc.frequency.value = freq
			const gainVal = Math.pow(10, gainDb / 20)
			gain.gain.setValueAtTime(0, now + start)
			gain.gain.linearRampToValueAtTime(gainVal, now + start + 0.01)
			gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration)
			osc.connect(gain).connect(ctx.destination)
			osc.start(now + start)
			osc.stop(now + start + duration + 0.05)
		}

		// Two-tone rising chime (Division/ISAC-esque)
		tone(440, 0.0, 0.18, -8)
		tone(660, 0.12, 0.22, -10)

		// Auto close after a second
		setTimeout(() => ctx.close().catch(() => {}), 1200)
	} catch {
		// ignore
	}
}