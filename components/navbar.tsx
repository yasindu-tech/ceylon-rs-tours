"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-luxvio-gold/50">
            <Image
              src="/luxvio-logo.jpg"
              alt="Luxvio Ceylon Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                "font-cursive text-3xl font-bold leading-none transition-colors",
                isScrolled ? "text-luxvio-teal" : "text-luxvio-gold",
              )}
            >
              Luxvio
            </span>
            <span
              className={cn(
                "font-serif text-xs tracking-[0.2em] uppercase transition-colors",
                isScrolled ? "text-luxvio-charcoal" : "text-white/90",
              )}
            >
              Ceylon
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {["About", "Packages", "Gallery", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-luxvio-gold",
                isScrolled ? "text-luxvio-charcoal" : "text-white/90",
              )}
            >
              {item}
            </Link>
          ))}
          <Button
            asChild
            className={cn(
              "rounded-full px-6 font-semibold transition-all hover:scale-105",
              isScrolled
                ? "bg-luxvio-teal hover:bg-luxvio-teal/90 text-white"
                : "bg-white text-luxvio-teal hover:bg-luxvio-cream",
            )}
          >
            <Link href="https://wa.me/94778574816?text=Hi, I'm interested in planning a trip to Sri Lanka." target="_blank">
              Plan Your Trip
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-luxvio-charcoal" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-luxvio-charcoal" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-6 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {["About", "Packages", "Gallery", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lg font-medium text-luxvio-charcoal hover:text-luxvio-teal border-b border-luxvio-cream pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Button asChild className="w-full bg-luxvio-teal hover:bg-luxvio-teal/90 text-white rounded-full py-6 text-lg">
            <Link href="https://wa.me/94778574816?text=Hi, I'm interested in planning a trip to Sri Lanka." target="_blank">
              Plan Your Trip
            </Link>
          </Button>
        </div>
      )}
    </nav>
  )
}
