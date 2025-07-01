"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import Link from "next/link"

// إضافة imports:
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // في بداية المكون:
  const { login, register, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })

  // إضافة دوال التعامل مع النماذج:
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive",
      })
      return
    }

    const success = await login(loginForm.email, loginForm.password)
    if (success) {
      const redirectTo = sessionStorage.getItem("redirectAfterLogin")
      if (redirectTo) {
        sessionStorage.removeItem("redirectAfterLogin")
        router.push(redirectTo)
      } else {
        router.push("/")
      }
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive",
      })
      return
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive",
      })
      return
    }

    const success = await register(registerForm.name, registerForm.email, registerForm.password)
    if (success) {
      const redirectTo = sessionStorage.getItem("redirectAfterLogin")
      if (redirectTo) {
        sessionStorage.removeItem("redirectAfterLogin")
        router.push(redirectTo)
      } else {
        router.push("/")
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("welcomeBack")}</h1>
            <p className="text-muted-foreground">{t("loginDescription")}</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t("login")}</TabsTrigger>
              <TabsTrigger value="register">{t("register")}</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>{t("loginToAccount")}</CardTitle>
                  <CardDescription>{t("enterCredentials")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* تحديث النماذج لتستخدم onSubmit والـ state: */}
                  {/* في TabsContent للـ login: */}
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("email")}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 rtl:right-3 rtl:left-auto top-3 h-4 w-4 text-muted-foreground" />
                        {/* في Input للـ email: */}
                        <Input
                          id="email"
                          type="email"
                          placeholder={t("enterEmail")}
                          className="pl-10 rtl:pr-10 rtl:pl-3"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">{t("password")}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-3 h-4 w-4 text-muted-foreground" />
                        {/* في Input للـ password: */}
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t("enterPassword")}
                          className="pl-10 pr-10 rtl:pr-10 rtl:pl-10"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 rtl:left-0 rtl:right-auto top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        {t("forgotPassword")}
                      </Link>
                    </div>

                    {/* في Button: */}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "جاري تسجيل الدخول..." : t("login")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>{t("createAccount")}</CardTitle>
                  <CardDescription>{t("registerDescription")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* نفس الشيء للـ register form */}
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("fullName")}</Label>
                      <div className="relative">
                        <User className="absolute left-3 rtl:right-3 rtl:left-auto top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder={t("enterFullName")}
                          className="pl-10 rtl:pr-10 rtl:pl-3"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">{t("email")}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 rtl:right-3 rtl:left-auto top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder={t("enterEmail")}
                          className="pl-10 rtl:pr-10 rtl:pl-3"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">{t("password")}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t("enterPassword")}
                          className="pl-10 pr-10 rtl:pr-10 rtl:pl-10"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 rtl:left-0 rtl:right-auto top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={t("confirmPassword")}
                          className="pl-10 pr-10 rtl:pr-10 rtl:pl-10"
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 rtl:left-0 rtl:right-auto top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {t("createAccount")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
