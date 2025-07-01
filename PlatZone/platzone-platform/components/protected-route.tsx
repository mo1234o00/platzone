"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogIn, Lock } from "lucide-react"
import Link from "next/link"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function ProtectedRoute({ children, redirectTo }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated && redirectTo) {
      // Save the intended destination
      sessionStorage.setItem("redirectAfterLogin", redirectTo)
    }
  }, [isAuthenticated, isLoading, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{t("loginRequired")}</h2>
            <p className="text-muted-foreground mb-6">{t("loginRequiredMessage")}</p>
            <Button asChild className="w-full">
              <Link href="/login">
                <LogIn className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {t("login")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
