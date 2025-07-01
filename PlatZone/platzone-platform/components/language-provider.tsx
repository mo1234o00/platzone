"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  ar: {
    // Header
    offers: "العروض",
    addOffer: "أضف عرض",
    login: "تسجيل الدخول",

    // Hero Section
    heroTitle: "اكتشف أفضل العروض",
    heroSubtitle: "حولك",
    heroDescription:
      "منصة العروض والخصومات الأولى في المنطقة. اكتشف أحدث العروض والخصومات من المتاجر والمطاعم المحلية.",
    startBrowsing: "ابدأ التصفح",
    searchOffers: "البحث في العروض",

    // Categories
    mainCategories: "التصنيفات الرئيسية",
    categoriesDescription: "تصفح العروض حسب التصنيف المفضل لديك",
    "category.restaurants": "مطاعم",
    "category.electronics": "إلكترونيات",
    "category.fashion": "ملابس",
    "category.services": "خدمات",

    // Latest Offers
    latestOffers: "أحدث العروض",
    latestOffersDescription: "اكتشف أحدث العروض والخصومات المتاحة",
    viewAll: "عرض الكل",
    off: "خصم",
    currency: "ريال",

    // Footer
    quickLinks: "روابط سريعة",
    support: "الدعم",
    home: "الرئيسية",
    aboutUs: "من نحن",
    contactUs: "تواصل معنا",
    privacyPolicy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    faq: "الأسئلة الشائعة",
    contactInfo: "معلومات التواصل",
    location: "الرياض، المملكة العربية السعودية",
    footerDescription: "منصة العروض والخصومات الأولى في المنطقة",
    allRightsReserved: "جميع الحقوق محفوظة",
    madeWithLove: "صنع بحب في المملكة العربية السعودية",

    // Auth
    welcomeBack: "مرحباً بعودتك",
    loginDescription: "سجل دخولك للوصول إلى حسابك",
    loginToAccount: "تسجيل الدخول",
    enterCredentials: "أدخل بياناتك لتسجيل الدخول",
    email: "البريد الإلكتروني",
    enterEmail: "أدخل بريدك الإلكتروني",
    password: "كلمة المرور",
    enterPassword: "أدخل كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    register: "إنشاء حساب",
    createAccount: "إنشاء حساب جديد",
    registerDescription: "أنشئ حسابك الجديد للبدء",
    fullName: "الاسم الكامل",
    enterFullName: "أدخل اسمك الكامل",
    confirmPassword: "تأكيد كلمة المرور",
    pleaseLogin: "يرجى تسجيل الدخول أولاً",
    loginRequired: "تسجيل الدخول مطلوب",
    loginRequiredMessage: "يجب تسجيل الدخول للوصول إلى هذه الصفحة",

    // Offers Page
    allOffers: "جميع العروض",
    filterBy: "تصفية حسب",
    category: "التصنيف",
    priceRange: "نطاق السعر",
    city: "المدينة",
    sortBy: "ترتيب حسب",
    newest: "الأحدث",
    oldest: "الأقدم",
    priceHighToLow: "السعر من الأعلى للأقل",
    priceLowToHigh: "السعر من الأقل للأعلى",
    clearFilters: "مسح التصفية",
    noOffersFound: "لم يتم العثور على عروض",
    loadMore: "تحميل المزيد",

    // Add Offer Page
    addNewOffer: "إضافة عرض جديد",
    offerTitle: "عنوان العرض",
    enterOfferTitle: "أدخل عنوان العرض",
    description: "الوصف",
    enterDescription: "أدخل وصف العرض",
    originalPrice: "السعر الأصلي",
    discountedPrice: "السعر بعد الخصم",
    offerImage: "صورة العرض",
    selectCategory: "اختر التصنيف",
    selectCity: "اختر المدينة",
    offerDuration: "مدة العرض",
    days: "أيام",
    submitOffer: "إضافة العرض",
    offerAddedSuccess: "تم إضافة العرض بنجاح",
  },
  en: {
    // Header
    offers: "Offers",
    addOffer: "Add Offer",
    login: "Login",

    // Hero Section
    heroTitle: "Discover the Best Offers",
    heroSubtitle: "Around You",
    heroDescription:
      "The first offers and discounts platform in the region. Discover the latest offers and discounts from local stores and restaurants.",
    startBrowsing: "Start Browsing",
    searchOffers: "Search Offers",

    // Categories
    mainCategories: "Main Categories",
    categoriesDescription: "Browse offers by your preferred category",
    "category.restaurants": "Restaurants",
    "category.electronics": "Electronics",
    "category.fashion": "Fashion",
    "category.services": "Services",

    // Latest Offers
    latestOffers: "Latest Offers",
    latestOffersDescription: "Discover the latest available offers and discounts",
    viewAll: "View All",
    off: "OFF",
    currency: "SAR",

    // Footer
    quickLinks: "Quick Links",
    support: "Support",
    home: "Home",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    terms: "Terms & Conditions",
    faq: "FAQ",
    contactInfo: "Contact Info",
    location: "Riyadh, Saudi Arabia",
    footerDescription: "The first offers and discounts platform in the region",
    allRightsReserved: "All rights reserved",
    madeWithLove: "Made with love in Saudi Arabia",

    // Auth
    welcomeBack: "Welcome Back",
    loginDescription: "Sign in to access your account",
    loginToAccount: "Sign In",
    enterCredentials: "Enter your credentials to sign in",
    email: "Email",
    enterEmail: "Enter your email",
    password: "Password",
    enterPassword: "Enter your password",
    forgotPassword: "Forgot Password?",
    register: "Register",
    createAccount: "Create New Account",
    registerDescription: "Create your new account to get started",
    fullName: "Full Name",
    enterFullName: "Enter your full name",
    confirmPassword: "Confirm Password",
    pleaseLogin: "Please login first",
    loginRequired: "Login Required",
    loginRequiredMessage: "You must be logged in to access this page",

    // Offers Page
    allOffers: "All Offers",
    filterBy: "Filter By",
    category: "Category",
    priceRange: "Price Range",
    city: "City",
    sortBy: "Sort By",
    newest: "Newest",
    oldest: "Oldest",
    priceHighToLow: "Price High to Low",
    priceLowToHigh: "Price Low to High",
    clearFilters: "Clear Filters",
    noOffersFound: "No offers found",
    loadMore: "Load More",

    // Add Offer Page
    addNewOffer: "Add New Offer",
    offerTitle: "Offer Title",
    enterOfferTitle: "Enter offer title",
    description: "Description",
    enterDescription: "Enter offer description",
    originalPrice: "Original Price",
    discountedPrice: "Discounted Price",
    offerImage: "Offer Image",
    selectCategory: "Select Category",
    selectCity: "Select City",
    offerDuration: "Offer Duration",
    days: "Days",
    submitOffer: "Submit Offer",
    offerAddedSuccess: "Offer added successfully",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "ar" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  const isRTL = language === "ar"

  return <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
