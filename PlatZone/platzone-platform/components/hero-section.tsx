"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { ArrowLeft, ArrowRight, Search } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-purple-50 to-background dark:from-primary/5 dark:via-purple-950/20 dark:to-background">
      <div className="container px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="block">{t("heroTitle")}</span>
            <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t("heroSubtitle")}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t("heroDescription")}</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="group">
              <Link href="/offers">
                {t("startBrowsing")}
                {isRTL ? (
                  <ArrowLeft className="ml-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/search">
                <Search className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                {t("searchOffers")}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
