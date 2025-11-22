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
          <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-white/20">
            <Image
              src="/logo.png"
              alt="Ceylon RS Tours Logo"
              fill
              className="object-cover"
            />
          </div>
          <span
            className={cn(
              "font-serif text-2xl font-bold tracking-tighter transition-colors",
              isScrolled ? "text-deep-navy" : "text-white",
            )}
          >
            Ceylon RS Tours
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {["About", "Packages", "Gallery", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-tropical-turquoise",
                isScrolled ? "text-dark-grey" : "text-white/90",
              )}
            >
              {item}
            </Link>
          ))}
          <Button
            className={cn(
              "rounded-full px-6 font-semibold transition-all hover:scale-105",
              isScrolled
                ? "bg-ocean-blue hover:bg-deep-navy text-white"
                : "bg-white text-ocean-blue hover:bg-off-white",
            )}
          >
            Plan Your Trip
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-dark-grey" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-dark-grey" : "text-white"} />
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
              className="text-lg font-medium text-dark-grey hover:text-ocean-blue border-b border-light-grey pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Button className="w-full bg-ocean-blue hover:bg-deep-navy text-white rounded-full py-6 text-lg">
            Plan Your Trip
          </Button>
        </div>
      )}
    </nav>
  )
}
