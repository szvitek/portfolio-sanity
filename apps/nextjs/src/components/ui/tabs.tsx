import { cn } from "@/lib/utils"
import { useState } from "react"

interface Tab {
  key: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab?: string
  onTabChange?: (key: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  const [internalTab, setInternalTab] = useState(tabs[0]?.key)
  const current = activeTab ?? internalTab

  return (
    <div className={cn("flex flex-wrap gap-1 rounded-lg bg-neutral-100 p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => {
            setInternalTab(tab.key)
            onTabChange?.(tab.key)
          }}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            current === tab.key
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-600 hover:text-neutral-900",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
