"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser = {
        id: "1",
        name: "مستخدم تجريبي",
        email: email,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في PlatZone",
      })

      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "يرجى التحقق من البيانات والمحاولة مرة أخرى",
        variant: "destructive",
      })
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful registration
      const mockUser = {
        id: "1",
        name: name,
        email: email,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "مرحباً بك في PlatZone",
      })

      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "خطأ في إنشاء الحساب",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      })
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({
      title: "تم تسجيل الخروج",
      description: "نراك قريباً",
    })
  }

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
