"use client"

import { useEffect, useRef, useState, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import * as THREE from "three"
import { useSiteImages, getRandomImage } from "@/hooks/use-site-images"

// Memoize the 3D background to prevent unnecessary re-renders
const ThreeBackground = memo(function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Set up scene
    const scene = new THREE.Scene()

    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Set up renderer with better performance settings
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false, // Disable antialiasing for better performance
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // Limit pixel ratio for better performance

    // Create geometry with fewer particles for better performance
    const particlesCount = Math.min(1000, window.innerWidth < 768 ? 500 : 1000) // Reduce particles on mobile
    const particlesGeometry = new THREE.BufferGeometry()

    const posArray = new Float32Array(particlesCount * 3)
    const colorArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 100

      // Color - subtle blue/purple gradient
      if (i % 3 === 0) {
        colorArray[i] = 0.5 + Math.random() * 0.5 // R
        colorArray[i + 1] = 0.5 + Math.random() * 0.5 // G
        colorArray[i + 2] = 0.8 + Math.random() * 0.2 // B
      }
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Handle resize with debounce for better performance
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth
        const height = window.innerHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      }, 200)
    }

    window.addEventListener("resize", handleResize)

    // Mouse movement effect with throttle for better performance
    let lastMouseMoveTime = 0
    const handleMouseMove = (event: MouseEvent) => {
      const now = performance.now()
      if (now - lastMouseMoveTime < 50) return // Throttle to 20fps
      lastMouseMoveTime = now

      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

      particles.rotation.x = mouseY * 0.1
      particles.rotation.y = mouseX * 0.1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Use requestAnimationFrame with frame skipping for better performance
    let frameCount = 0
    const animate = () => {
      const animationId = requestAnimationFrame(animate)

      // Skip frames on mobile for better performance
      frameCount++
      const shouldRender = window.innerWidth > 768 || frameCount % 2 === 0

      if (shouldRender) {
        particles.rotation.x += 0.0005
        particles.rotation.y += 0.0005

        renderer.render(scene, camera)
      }
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)

      scene.remove(particles)
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none" />
})

export default function HeroSection() {
  const { images: heroImages } = useSiteImages("hero")
  const [heroImage, setHeroImage] = useState("")

  useEffect(() => {
    // Get a random hero image or use the first one if available
    if (heroImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * heroImages.length)
      setHeroImage(heroImages[randomIndex].url)
    } else {
      setHeroImage(getRandomImage("hero"))
    }
  }, [heroImages])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/30 relative overflow-hidden">
      <ThreeBackground />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 animate-fade-in-up">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Websaathy - Web Design & Development Solutions
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                We create stunning websites that drive results for your business. Our team of experts will help you
                stand out online.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-in-up animation-delay-300">
              <Button asChild size="lg" className="animate-pulse-slow">
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/portfolio" className="flex items-center gap-2">
                  View Portfolio
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-float">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 opacity-75 blur-xl animate-pulse-slow"></div>
            {heroImage && (
              <Image
                src={heroImage || "/placeholder.svg"}
                width={600}
                height={600}
                alt="Multiple screens showing responsive web design"
                className="relative mx-auto aspect-square overflow-hidden rounded-xl object-cover shadow-2xl transform transition-transform hover:scale-105"
                loading="eager"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

