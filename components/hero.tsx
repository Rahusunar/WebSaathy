"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function Hero() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-36">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Transform Your Online Presence with Websaathy
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                We create stunning websites that drive results. Our expert team delivers beautiful designs, powerful
                functionality, and effective digital marketing strategies.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                asChild
                size="lg"
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="transition-all duration-300 hover:scale-105">
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-auto aspect-[4/3] max-w-[600px]">
              <img
                src="/images/hero-image.png"
                alt="Websaathy Web Design and Development"
                className="w-full h-full object-cover object-center rounded-lg shadow-md"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

