'use client'
import Banner from "@/components/frontend/Banner";
import Cart from "@/components/frontend/Cart";
import FeatureSection from "@/components/frontend/FeatureSection";
import Hero from "@/components/frontend/Hero";
import Navbar from "@/components/frontend/Navbar";
import TrendingProduct from "@/components/frontend/TrendingProduct";
import Footer from "@/components/frontend/Footer";
import React, { useState } from "react";

export default function Home() {
  const [showCart, setShowCart] = useState(false)


  return (
    <main>
      <Navbar setShowCart={setShowCart}/>
      { showCart && <Cart setShowCart={setShowCart}/>}
      <Hero />
      <FeatureSection/>
      <TrendingProduct/>
      <Banner/>
      <Footer/>
    </main>
  );
}
