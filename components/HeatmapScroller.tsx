"use client"

import { useEffect, useRef } from "react"

export default function HeatmapScroller({
    children,
}:{
    children: React.ReactNode
}){
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        const container = containerRef.current
        const today = container?.querySelector("[data-today]")

        if(container && today){
            const containerRect = container.getBoundingClientRect()
            const todayRect = today.getBoundingClientRect()

            container.scrollLeft +=
                todayRect.left - 
                containerRect.left - 
                containerRect.width / 2 
        }
    },[])

    return(
        <div 
            ref={containerRef}
            className="overflow-x-auto scroll-smooth"
        >
            {children}
        </div>
    )
}