"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { optimizeImageUrl, getPlaceholderImage, isValidImageUrl } from "@/utils/image-utils"

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src?: string | null
  fallback?: string
  lowQuality?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  fallback,
  lowQuality = false,
  loading = "lazy",
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (isValidImageUrl(src)) {
      // Optimize the image URL
      const optimizedSrc = optimizeImageUrl(
        src as string,
        typeof width === "number" ? width : 400,
        typeof height === "number" ? height : 300,
      )
      setImageSrc(optimizedSrc)
      setError(false)
    } else if (fallback) {
      setImageSrc(fallback)
      setError(false)
    } else {
      // Use a placeholder
      setImageSrc(
        getPlaceholderImage(typeof width === "number" ? width : 400, typeof height === "number" ? height : 300),
      )
      setError(true)
    }
  }, [src, width, height, fallback])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setError(true)
    if (fallback) {
      setImageSrc(fallback)
    } else {
      setImageSrc(
        getPlaceholderImage(typeof width === "number" ? width : 400, typeof height === "number" ? height : 300),
      )
    }
  }

  // Apply blur effect for low quality images
  const blurDataURL = lowQuality ? getPlaceholderImage(10, 10) : undefined

  return (
    <div className="relative" style={{ width: "100%", height: "100%" }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}

      {imageSrc && (
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={alt || ""}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          blurDataURL={blurDataURL}
          placeholder={lowQuality ? "blur" : undefined}
          {...props}
        />
      )}
    </div>
  )
}

