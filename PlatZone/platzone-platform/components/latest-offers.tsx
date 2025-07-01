"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Clock, MapPin, Star, ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for offers
const offers = [
  {
    id: 1,
    title: "خصم 50% على جميع الوجبات",
    store: "مطعم الأصالة",
    originalPrice: 100,
    discountedPrice: 50,
    timeLeft: "2 أيام",
    rating: 4.5,
    location: "الرياض",
    category: "مطاعم",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "عرض خاص على الهواتف الذكية",
    store: "متجر التقنية",
    originalPrice: 2000,
    discountedPrice: 1500,
    timeLeft: "5 أيام",
    rating: 4.8,
    location: "جدة",
    category: "إلكترونيات",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "تخفيضات الموسم على الملابس",
    store: "أزياء العصر",
    originalPrice: 300,
    discountedPrice: 180,
    timeLeft: "1 أسبوع",
    rating: 4.2,
    location: "الدمام",
    category: "ملابس",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "خدمات صيانة بأسعار مخفضة",
    store: "مركز الخدمات",
    originalPrice: 500,
    discountedPrice: 350,
    timeLeft: "3 أيام",
    rating: 4.6,
    location: "الرياض",
    category: "خدمات",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function LatestOffers() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="py-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{t("latestOffers")}</h2>
            <p className="text-muted-foreground">{t("latestOffersDescription")}</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/offers">
              {t("viewAll")}
              {isRTL ? <ArrowLeft className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <Card
              key={offer.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600">
                  {Math.round(((offer.originalPrice - offer.discountedPrice) / offer.originalPrice) * 100)}% {t("off")}
                </Badge>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {offer.category}
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs ml-1 rtl:mr-1 rtl:ml-0">{offer.rating}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {offer.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-3">{offer.store}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                    {offer.location}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                    {offer.timeLeft}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-lg font-bold text-primary">
                      {offer.discountedPrice} {t("currency")}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {offer.originalPrice} {t("currency")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
