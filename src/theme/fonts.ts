// Optimized font loading - only import weights that are actually used

// Inter - primary font (weights: 400, 500, 600, 700, 800, 900)
import '@fontsource/inter/400.css' // Normal weight - body text
import '@fontsource/inter/500.css' // Medium weight - UI elements
import '@fontsource/inter/600.css' // Semi-bold - subtitles, some headings
import '@fontsource/inter/700.css' // Bold - navigation, some headings
import '@fontsource/inter/800.css' // Extra-bold - major headings, buttons
import '@fontsource/inter/900.css' // Black - hero headings

// Poppins - secondary font (same weights for consistency)
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import '@fontsource/poppins/900.css'

// Note: Roboto removed from imports as it's the 3rd fallback
// and Inter/Poppins should cover most use cases
