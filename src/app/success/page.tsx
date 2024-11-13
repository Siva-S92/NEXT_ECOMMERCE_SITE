import Link from "next/link";
import React from "react";

const SuccessPage = () => {
  return (
    <>
      <div className="w-screen h-screen text-center content-center bg-gray-100">
        <p className=" text-3xl font-semibold text-green-500 mb-10">
          Payment Done Successfully✔
        </p>

        <Link href={"/"} className="mx-auto">
          <button
            className="bg-gray-400 rounded-lg px-6 py-1 font-semibold"
          >
            Go to Home Page
          </button>
        </Link>
      </div>
    </>
  );
};

export default SuccessPage;
