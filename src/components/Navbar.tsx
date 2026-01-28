import { BarChart2, Eye, Layout, Zap } from 'lucide-react'
import type { ViewMode } from '../types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useViewContext } from '../hooks/useView'

const Navbar = () => {
  const { view, setView } = useViewContext()

  const navItems = [
    { id: 'builder', label: 'Builder', icon: Layout },
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ] as const

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
            TarunForms
          </span>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-muted/50 rounded-lg border border-border/50">
          {navItems.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={view === id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView(id as ViewMode)}
              className={cn(
                "h-8 px-3 transition-all duration-200",
                view === id 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-transparent"
              )}
            >
              <Icon className={cn("h-4 w-4", view === id ? "mr-2" : "mr-0 sm:mr-2")} />
              <span className="hidden sm:inline-block font-medium">{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar