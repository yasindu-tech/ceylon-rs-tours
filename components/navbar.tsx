"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"



export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-100 py-3" : "bg-white py-4",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-luxvio-gold/20">
            <Image
              src="/luxvio-logo.jpg"
              alt="Luxvio Ceylon Logo"
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-bold tracking-tight text-luxvio-charcoal leading-none">
              Luxvio
            </span>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-luxvio-gold font-medium">
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
              className="text-sm font-medium text-gray-600 hover:text-luxvio-gold transition-colors font-sans"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Search Bar & Action */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-4 pr-10 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-luxvio-gold/50 focus:ring-1 focus:ring-luxvio-gold/50 w-48 transition-all"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-luxvio-gold text-white rounded-full hover:bg-earth-800 transition-colors">
              <Search className="w-3 h-3" />
            </button>
          </div>

          <Button
            asChild
            className="rounded-full px-6 font-semibold bg-luxvio-gold hover:bg-earth-800 text-white transition-all shadow-md hover:shadow-lg"
          >
            <Link href="https://wa.me/94778574816?text=Hi, I'm interested in planning a trip to Sri Lanka." target="_blank">
              Plan Trip
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-luxvio-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-6 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {["About", "Packages", "Gallery", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lg font-medium text-gray-700 hover:text-luxvio-gold border-b border-gray-50 pb-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Button asChild className="w-full bg-luxvio-gold hover:bg-earth-800 text-white rounded-full py-6 text-lg mt-2">
            <Link href="https://wa.me/94778574816?text=Hi, I'm interested in planning a trip to Sri Lanka." target="_blank">
              Plan Your Trip
            </Link>
          </Button>
        </div>
      )}
    </nav>
  )
}
