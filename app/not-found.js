"use client";

import { Home, Pizza } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration - abstract food shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>

      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center relative z-10 border border-gray-100">
        {/* Visual Focus */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative">
            <div className="bg-orange-50 rounded-full p-6 animate-bounce-slow">
              <Pizza size={64} className="text-orange-500" />
            </div>
            {/* 'Missing' indicator */}
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 border-4 border-white">
              <span className="font-bold text-sm">404</span>
            </div>
          </div>
        </div>

        {/* Main Text */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          We can&apos;t find that order.
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          The page you&apos;re looking for seems to have gone out for delivery
          and never came back.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="group w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-200"
          >
            <Home
              size={20}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
            Go Back Home
          </Link>
        </div>

        {/* Footer Help Link */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            Think this is a mistake?{" "}
            <Link
              href="#"
              className="text-orange-600 font-medium hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
