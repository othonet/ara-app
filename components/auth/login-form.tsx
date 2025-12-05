"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    console.log("[LOGIN FORM] Iniciando login com:", { email: data.email })
    setIsLoading(true)
    try {
      console.log("[LOGIN FORM] Enviando requisição para /api/auth/login")
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      console.log("[LOGIN FORM] Status da resposta:", response.status)
      const result = await response.json()
      console.log("[LOGIN FORM] Resposta recebida:", result)

      if (!response.ok) {
        console.error("[LOGIN FORM] Erro na resposta:", result.error)
        throw new Error(result.error || "Erro ao fazer login")
      }

      console.log("[LOGIN FORM] Login bem-sucedido! Token recebido:", result.user)
      console.log("[LOGIN FORM] Cookies após login:", document.cookie)

      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando...",
      })

      // Usar window.location para garantir que o cookie seja lido
      setTimeout(() => {
        console.log("[LOGIN FORM] Redirecionando para /dashboard")
        window.location.href = "/dashboard"
      }, 500)
    } catch (error: any) {
      console.error("[LOGIN FORM] Erro no login:", error)
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in-0 zoom-in-95 duration-500">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="h-12 bg-background border-border/50 backdrop-blur-sm transition-all focus:scale-[1.01] focus:ring-2 focus:ring-primary/20"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-12 bg-background border-border/50 backdrop-blur-sm transition-all focus:scale-[1.01] focus:ring-2 focus:ring-primary/20"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Entrando...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </CardContent>
    </div>
  )
}

