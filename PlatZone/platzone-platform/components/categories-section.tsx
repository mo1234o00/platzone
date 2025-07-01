"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { Utensils, Smartphone, Shirt, Wrench } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "restaurants",
    icon: Utensils,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
  },
  {
    id: "electronics",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    id: "fashion",
    icon: Shirt,
    color: "from-pink-500 to-purple-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
  },
  {
    id: "services",
    icon: Wrench,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
]

export function CategoriesSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("mainCategories")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("categoriesDescription")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/offers?category=${category.id}`}>
              <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-0 bg-background/60 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${category.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon
                      className={`h-8 w-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                    />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {t(`category.${category.id}`)}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
