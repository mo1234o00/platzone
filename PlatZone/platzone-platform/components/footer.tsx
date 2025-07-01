"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = [
    {
      title: t("quickLinks"),
      links: [
        { name: t("home"), href: "/" },
        { name: t("offers"), href: "/offers" },
        { name: t("addOffer"), href: "/add-offer" },
        { name: t("aboutUs"), href: "/about" },
      ],
    },
    {
      title: t("support"),
      links: [
        { name: t("contactUs"), href: "/contact" },
        { name: t("privacyPolicy"), href: "/privacy" },
        { name: t("terms"), href: "/terms" },
        { name: t("faq"), href: "/faq" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ]

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                P
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                PlatZone
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">{t("footerDescription")}</p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("contactInfo")}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@platzone.com</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{t("location")}</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PlatZone. {t("allRightsReserved")}
          </p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">Made with ❤️ by Mostafa Algezawy</p>
        </div>
      </div>
    </footer>
  )
}
