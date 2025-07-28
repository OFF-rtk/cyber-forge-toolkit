import { Fira_Code, Open_Sans, Inter, Cinzel, Crimson_Pro, UnifrakturMaguntia } from 'next/font/google'

// Remove duplicate declarations - one font per const only
export const OpenSans = Open_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
})

export const CinzelFont = Cinzel({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-cinzel',
    display: 'swap',
})

export const CrimsonPro = Crimson_Pro({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-crimson',
    display: 'swap',
})

export const FiraCodeAncient = Fira_Code({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-fira-ancient',
    display: 'swap',
})

export const UnifrakturMaguntiaFont = UnifrakturMaguntia({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-gothic',
    display: 'swap',
})
