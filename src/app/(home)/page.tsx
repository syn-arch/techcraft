"use client";

import Navbar from "@/components/Navbar";
import { Globe, Check, CircleCheck, MapPin, Phone, Mail } from "lucide-react";
import CountUp from "react-countup";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="p-5 md:p-0 container md:w-7xl mx-auto pt-10 md:pt-15 flex flex-col-reverse lg:flex-row justify-between">
        <div className="mt-0 md:mt-5 p-0">
          <span className="bg-myaccent py-1 px-3 font-semibold rounded-full text-white">
            Mulai Wujudkan Produk Digital Impianmu!
          </span>
          <h1 className="text-5xl font-extrabold mt-5">
            Tech{" "}
            <span className="text-mysecondary px-2 py-1 rounded-lg">Craft</span>
          </h1>
          <p className="text-myprimary text-lg mt-4 w-full lg:w-3/4 text-justify">
            Kami membantu UMKM, perusahaan maupun startup membangun website,
            online shop dan aplikasi mobile yang tampil keren, cepat diakses
            serta SEO-ready.
          </p>

          <a
            href="#contact"
            className="bg-myprimary text-white px-6 py-3 rounded-lg mt-8 inline-block hover:bg-mytertiary transition-colors duration-300"
          >
            Konsultasi Gratis
          </a>
          <a
            href="#portfolio"
            className="ml-2 border border-myprimary text-myprimary px-6 py-3 rounded-lg mt-8 inline-block hover:border-mysecondary hover:bg-mysecondary hover:text-white transition-colors duration-300"
          >
            Lihat Portfolio
          </a>
          <div className="flex mt-20 *:mr-10">
            <div className="flex flex-col">
              <CountUp start={0} end={250} delay={0}>
                {({ countUpRef }) => (
                  <span
                    className="text-5xl text-mysecondary font-bold"
                    ref={countUpRef}
                  ></span>
                )}
              </CountUp>
              <p className="text-myprimary hover:text-mysecondary transition-colors duration-300">
                Project Selesai
              </p>
            </div>
            <div className="flex flex-col border-l border-myprimary pl-4 md:pl-20">
              <CountUp start={0} end={125} delay={0}>
                {({ countUpRef }) => (
                  <span
                    className="text-5xl text-mysecondary font-bold"
                    ref={countUpRef}
                  ></span>
                )}
              </CountUp>
              <p className="text-myprimary hover:text-mysecondary transition-colors duration-300">
                Klien
              </p>
            </div>
            <div className="flex flex-col border-l border-myprimary pl-4 md:pl-20">
              <CountUp start={0} end={99} delay={0}>
                {({ countUpRef }) => (
                  <span
                    className="text-5xl text-mysecondary font-bold"
                    ref={countUpRef}
                  ></span>
                )}
              </CountUp>
              <p className="text-myprimary hover:text-mysecondary transition-colors duration-300">
                Kepuasan Klien
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <img src="/img/rocket.svg" className="w-full an-updown" alt="" />
        </div>
      </section>

      <section className="bg-mygray w-full my-10" id="about">
        <div className="container md:w-7xl mx-auto flex flex-col lg:flex-row justify-between">
          <div className="w-full md:w-1/2 p-20">
            <img src="/img/pc.svg" alt="" className="w-full" />
          </div>
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="font-bold text-xl text-myprimary">
              Masalah yang kami selesaikan
            </h2>
            <p className="mt-3 text-justify text-mytertiary">
              Kami tidak hanya mengerjakan task. Kami memetakan tujuan bisnis,
              menyusun roadmap, dan mengeksekusi dengan standar engineering dan
              design terbaik.
            </p>
            <ul className="*:mt-3 mt-5">
              <li className="flex">
                <CircleCheck color="black" size="24" />
                <span className="ml-2 text-myprimary">
                  Website yang tidak responsif di berbagai perangkat
                </span>
              </li>
              <li className="flex">
                <CircleCheck color="black" size="24" />
                <span className="ml-2 text-myprimary">
                  Website lama, lambat, dan susah diubah.
                </span>
              </li>
              <li className="flex">
                <CircleCheck color="black" size="24" />
                <span className="ml-2 text-myprimary">
                  Desain kurang meyakinkan sehingga konversi rendah.
                </span>
              </li>
              <li className="flex">
                <CircleCheck color="black" size="24" />
                <span className="ml-2 text-myprimary">
                  Aplikasi mobile belum stabil / belum siap scale.
                </span>
              </li>
              <li className="flex">
                <CircleCheck color="black" size="24" />
                <span className="ml-2 text-myprimary">
                  Trafik organik belum optimal (SEO & konten).
                </span>
              </li>
              <li className="flex">
                <CircleCheck color="black" size="24" />
                <span className="ml-2 text-myprimary">
                  Tim internal kewalahan maintenance & security.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full my-10 p-10 md:p-0" id="layanan">
        <div className="container md:w-7xl mx-auto">
          <div className="w-full md:w-1/2">
            <h2 className="font-bold text-xl text-myprimary">
              Layanan Unggulan
            </h2>
            <p className="mt-3 text-justify text-mytertiary">
              Kami tidak hanya mengerjakan task. Kami memetakan tujuan bisnis,
              menyusun roadmap, dan mengeksekusi dengan standar engineering dan
              design terbaik.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
            <div className="bg-mygray rounded-lg border-t-4 border-mysecondary p-10">
              <div className="bg-mysecondary inline-block rounded-full p-3">
                <Globe color="white" size={34} />
              </div>
              <h3 className="font-bold text-primary mt-3">Web Development</h3>
              <p className="text-mytertiary mt-2 text-justify">
                Website modern dengan performa tinggi, SEO-friendly, dan mudah
                dikelola. Cocok untuk company profile, katalog produk, landing
                page campaign, hingga e-commerce.
              </p>
            </div>
            <div className="bg-mygray rounded-lg border-t-4 border-mysecondary p-10">
              <div className="bg-mysecondary inline-block rounded-full p-3">
                <Globe color="white" size={34} />
              </div>
              <h3 className="font-bold text-primary mt-3">Web Development</h3>
              <p className="text-mytertiary mt-2 text-justify">
                Website modern dengan performa tinggi, SEO-friendly, dan mudah
                dikelola. Cocok untuk company profile, katalog produk, landing
                page campaign, hingga e-commerce.
              </p>
            </div>
            <div className="bg-mygray rounded-lg border-t-4 border-mysecondary p-10">
              <div className="bg-mysecondary inline-block rounded-full p-3">
                <Globe color="white" size={34} />
              </div>
              <h3 className="font-bold text-primary mt-3">Web Development</h3>
              <p className="text-mytertiary mt-2 text-justify">
                Website modern dengan performa tinggi, SEO-friendly, dan mudah
                dikelola. Cocok untuk company profile, katalog produk, landing
                page campaign, hingga e-commerce.
              </p>
            </div>
            <div className="bg-mygray rounded-lg border-t-4 border-mysecondary p-10">
              <div className="bg-mysecondary inline-block rounded-full p-3">
                <Globe color="white" size={34} />
              </div>
              <h3 className="font-bold text-primary mt-3">Web Development</h3>
              <p className="text-mytertiary mt-2 text-justify">
                Website modern dengan performa tinggi, SEO-friendly, dan mudah
                dikelola. Cocok untuk company profile, katalog produk, landing
                page campaign, hingga e-commerce.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-mysecondary w-full mb-10 p-10 pb-20 md:px-0 md:mt-20"
        id="portfolio"
      >
        <div className="container md:w-7xl mx-auto">
          <div className="w-full md:w-1/2">
            <h2 className="font-bold text-xl text-white">Portofolio</h2>
            <p className="mt-3 text-justify text-white">
              Lihat bagaimana kami membantu klien di berbagai industri membangun
              website dan aplikasi yang cepat, aman, dan berdampak. Setiap
              proyek kami tampilkan dengan konteks, solusi, dan angka hasilnya.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
            <div className="bg-white rounded-lg p-5">
              <img src="/img/p1.png" alt="" className="w-full rounded-lg" />
              <h3 className="font-bold text-primary mt-5">Web Development</h3>
              <p className="text-mytertiary mt-2 text-justify">
                Website modern dengan performa tinggi, SEO-friendly, dan mudah
                dikelola. Cocok untuk company profile, katalog produk, landing
                page campaign, hingga e-commerce.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5">
              <img src="/img/p1.png" alt="" className="w-full rounded-lg" />
              <h3 className="font-bold text-primary mt-5">Web Development</h3>
              <p className="text-mytertiary mt-2 text-justify">
                Website modern dengan performa tinggi, SEO-friendly, dan mudah
                dikelola. Cocok untuk company profile, katalog produk, landing
                page campaign, hingga e-commerce.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5">
              <img src="/img/p1.png" alt="" className="w-full rounded-lg" />
              <h3 className="font-bold text-primary mt-5">Web Development</h3>
              <p className="text-mytertiary mt-2 text-justify">
                Website modern dengan performa tinggi, SEO-friendly, dan mudah
                dikelola. Cocok untuk company profile, katalog produk, landing
                page campaign, hingga e-commerce.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="w-full my-10 p-10 pb-20 md:px-0 md:mt-10"
        id="pricing"
      >
        <div className="container md:w-7xl mx-auto">
          <div className="w-full md:w-1/2">
            <h2 className="font-bold text-xl text-myprimary">Paket Harga</h2>
            <p className="mt-3 text-justify text-mytertiary">
              Punya ide atau proyek yang ingin diwujudkan? Ceritakan
              kebutuhanmu. Kami akan membantu kamu untuk mencapai tujuanmu
              dengan solusi yang tepat dan harga yang kompetitif.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
            <div className="bg-white rounded-lg border-t-8 border-mysecondary p-9 shadow-lg shadow-gray-200">
              <h3 className="font-bold text-primary text-xl mt-5">Basic</h3>
              <h3 className="font-bold text-primary text-4xl">Rp1.500.000</h3>
              <p className="text-mytertiary text-justify my-5">
                Cocok untuk UMKM/individu yang butuh website informatif
                sederhana.
              </p>
              <ul className="*:mt-3">
                <li className="flex">
                  <Check className="mr-2" size={24} /> Desain responsif 1–3
                  halaman
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> CMS siap pakai (posting &
                  edit konten)
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> Form kontak + integrasi
                  WhatsApp
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> Basic SEO (meta, sitemap,
                  indexing)
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> Setup Google Analytics
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> 1x revisi desain, 7 hari
                  support pasca-live
                </li>
              </ul>
              <a
                href=""
                className="w-full bg-myprimary text-white hover:bg-mytertiary py-3 mt-5 rounded-full block text-center"
              >
                Pilih Paket
              </a>
            </div>
            <div className="bg-white rounded-lg border-t-8 border-mysecondary p-9 shadow-lg shadow-gray-200">
              <div className="flex justify-center">
                <span className="bg-mysecondary text-white rounded-full py-2 px-5 font-bold">
                  TERPOPULER
                </span>
              </div>
              <h3 className="font-bold text-primary text-xl mt-5">Standard</h3>
              <h3 className="font-bold text-primary text-4xl">Rp2.500.000</h3>
              <p className="text-mytertiary text-justify my-5">
                Cocok untuk UMKM/individu yang butuh website informatif
                sederhana.
              </p>
              <ul className="*:mt-3">
                <li className="flex">
                  <Check className="mr-2" size={24} /> Desain responsif 1–3
                  halaman
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> CMS siap pakai (posting &
                  edit konten)
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> Form kontak + integrasi
                  WhatsApp
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> Basic SEO (meta, sitemap,
                  indexing)
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> Setup Google Analytics
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> 1x revisi desain, 7 hari
                  support pasca-live
                </li>
              </ul>
              <a
                href=""
                className="w-full bg-myprimary text-white hover:bg-mytertiary py-3 mt-5 rounded-full block text-center"
              >
                Pilih Paket
              </a>
            </div>
            <div className="bg-white rounded-lg border-t-8 border-mysecondary p-9 shadow-lg shadow-gray-200">
              <h3 className="font-bold text-primary text-xl mt-5">Premium</h3>
              <h3 className="font-bold text-primary text-4xl">Rp5.500.000</h3>
              <p className="text-mytertiary text-justify my-5">
                Cocok untuk UMKM/individu yang butuh website informatif
                sederhana.
              </p>
              <ul className="*:mt-3">
                <li className="flex">
                  <Check className="mr-2" size={24} /> Desain responsif 1–3
                  halaman
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> CMS siap pakai (posting &
                  edit konten)
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> Form kontak + integrasi
                  WhatsApp
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> Basic SEO (meta, sitemap,
                  indexing)
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> Setup Google Analytics
                </li>
                <li className="flex">
                  <Check className="mr-2" size={24} /> 1x revisi desain, 7 hari
                  support pasca-live
                </li>
              </ul>
              <a
                href=""
                className="w-full bg-myprimary text-white hover:bg-mytertiary py-3 mt-5 rounded-full block text-center"
              >
                Pilih Paket
              </a>
            </div>
          </div>
          <p className="mt-10">
            Punya kebutuhan lain? silahkan konsultasikan project kamu sekarang,
            klik disini.
          </p>
        </div>
      </section>

      <section
        className="bg-gradient-to-r relative from-slate-100 via-white to-slate-50 mt-10"
        id="about"
      >
        <div className="absolute top-10 left-10 w-64 h-64 bg-sky-200 rounded-full blur-3xl"></div>
        <div className="container md:w-7xl mx-auto flex flex-col lg:flex-row justify-between">
          <div className="w-full md:w-1/2 p-20">
            <div className="ml-0 md:ml-10 grid grid-cols-3 gap-10">
              <div className=" border border-gray-300 p-5 rounded-xl hover:scale-[1.02] hover:shadow-md transition">
                <img
                  src="/img/laravel.png"
                  alt=""
                  className="grayscale-100 hover:grayscale-0"
                />
              </div>
              <div className=" border border-gray-300 p-5 rounded-xl hover:scale-[1.02] hover:shadow-md transition">
                <img
                  src="/img/mysql.png"
                  alt=""
                  className="grayscale-100 hover:grayscale-0"
                />
              </div>
              <div className=" border border-gray-300 p-5 rounded-xl hover:scale-[1.02] hover:shadow-md transition">
                <img
                  src="/img/next.png"
                  alt=""
                  className="grayscale-100 hover:grayscale-0"
                />
              </div>
            </div>
            <div className="mt-5 mr-0 md:mr-10  grid grid-cols-3 gap-10">
              <div className=" border border-gray-300 p-5 rounded-xl hover:scale-[1.02] hover:shadow-md transition">
                <img
                  src="/img/tailwind.png"
                  alt=""
                  className="grayscale-100 hover:grayscale-0"
                />
              </div>
              <div className=" border border-gray-300 p-5 rounded-xl hover:scale-[1.02] hover:shadow-md transition">
                <img
                  src="/img/react.png"
                  alt=""
                  className="grayscale-100 hover:grayscale-0"
                />
              </div>
              <div className=" border border-gray-300 p-5 rounded-xl hover:scale-[1.02] hover:shadow-md transition">
                <img
                  src="/img/node.png"
                  alt=""
                  className="grayscale-100 hover:grayscale-0"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <span className="text-myaccent font-bold">
              Pondasi cepat, aman dan mudah di skalakan
            </span>
            <h2 className="font-bold text-4xl text-myprimary">
              Teknologi & Stack Andal
            </h2>
            <p className="mt-3 text-justify text-mytertiary">
              Kami membangun dengan stack modern seperti Next.js/Laravel,
              Tailwind, dan React Native, dipadukan dengan PostgreSQL/MySQL,
              Redis, dan Docker. Arsitektur ini memastikan loading cepat,
              keamanan terjaga, serta mudah dikembangkan saat traffic dan fitur
              bertambah.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full mt-10" id="kontak">
        <div className="container md:w-7xl mx-auto flex flex-col lg:flex-row justify-between">
          <div className="w-full md:w-1/2 p-10">
            <h2 className="font-bold text-xl text-myprimary">Hubungi Kami</h2>
            <p className="mt-3 text-justify text-mytertiary">
              Punya ide atau proyek yang ingin diwujudkan? Ceritakan
              kebutuhanmu.
            </p>
            <div className="mt-10 bg-white rounded-lg p-7 shadow-lg">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-myprimary mb-2" htmlFor="name">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border-b-2 border-myprimary bg-gray-100 rounded focus:outline-none"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-myprimary mb-2" htmlFor="name">
                    No Whatsapp
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border-b-2 border-myprimary bg-gray-100 rounded focus:outline-none"
                    placeholder="Masukkan No Whatsapp"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-myprimary mb-2" htmlFor="name">
                    Pesan
                  </label>
                  <textarea
                    rows={7}
                    id="name"
                    className="w-full p-2 border-b-2 border-myprimary bg-gray-100 rounded focus:outline-none"
                    placeholder="Masukkan pesan"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-myprimary hover:cursor-pointer text-white hover:bg-mytertiary py-3 rounded-full"
                  >
                    Kirim Pesan
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-10 md:p-20">
            <img
              src="/img/message.svg"
              alt=""
              className="w-full md:w-3/4 mx-auto"
            />
            <div className="flex justify-center items-center mt-5">
              <div className="flex flex-col items-center">
                <MapPin className="text-myprimary" size={24} />
                <span className="text-myprimary mt-2">
                  Jl. Contoh No.123, Jakarta
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center mt-5">
              <div className="flex flex-col items-center mr-10">
                <Mail className="text-myprimary" size={24} />
                <span className="text-myprimary mt-2">6JdH2@example.com</span>
              </div>
              <div className="flex flex-col items-center mr-10">
                <Phone className="text-myprimary" size={24} />
                <span className="text-myprimary mt-2">+62 812-3456-7890</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-myprimary text-white py-10 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="container md:w-7xl mx-auto grid grid-cols-1 md:grid-cols-3  bg-red-500">
          <div className="px-5">
            <h3 className="font-bold text-lg mb-5">Tech Craft</h3>
            <p className="text-white">
              Kami adalah tim profesional yang siap membantu Anda mewujudkan
              produk digital impian Anda. Dengan pengalaman dan keahlian di
              bidang web development, mobile app development, dan digital
              marketing, kami siap memberikan solusi terbaik untuk kebutuhan
              bisnis Anda.
            </p>
          </div>
          <div className="px-5 mt-5 md:mt-0">
            <h3 className="font-bold text-lg mb-5">Kontak Kami</h3>
            <ul className="text-white">
              <li className="mb-3">
                <MapPin className="inline mr-2" size={16} />
                Jl. Contoh No.123, Jakarta
              </li>
              <li className="mb-3">
                <Mail className="inline mr-2" size={16} />
                <a href="mailto:6JdH2@example.com">6JdH2@example.com</a>
              </li>
              <li className="mb-3">
                <Phone className="inline mr-2" size={16} />
                +62 812-3456-7890
              </li>
            </ul>
          </div>
          <div className="px-5 mt-5 md:mt-0">
            <h3 className="font-bold text-lg mb-5">Tautan</h3>
            <ul className="text-white">
              <li className="mb-3">
                <a href="/">Home</a>
              </li>
              <li className="mb-3">
                <a href="#about">About</a>
              </li>
              <li className="mb-3">
                <a href="#kontak">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
