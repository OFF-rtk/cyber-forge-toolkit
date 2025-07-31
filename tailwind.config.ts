import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          // Dark Theme Foundation
          'dark-bg': '#0A0A0A',
          'dark-surface': '#1A1A1A',
          'dark-elevated': '#262626',
          'dark-text-primary': '#E5E5E5',
          'dark-text-secondary': '#B3B3B3',
          'dark-text-muted': '#808080',
          'dark-border': '#333333',

          // Light Theme Foundation
          'light-bg': '#F8F9FA',
          'light-surface': '#FFFFFF',
          'light-elevated': '#F1F3F4',
          'light-text-primary': '#1F2937',
          'light-text-secondary': '#4B5563',
          'light-text-muted': '#9CA3AF',
          'light-border': '#E5E7EB',

          // Cyberpunk Accent Colors (your exact values)
          'primary': '#00D4FF',        // Electric Blue
          'secondary': '#39FF14',      // Cyber Green
          'accent': '#BC13FE',         // Plasma Purple
          'warning': '#FF6B00',        // Neon Orange
          'danger': '#FF073A',         // Cyber Red

          // Blue-Yellow Cyberpunk Palette (your exact values)
          'blue': '#0099FF',           // Bright Cyber Blue
          'yellow': '#FFFF00',         // Electric Yellow
          'amber': '#FFC300',          // Warm Amber
          'gold': '#FFD700',           // Cyber Gold
          'blue-dark': '#0066CC',      // Darker blue for backgrounds
          'yellow-soft': '#FFEB3B',    // Softer yellow for text
        }
      },
      fontFamily: {
        // Your complete cyberpunk font system
        'cyber-sans': ['Inter', 'system-ui', 'sans-serif'],
        'cyber-mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'cyber-display': ['Orbitron', 'Impact', 'sans-serif'],
        'cyber-code': ['Source Code Pro', 'Monaco', 'monospace'],
        'cyber-ui': ['Rajdhani', 'Segoe UI', 'sans-serif'],
        'cyber-tech': ['Exo 2', 'Arial', 'sans-serif'],
        'cyber-retro': ['Audiowide', 'cursive'],
        'cyber-clean': ['Bai Jamjuree', 'sans-serif'],
      },
      borderRadius: {
        // Your exact border radius values
        'cyber': '0.75rem',     // --radius-cyber
        'cyber-lg': '1rem',     // --radius-cyber-lg
      },
      spacing: {
        // Your exact spacing value
        'cyber': '1.5rem',      // --spacing-cyber
      },
      boxShadow: {
        // All your exact glow effects
        'cyber-shadow': '0 8px 32px rgb(0 0 0 / 0.6)',
        'cyber-shadow-lg': '0 12px 40px rgb(0 0 0 / 0.8)',

        // Blue/Cool Spectrum Glows (your exact values)
        'cyber-glow-primary': '0 0 20px rgb(0 212 255 / 0.3)',
        'cyber-glow-secondary': '0 0 20px rgb(57 255 20 / 0.3)',
        'cyber-glow-accent': '0 0 20px rgb(188 19 254 / 0.3)',

        // Warning/Danger Glows (your exact values)
        'cyber-glow-warning': '0 0 20px rgb(255 107 0 / 0.3)',
        'cyber-glow-danger': '0 0 20px rgb(255 7 58 / 0.3)',

        // Yellow Spectrum Glows (your exact values)
        'cyber-glow-yellow': '0 0 20px rgb(255 255 0 / 0.3)',
        'cyber-glow-amber': '0 0 20px rgb(255 195 0 / 0.3)',
        'cyber-glow-gold': '0 0 20px rgb(255 215 0 / 0.3)',
        'cyber-glow-yellow-soft': '0 0 20px rgb(255 235 59 / 0.3)',

        // Enhanced Yellow Variants (Stronger) - your exact values
        'cyber-glow-yellow-strong': '0 0 30px rgb(255 255 0 / 0.5), 0 0 60px rgb(255 255 0 / 0.3)',
        'cyber-glow-amber-strong': '0 0 30px rgb(255 195 0 / 0.5), 0 0 60px rgb(255 195 0 / 0.3)',
        'cyber-glow-gold-strong': '0 0 30px rgb(255 215 0 / 0.5), 0 0 60px rgb(255 215 0 / 0.3)',

        // Combination Glows (your exact values)
        'cyber-glow-blue-yellow': '0 0 20px rgb(0 153 255 / 0.2), 0 0 30px rgb(255 255 0 / 0.2)',

        // Enhanced intensity variants (your exact values)
        'cyber-glow-secondary-strong': '0 0 30px rgb(57 255 20 / 0.5), 0 0 60px rgb(57 255 20 / 0.3)',
        'cyber-glow-accent-strong': '0 0 30px rgb(188 19 254 / 0.5), 0 0 60px rgb(188 19 254 / 0.3)',
        'cyber-glow-warning-strong': '0 0 30px rgb(255 107 0 / 0.5), 0 0 60px rgb(255 107 0 / 0.3)',
        'cyber-glow-danger-strong': '0 0 30px rgb(255 7 58 / 0.5), 0 0 60px rgb(255 7 58 / 0.3)',
      },
      animation: {
        // Your exact animation definitions
        'cyber-scan': 'cyber-scan 2s infinite',
        'cyber-pulse': 'cyber-pulse 2s infinite',
        'cyber-spin': 'cyber-spin 1s linear infinite',
        'cyber-text-scan': 'cyber-text-scan 2s infinite',
        'cyber-glow-intense': 'cyber-glow-intense 2s infinite',

        // Variant-specific animations with exact timings
        'cyber-scan-yellow': 'cyber-scan 2s infinite',
        'cyber-scan-amber': 'cyber-scan 2.5s infinite',
        'cyber-scan-gold': 'cyber-scan 2.2s infinite',
        'cyber-scan-secondary': 'cyber-scan 2.3s infinite',
        'cyber-scan-accent': 'cyber-scan 2.7s infinite',
        'cyber-scan-warning': 'cyber-scan 1.8s infinite',
        'cyber-scan-danger': 'cyber-scan 1.5s infinite',

        // Pulse variants
        'cyber-pulse-yellow': 'cyber-pulse 2s infinite',
        'cyber-pulse-amber': 'cyber-pulse 2s infinite',
        'cyber-pulse-gold': 'cyber-pulse 2s infinite',
        'cyber-pulse-yellow-soft': 'cyber-pulse 2s infinite',
      },
      backdropBlur: {
        // Your exact backdrop blur values
        'cyber': '12px',
        'cyber-strong': '20px',
      },
      letterSpacing: {
        // Your exact letter spacing values
        'cyber': '0.05em',
        'cyber-wide': '0.1em',
      },
      transitionTimingFunction: {
        // Your exact cubic-bezier timing
        'cyber': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
