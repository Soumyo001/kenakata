import React from 'react'
import { cn } from "@/lib/utils"

const Container = ({className, children}: {className?: string, children: React.ReactNode}) => {
  return (
    <div className={cn("w-full max-w-7xl mx-auto px-4", className)}>
        {children}
    </div>
  )
}

export default Container