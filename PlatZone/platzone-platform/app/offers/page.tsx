"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { Search, Filter, MapPin, Clock, Star, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for offers
const allOffers = [
  {
    id: 1,
    title: "خصم 50% على جميع الوجبات",
    store: "مطعم الأصالة",
    originalPrice: 100,
    discountedPrice: 50,
    timeLeft: "2 أيام",
    rating: 4.5,
    location: "الرياض",
    category: "restaurants",
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
    category: "electronics",
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
    category: "fashion",
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
    category: "services",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "وجبات سريعة بأسعار مميزة",
    store: "مطعم البرجر",
    originalPrice: 80,
    discountedPrice: 40,
    timeLeft: "4 أيام",
    rating: 4.3,
    location: "جدة",
    category: "restaurants",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "أجهزة كمبيوتر محمولة",
    store: "تك ستور",
    originalPrice: 3000,
    discountedPrice: 2400,
    timeLeft: "1 أسبوع",
    rating: 4.7,
    location: "الرياض",
    category: "electronics",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const categories = [
  { value: "all", label: "جميع التصنيفات" },
  { value: "restaurants", label: "مطاعم" },
  { value: "electronics", label: "إلكترونيات" },
  { value: "fashion", label: "ملابس" },
  { value: "services", label: "خدمات" },
]

const cities = [
  { value: "all", label: "جميع المدن" },
  { value: "الرياض", label: "الرياض" },
  { value: "جدة", label: "جدة" },
  { value: "الدمام", label: "الدمام" },
]

const sortOptions = [
  { value: "newest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
  { value: "price-high", label: "السعر من الأعلى للأقل" },
  { value: "price-low", label: "السعر من الأقل للأعلى" },
]

export default function OffersPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCity, setSelectedCity] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const filteredOffers = useMemo(() => {
    const filtered = allOffers.filter((offer) => {
      const matchesSearch =
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.store.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || offer.category === selectedCategory
      const matchesCity = selectedCity === "all" || offer.location === selectedCity

      return matchesSearch && matchesCategory && matchesCity
    })

    // Sort offers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-high":
          return b.discountedPrice - a.discountedPrice
        case "price-low":
          return a.discountedPrice - b.discountedPrice
        case "oldest":
          return a.id - b.id
        default: // newest
          return b.id - a.id
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedCity, sortBy])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedCity("all")
    setSortBy("newest")
  }

  const hasActiveFilters = searchTerm || selectedCategory !== "all" || selectedCity !== "all" || sortBy !== "newest"

  return (
    <ProtectedRoute redirectTo="/offers">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("allOffers")}</h1>
            <p className="text-muted-foreground">اكتشف أفضل العروض والخصومات المتاحة</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في العروض..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rtl:pr-10 rtl:pl-3"
              />
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
                <Filter className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {t("filterBy")}
              </Button>

              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="text-sm">
                  <X className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                  {t("clearFilters")}
                </Button>
              )}
            </div>

            {/* Filters */}
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? "block" : "hidden md:grid"}`}>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectCity")} />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder={t("sortBy")} />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center text-sm text-muted-foreground">{filteredOffers.length} عرض متاح</div>
            </div>
          </div>

          {/* Offers Grid */}
          {filteredOffers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t("noOffersFound")}</h3>
              <p className="text-muted-foreground mb-4">جرب تغيير معايير البحث أو التصفية</p>
              <Button onClick={clearFilters} variant="outline">
                {t("clearFilters")}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredOffers.map((offer) => (
                <Card
                  key={offer.id}
                  className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                >
                  <Link href={`/offers/${offer.id}`}>
                    <div className="relative">
                      <Image
                        src={offer.image || "/placeholder.svg"}
                        alt={offer.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600">
                        {Math.round(((offer.originalPrice - offer.discountedPrice) / offer.originalPrice) * 100)}%{" "}
                        {t("off")}
                      </Badge>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {t(`category.${offer.category}`)}
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
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
