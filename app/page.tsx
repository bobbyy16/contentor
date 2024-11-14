import React from "react";
import { ArrowRight, Check, Github, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="logo"
                width={150}
                height={40}
                priority
                className="mt-0"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-600 hover:text-gray-900"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 hover:text-gray-900"
              >
                Testimonials
              </Link>
              <Link
                href="/dashboard"
                className="bg-primary text-white font-medium rounded-lg px-4 py-2 hover:bg-primary/90 transition"
              >
                Get Started
              </Link>
              <Link
                href="https://github.com/bobbyy16/contentor"
                className="text-gray-600 hover:text-gray-900"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-24 sm:pt-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">
              Now with AI-powered writing assistance
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-gray-900 mb-8">
            Transform Your Content <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
              with AI Magic
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Craft perfect content in seconds with our advanced AI writing
            assistant. From blog posts to marketing copy, we&apos;ve got you
            covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/dashboard"
              className="flex items-center justify-center bg-primary text-white font-medium rounded-lg px-8 py-4 hover:bg-primary/90 transition text-lg"
            >
              Start Writing for Free
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link
              href="#demo"
              className="flex items-center justify-center bg-gray-100 text-gray-900 font-medium rounded-lg px-8 py-4 hover:bg-gray-200 transition text-lg"
            >
              Watch Demo
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-8 text-gray-600">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-2" />
              <span>Trial period</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-2" />
              <span>Open source</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to write better content
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you create engaging content faster than
              ever before.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog Content */}
            <div className="border-2 hover:border-primary/50 transition p-6">
              <div className="text-center mb-4">
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/9836/9836554.png"
                  alt="Blog Content Icon"
                  className="h-8 w-8 text-primary mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="text-xl font-bold">Blog Content</h3>
                <p className="text-gray-600">
                  An AI tool that serves as your personal blog post title
                  writer, generating catchy and viral-worthy titles in your
                  chosen language.
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Enter your blog topic</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Enter blog outline here</span>
                </li>
              </ul>
            </div>

            {/* Text Improver */}
            <div className="border-2 hover:border-primary/50 transition p-6">
              <div className="text-center mb-4">
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/17653/17653356.png"
                  alt="Text Improver Icon"
                  className="h-8 w-8 text-primary mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="text-xl font-bold">Text Improver</h3>
                <p className="text-gray-600">
                  This handy tool refines your writing, eliminating errors and
                  redundancies for a clear, readable result.
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Enter text that you want to re-write or improve</span>
                </li>
              </ul>
            </div>

            {/* Add Emojis to Text */}
            <div className="border-2 hover:border-primary/50 transition p-6">
              <div className="text-center mb-4">
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/1023/1023656.png"
                  alt="Add Emojis Icon"
                  className="h-8 w-8 text-primary mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="text-xl font-bold">Add Emojis to Text</h3>
                <p className="text-gray-600">
                  An AI tool that enhances your text with relevant emojis for
                  better engagement.
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Enter your text</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Receive enhanced text with emojis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            See how Contentor has transformed the way people write.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {/* Testimonial 1 */}
            <div className="border rounded-lg p-6 shadow-md">
              <p className="text-gray-600 italic mb-4">
                &quot;Contentor has revolutionized my writing process. I can
                create blog posts in minutes!&quot;
              </p>
              <p className="font-bold">- John Doe</p>
            </div>
            {/* Testimonial 2 */}
            <div className="border rounded-lg p-6 shadow-md">
              <p className="text-gray-600 italic mb-4">
                &quot;The AI assistance is incredible! It has saved me so much
                time.&quot;
              </p>
              <p className="font-bold">- Jane Smith</p>
            </div>
            {/* Testimonial 3 */}
            <div className="border rounded-lg p-6 shadow-md">
              <p className="text-gray-600 italic mb-4">
                &quot;I love the easy interface and the smart suggestions.
                Highly recommend!&quot;
              </p>
              <p className="font-bold">- Mark Wilson</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/logo.svg"
                alt="logo"
                width={150}
                height={40}
                className="mb-4"
              />
              <p className="text-gray-400">
                Transform your writing experience with our advanced AI-powered
                tools.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#features">Features</Link>
                </li>
                <li>
                  <Link href="#testimonials">Testimonials</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/">About (coming soon)</Link>
                </li>
                <li>
                  <Link href="/">Blog (coming soon)</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Link href="https://github.com/bobbyy16/contentor">
                  <Github className="h-6 w-6 text-gray-400 hover:text-white" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Contentor. All rights reserved.
            </p>
            <p className="text-gray-400">
              Contact{" "}
              <Link
                href="https://linktr.ee/bobbyy16"
                className="border-b border-gray-400 hover:text-white"
              >
                @Abhishek
              </Link>{" "}
              for more queries
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
