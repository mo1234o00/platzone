"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage}>
      <Languages className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
      {language === "ar" ? "EN" : "عر"}
    </Button>
  )
}
