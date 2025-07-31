import { 
  JetBrains_Mono, 
  Fira_Code,
  Source_Code_Pro, 
  IBM_Plex_Mono,
  Space_Mono,
  Inter
} from 'next/font/google'

// === PRIMARY CODE AESTHETIC FONTS ===

// Primary monospace font - JetBrains Mono for UI text
export const jetbrainsMonoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// Secondary code font - Fira Code for code blocks
export const firaCodeFont = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fira-code',
  display: 'swap',
})

// Professional monospace - Source Code Pro for body text
export const sourceCodeProFont = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source-code',
  display: 'swap',
})

// IBM design system font - IBM Plex Mono for UI components
export const ibmPlexMonoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

// Display font for headers - Space Mono
export const spaceMonoFont = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

// Clean fallback font - Inter for specific use cases
export const interFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

// === FONT CONFIGURATION OBJECT ===
export const fontConfig = {
  // Primary fonts for code editor aesthetic
  primary: jetbrainsMonoFont,      // --font-primary in globals.css
  secondary: firaCodeFont,         // --font-secondary in globals.css
  ui: ibmPlexMonoFont,            // --font-ui in globals.css
  display: spaceMonoFont,         // --font-display in globals.css
  body: sourceCodeProFont,        // --font-body in globals.css
  accent: interFont,              // --font-accent in globals.css (clean fallback)
} as const

// === UTILITY FUNCTIONS ===

// Get all font variables for className
export const getAllFontVariables = () => {
  return [
    jetbrainsMonoFont.variable,
    firaCodeFont.variable,
    sourceCodeProFont.variable,
    ibmPlexMonoFont.variable,
    spaceMonoFont.variable,
    interFont.variable,
  ].join(' ')
}

// Get specific font family string for CSS
export const getFontFamily = (fontName: keyof typeof fontConfig) => {
  return fontConfig[fontName].style.fontFamily
}
