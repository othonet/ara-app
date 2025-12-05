"use client"

import { Sidebar } from "./sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { ColorPicker } from "@/components/ui/color-picker"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Background com gradiente e padrões */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5 dark:from-background dark:via-background/98 dark:to-primary/10">
        {/* Padrão de fundo decorativo */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_50%)]"></div>
        </div>
        {/* Efeitos de luz decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Split Screen Container */}
      <div className="relative flex w-full h-full gap-4 p-4">
        {/* Lado Esquerdo - Sidebar com Glassmorfismo */}
        <div className="flex-shrink-0">
          <Sidebar />
        </div>

        {/* Lado Direito - Conteúdo Principal com Glassmorfismo */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header com Glassmorfismo */}
          <header className="relative z-10 flex h-16 items-center justify-between rounded-2xl mb-4 px-6 backdrop-blur-xl bg-card/40 dark:bg-card/30 border border-border/50 shadow-lg shadow-black/5 dark:shadow-black/20 ring-1 ring-white/10 dark:ring-white/5">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                Sistema de Controle
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <ColorPicker />
              <ThemeToggle />
            </div>
          </header>

          {/* Main Content com Glassmorfismo */}
          <main className="relative flex-1 overflow-y-auto rounded-2xl backdrop-blur-xl bg-card/30 dark:bg-card/20 border border-border/50 shadow-xl shadow-black/5 dark:shadow-black/20 ring-1 ring-white/10 dark:ring-white/5 p-6 animate-in fade-in-0 duration-300">
            {/* Overlay interno para profundidade */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none"></div>
            <div className="relative z-10">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

