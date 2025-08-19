"use client";

import React, { useState } from "react";
import {
  Check,
  Code,
  Smartphone,
  Globe,
  TrendingUp,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function TechCraftLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description:
        "Kami membangun website yang responsif, cepat, dan user-friendly dengan teknologi terkini untuk memenuhi kebutuhan bisnis Anda.",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App Development",
      description:
        "Mengembangkan aplikasi mobile native dan cross-platform yang inovatif untuk iOS dan Android dengan performa optimal.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "E-commerce",
      description:
        "Solusi e-commerce lengkap dengan sistem pembayaran terintegrasi, manajemen inventori, dan dashboard analytics.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Digital Marketing",
      description:
        "Strategi pemasaran digital yang komprehensif untuk meningkatkan visibility brand dan konversi penjualan online.",
    },
  ];

  const portfolioItems = [
    {
      title: "Website Perusahaan",
      category: "Web Development",
      description:
        "Website corporate modern dengan CMS terintegrasi dan SEO optimization untuk meningkatkan online presence.",
      image: "bg-gradient-to-br from-purple-600 to-pink-600",
    },
    {
      title: "Website Perusahaan",
      category: "Web Development",
      description:
        "Platform e-learning interaktif dengan sistem video streaming, quiz online, dan tracking progress siswa.",
      image: "bg-gradient-to-br from-gray-700 to-gray-900",
    },
    {
      title: "Website Perusahaan",
      category: "Mobile Development",
      description:
        "Aplikasi mobile marketplace dengan fitur real-time chat, payment gateway, dan sistem rating review.",
      image: "bg-gradient-to-br from-teal-600 to-blue-600",
    },
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Rp1.500.000",
      features: [
        "Website responsif 5 halaman",
        "Design modern & profesional",
        "SEO basic optimization",
        "Free domain & hosting 1 tahun",
        "Support via WhatsApp",
        "Maintenance 3 bulan",
      ],
    },
    {
      name: "Standard",
      price: "Rp2.500.000",
      features: [
        "Website responsif 10 halaman",
        "CMS untuk update konten",
        "SEO advanced optimization",
        "Free domain & hosting 1 tahun",
        "Google Analytics integration",
        "Support prioritas",
        "Maintenance 6 bulan",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "Rp5.500.000",
      features: [
        "Website unlimited halaman",
        "E-commerce integration",
        "Custom functionality",
        "Free domain & hosting 1 tahun",
        "Advanced analytics & reporting",
        "24/7 priority support",
        "Maintenance 12 bulan",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded"></div>
              <span className="text-xl font-bold">Tech Craft</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-primary transition-colors">
                Home
              </a>
              <a
                href="#about"
                className="hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#service"
                className="hover:text-primary transition-colors"
              >
                Service
              </a>
              <a
                href="#portfolio"
                className="hover:text-primary transition-colors"
              >
                Portfolio
              </a>
              <a
                href="#contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </a>
            </nav>

            <div className="hidden md:block">
              <button className="bg-primary text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-cyan-300 transition-colors">
                Get Started
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#home"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </a>
                <a
                  href="#service"
                  className="hover:text-primary transition-colors"
                >
                  Service
                </a>
                <a
                  href="#portfolio"
                  className="hover:text-primary transition-colors"
                >
                  Portfolio
                </a>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </a>
                <button className="bg-primary text-gray-900 px-6 py-2 rounded-full font-semibold w-fit">
                  Get Started
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
              <p className="text-pink-500 font-medium mb-4">
                Kembangkan bisnis Anda secara digital
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Tech <span className="text-primary">Craft</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Kami menyediakan solusi IT terdepan untuk mengembangkan bisnis
                Anda ke era digital dengan teknologi modern dan tim profesional
                yang berpengalaman.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Konsultasi Gratis
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Lihat Portfolio →
                </button>
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900">15 +</div>
                  <div className="text-gray-600">Project Selesai</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">10 +</div>
                  <div className="text-gray-600">Tim Ahli</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">99%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-white flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-900 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        Dev
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-pink-500 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="lg:w-1/2">
              <div className="bg-gray-900 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-700 rounded w-full"></div>
                      <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                      <div className="h-2 bg-primary rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 grid grid-cols-3 gap-2">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="h-8 bg-gray-700 rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="h-4 bg-primary rounded w-1/3 mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-700 rounded w-full"></div>
                    <div className="h-2 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Masalah yang kami selesaikan
              </h2>
              <p className="text-gray-600 mb-8">
                Kami hadir untuk menyelesaikan tantangan digital yang dihadapi
                bisnis modern dengan solusi teknologi terdepan.
              </p>

              <div className="space-y-6">
                {[
                  "Website yang lambat dan tidak user friendly",
                  "Tidak memiliki kehadiran digital yang kuat",
                  "Sistem manual yang tidak efisien",
                  "Kurang optimal dalam digital marketing",
                  "Tim internal kurang expertise di bidang IT",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-gray-900" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="service" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Layanan Unggulan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan berbagai layanan teknologi informasi yang dapat
              membantu mengembangkan bisnis Anda secara digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-gray-900 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Portfolio</h2>
            <p className="text-gray-800 max-w-2xl mx-auto">
              Lihat beberapa karya terbaik kami yang telah membantu klien
              mencapai tujuan bisnis mereka melalui solusi digital.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className={`h-48 ${item.image}`}></div>
                <div className="p-6">
                  <div className="text-cyan-600 text-sm font-medium mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing</h2>
            <p className="text-gray-600">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 ${
                  plan.popular
                    ? "ring-2 ring-primary transform scale-105"
                    : "border"
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-gray-900 text-sm font-bold px-4 py-2 rounded-full text-center mb-6">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-6">
                  {plan.price}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-primary text-gray-900 hover:bg-cyan-300"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  Pilih Paket
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Teknologi & Stack Andal
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami menggunakan teknologi terdepan dan tools modern untuk
              memastikan website dan aplikasi yang kami kembangkan memiliki
              performa optimal dan dapat diandalkan.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["React", "Node.js", "Python", "MongoDB", "AWS", "Docker"].map(
              (tech) => (
                <div
                  key={tech}
                  className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                >
                  <span className="text-gray-600 font-bold text-sm">
                    {tech}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hubungi Kami
            </h2>
            <p className="text-gray-600">
              Mari diskusikan project impian Anda bersama tim ahli kami
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="w-full h-64 bg-gray-300 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-gray-500">
                    Contact Form Placeholder
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="space-y-8">
                <div>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-gray-900" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Alamat
                  </h4>
                  <p className="text-gray-600">
                    Jl. Tech Street No. 123, Jakarta Selatan
                  </p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-gray-900" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Telepon
                  </h4>
                  <p className="text-gray-600">+62 812-3456-7890</p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-gray-900" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Email
                  </h4>
                  <p className="text-gray-600">info@techcraft.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded"></div>
                <span className="text-xl font-bold">Tech Craft</span>
              </div>
              <p className="text-gray-400 mb-6">
                Solusi teknologi terdepan untuk mengembangkan bisnis Anda ke era
                digital.
              </p>
              <div className="flex items-center gap-4 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 mt-2">
                <Phone className="w-5 h-5" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 mt-2">
                <Mail className="w-5 h-5" />
                <span>info@techcraft.com</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Our Service</h4>
              <ul className="space-y-3 text-gray-400">
                <li>Web Development</li>
                <li>Mobile App</li>
                <li>E-commerce</li>
                <li>Digital Marketing</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Our Service</h4>
              <ul className="space-y-3 text-gray-400">
                <li>UI/UX Design</li>
                <li>Maintenance</li>
                <li>Consultation</li>
                <li>SEO Optimization</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Follow Us</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>Copyright 2024 • Made by Tech Craft (all rights reserved)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
