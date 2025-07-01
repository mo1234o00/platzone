"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import { Upload, Plus, DollarSign, Calendar, MapPin, Tag } from "lucide-react"
import { useRouter } from "next/navigation"

const categories = [
  { value: "restaurants", label: "مطاعم" },
  { value: "electronics", label: "إلكترونيات" },
  { value: "fashion", label: "ملابس" },
  { value: "services", label: "خدمات" },
]

const cities = [
  { value: "الرياض", label: "الرياض" },
  { value: "جدة", label: "جدة" },
  { value: "الدمام", label: "الدمام" },
  { value: "مكة", label: "مكة" },
  { value: "المدينة", label: "المدينة" },
]

export default function AddOfferPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    category: "",
    city: "",
    duration: "",
    image: null as File | null,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.originalPrice ||
      !formData.discountedPrice ||
      !formData.category ||
      !formData.city ||
      !formData.duration
    ) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    if (Number.parseFloat(formData.discountedPrice) >= Number.parseFloat(formData.originalPrice)) {
      toast({
        title: "خطأ",
        description: "السعر بعد الخصم يجب أن يكون أقل من السعر الأصلي",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "تم إضافة العرض بنجاح! 🎉",
        description: "سيتم مراجعة العرض ونشره قريباً",
      })

      // Reset form
      setFormData({
        title: "",
        description: "",
        originalPrice: "",
        discountedPrice: "",
        category: "",
        city: "",
        duration: "",
        image: null,
      })

      // Redirect to offers page
      setTimeout(() => {
        router.push("/offers")
      }, 1500)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة العرض. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute redirectTo="/add-offer">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">{t("addNewOffer")}</h1>
              <p className="text-muted-foreground">شارك عرضك المميز مع المجتمع</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                  تفاصيل العرض
                </CardTitle>
                <CardDescription>املأ النموذج أدناه لإضافة عرضك الجديد</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Offer Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {t("offerTitle")} *
                    </Label>
                    <Input
                      id="title"
                      placeholder={t("enterOfferTitle")}
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">{t("description")} *</Label>
                    <Textarea
                      id="description"
                      placeholder={t("enterDescription")}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  {/* Price Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice" className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        {t("originalPrice")} *
                      </Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        placeholder="0"
                        value={formData.originalPrice}
                        onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discountedPrice">{t("discountedPrice")} *</Label>
                      <Input
                        id="discountedPrice"
                        type="number"
                        placeholder="0"
                        value={formData.discountedPrice}
                        onChange={(e) => handleInputChange("discountedPrice", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Category and City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t("category")} *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
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
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        {t("city")} *
                      </Label>
                      <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
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
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {t("offerDuration")} * ({t("days")})
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="7"
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      min="1"
                      max="30"
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image" className="flex items-center">
                      <Upload className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {t("offerImage")}
                    </Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                      <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      <label htmlFor="image" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {formData.image ? formData.image.name : "اضغط لرفع صورة العرض"}
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:ml-2 rtl:mr-0"></div>
                        جاري الإضافة...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        {t("submitOffer")}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
