import React, { useState } from 'react'
import logo from '../../imports/Untitled.svg'

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  // Use passed src first, fallback to the imported logo SVG on error or missing src
  const imageSource = didError || !src ? logo : src

  return (
    <img 
      src={imageSource} 
      alt={alt || "In The Fold Logo"} 
      className={className} 
      style={style} 
      {...rest} 
      onError={handleError} 
    />
  )
}
