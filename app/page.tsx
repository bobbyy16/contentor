import React from "react";
import { ArrowRight, Check, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={"/"} className="mt-3">
              <Image
                src="/logo.svg"
                alt="logo"
                width={200}
                height={100}
                priority
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/dashboard"
                className="bg-primary text-white font-medium rounded px-4 py-2 hover:bg-gray-800"
              >
                Get Started
              </Link>
              <Link href={"https://github.com/bobbyy16/contentor"}>
                <Github />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 sm:pt-32 relative text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="bg-primary text-white inline-block px-3 py-1 rounded-full mb-4">
              ✨ Now with AI-powered writing assistance
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Generate AI-Powered Words <br />
              <span className="text-gray-500">with AI Technology</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Transform your writing experience with our advanced AI-powered
              word generation tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/dashboard"
                className="flex items-center justify-center bg-primary text-white font-medium rounded-lg px-6 py-3 hover:bg-gray-800 text-lg"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>

            {/* Billing Section */}
            <div className="mx-5 py-5">
              <div className="mx-auto max-w-5xl px-4 py-8">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                  Pricing
                </h1>

                <div className="flex flex-row justify-center gap-6">
                  {/* Free Plan */}
                  <Card className="w-[400px]">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Free Plan</span>
                        <span className="text-xl font-bold">$0</span>
                      </CardTitle>
                      <CardDescription className="flex justify-start">
                        Perfect for getting started
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-black" />
                          <span>Generate up to 10,000 words</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-black" />
                          <span>Basic support</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-black" />
                          <span>Standard response time</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Premium Plan */}
                  <Card className="w-[400px] border-2 border-black">
                    <CardHeader>
                      <div className="bg-primary text-white px-3 py-1 rounded-full text-sm w-fit mb-2">
                        RECOMMENDED
                      </div>
                      <CardTitle className="flex items-center justify-between">
                        <span>Premium Plan</span>
                        <div className="text-right">
                          <span className="text-xl font-bold">$1.99</span>
                          <span className="text-sm text-gray-500">/month</span>
                        </div>
                      </CardTitle>
                      <CardDescription className="flex justify-start">
                        Unlimited possibilities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-black" />
                          <span>100,000 words per month</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-black" />
                          <span>Priority support</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-black" />
                          <span>Faster response time</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-black" />
                          <span>Advanced features</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center bg-primary text-white font-medium rounded-lg px-6 py-3 hover:bg-gray-800 text-lg"
                  >
                    Get Started
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Contentor. All rights reserved |
              contact -{" "}
              <Link href={"https://linktr.ee/bobbyy16"} className="border-b-2">
                {" "}
                @Abhishek
              </Link>{" "}
              for More queries
            </p>

            <div className="flex space-x-4">
              <Link href={"https://github.com/bobbyy16/contentor"}>
                <Github />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
