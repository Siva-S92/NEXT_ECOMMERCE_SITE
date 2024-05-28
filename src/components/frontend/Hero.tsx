import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <div className="container max-w-7xl mt-4 text-white text-end">
        <Link href={"/admin/dashboard"} className="px-4 py-2 rounded-lg bg-gray-600">Dashboard</Link>
      </div>
      <div className="bg-[#E3EDF6] mt-4 ">
        <div className="container max-w-7xl grid md:grid-cols-2 py-8">
          <div className="flex items-center">
            <div className="max-w-[450px] space-y-4 ">
              <p className="text-topHeadingPrimary ">
                starting at <span className="font-bold">$999.00</span>
              </p>
              <h1 className="text-topHeadingPrimary font-bold text-4xl md:text-5xl">
                The Best Macbook Pro collections at 2024 - 2025
              </h1>
              <h3 className="text-2xl font-['Oregano',cursive]">
                Exclussive Offer <span className="text-red-600">-10%</span> off
                this week
              </h3>
              <a
                className="inline-block bg-white rounded-md px-6 py-3 hover:bg-accent hover:text-white"
                href="#"
              >
                Shop Now
              </a>
            </div>
          </div>

          <div>
            <img className="ml-auto " src="/hero.jpg" alt="hero" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
