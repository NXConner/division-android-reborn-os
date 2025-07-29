import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				'border-muted': 'hsl(var(--border-muted))',
				'border-bright': 'hsl(var(--border-bright))',
				input: 'hsl(var(--input))',
				'input-border': 'hsl(var(--input-border))',
				'input-focus': 'hsl(var(--input-focus))',
				ring: 'hsl(var(--ring))',
				'ring-offset': 'hsl(var(--ring-offset))',
				background: 'hsl(var(--background))',
				'background-elevated': 'hsl(var(--background-elevated))',
				'background-overlay': 'hsl(var(--background-overlay))',
				foreground: 'hsl(var(--foreground))',
				'foreground-muted': 'hsl(var(--foreground-muted))',
				'foreground-subtle': 'hsl(var(--foreground-subtle))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					muted: 'hsl(var(--primary-muted))',
					subtle: 'hsl(var(--primary-subtle))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
					muted: 'hsl(var(--destructive-muted))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					border: 'hsl(var(--card-border))',
					elevated: 'hsl(var(--card-elevated))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					muted: 'hsl(var(--success-muted))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					muted: 'hsl(var(--warning-muted))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'radius-sm': 'var(--radius-sm)',
				'radius-lg': 'var(--radius-lg)',
				'radius-xl': 'var(--radius-xl)'
			},
			boxShadow: {
				'tactical': 'var(--shadow-tactical)',
				'glow': 'var(--shadow-glow)',
				'deep': 'var(--shadow-deep)',
				'subtle': 'var(--shadow-subtle)',
				'inner': 'var(--shadow-inner)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-tactical': 'var(--gradient-tactical)',
				'gradient-overlay': 'var(--gradient-overlay)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-glow': 'var(--gradient-glow)'
			},
			transitionTimingFunction: {
				'tactical': 'var(--transition-tactical)',
				'fast': 'var(--transition-fast)',
				'slow': 'var(--transition-slow)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'tactical-scan': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100vw)' }
				},
				'data-flow': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 5px hsl(var(--primary) / 0.3)' },
					'50%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.6), 0 0 30px hsl(var(--primary) / 0.3)' }
				},
				'status-blink': {
					'0%, 50%': { opacity: '1' },
					'51%, 100%': { opacity: '0.3' }
				},
				'radar-sweep': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'interference': {
					'0%, 100%': { transform: 'translateX(0)' },
					'20%': { transform: 'translateX(-2px)' },
					'40%': { transform: 'translateX(2px)' },
					'60%': { transform: 'translateX(-1px)' },
					'80%': { transform: 'translateX(1px)' }
				},
				'matrix-rain': {
					'0%': { transform: 'translateY(-100vh)', opacity: '1' },
					'100%': { transform: 'translateY(100vh)', opacity: '0' }
				},
				'hologram-flicker': {
					'0%, 100%': { opacity: '1' },
					'2%': { opacity: '0.8' },
					'4%': { opacity: '1' },
					'6%': { opacity: '0.9' },
					'8%': { opacity: '1' }
				},
				'energy-pulse': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.1)', opacity: '0.8' },
					'100%': { transform: 'scale(1.2)', opacity: '0' }
				},
				'text-scan': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'neural-pulse': {
					'0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
					'50%': { transform: 'scale(1.5)', opacity: '1' }
				},
				'tactical-boot': {
					'0%': { opacity: '0', transform: 'scaleY(0)' },
					'50%': { opacity: '0.5', transform: 'scaleY(0.5)' },
					'100%': { opacity: '1', transform: 'scaleY(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'tactical-scan': 'tactical-scan 3s linear infinite',
				'data-flow': 'data-flow 0.6s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'status-blink': 'status-blink 1.5s ease-in-out infinite',
				'radar-sweep': 'radar-sweep 4s linear infinite',
				'interference': 'interference 0.5s ease-in-out infinite',
				'matrix-rain': 'matrix-rain 3s linear infinite',
				'hologram-flicker': 'hologram-flicker 2s ease-in-out infinite',
				'energy-pulse': 'energy-pulse 1s ease-out infinite',
				'text-scan': 'text-scan 2s linear infinite',
				'neural-pulse': 'neural-pulse 2s ease-in-out infinite',
				'tactical-boot': 'tactical-boot 1s ease-out',
				'delay-100': 'pulse-glow 2s ease-in-out infinite 0.1s',
				'delay-200': 'pulse-glow 2s ease-in-out infinite 0.2s',
				'delay-300': 'pulse-glow 2s ease-in-out infinite 0.3s',
				'delay-500': 'pulse-glow 2s ease-in-out infinite 0.5s',
				'delay-1000': 'pulse-glow 2s ease-in-out infinite 1s'
			},
			fontFamily: {
				'mono': ['JetBrains Mono', 'Monaco', 'Menlo', 'monospace'],
				'tactical': ['Orbitron', 'sans-serif'],
				'display': ['Orbitron', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
