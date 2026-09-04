import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin)

// ============================================================
// GSAP DEFAULT SETTINGS
// ============================================================
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

// Use transform/opacity only — never layout-triggering properties
gsap.config({
  force3D: true,
})

export { gsap, ScrollTrigger }
