import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="Prop.ie - Find Your Dream Home">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Dream Home in Ireland</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Prop.ie helps first-time buyers find, customize, and purchase their perfect home with Help-to-Buy support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/properties">
              <a className="bg-white text-primary-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Browse Properties
              </a>
            </Link>
            <Link href="/buyer/htb">
              <a className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Help-to-Buy Guide
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Prop.ie?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">First-Time Buyer Focused</h3>
              <p className="text-gray-600">
                Specialized tools and guidance for first-time buyers, including Help-to-Buy scheme integration and mortgage assistance.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Customize Your Home</h3>
              <p className="text-gray-600">
                Personalize your new home with our interactive customization tools for flooring, fixtures, paint colors, and more.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Transactions</h3>
              <p className="text-gray-600">
                Complete legal documentation, secure reservations, and manage the entire purchase process in one platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Property Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  [Property Image]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Maple Heights</h3>
                <p className="text-gray-600 mb-4">Dublin, Ireland</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-bold">€320,000</span>
                  <Link href="/properties/maple-heights">
                    <a className="text-primary-600 hover:text-primary-800">View Details</a>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Property Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  [Property Image]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Oakwood Residences</h3>
                <p className="text-gray-600 mb-4">Cork, Ireland</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-bold">€285,000</span>
                  <Link href="/properties/oakwood-residences">
                    <a className="text-primary-600 hover:text-primary-800">View Details</a>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Property Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  [Property Image]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Riverside Gardens</h3>
                <p className="text-gray-600 mb-4">Galway, Ireland</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-bold">€295,000</span>
                  <Link href="/properties/riverside-gardens">
                    <a className="text-primary-600 hover:text-primary-800">View Details</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/properties">
              <a className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700 transition-colors">
                View All Properties
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Help-to-Buy Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold mb-6">Help-to-Buy Made Easy</h2>
              <p className="text-gray-700 mb-6">
                The Help-to-Buy (HTB) incentive is a tax refund scheme to help first-time buyers get the deposit needed to buy or build a new home. Our platform simplifies the process with:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Easy HTB claim code submission</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Automatic verification with Revenue</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real-time status tracking</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Integration with property purchase process</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/buyer/htb">
                  <a className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700 transition-colors">
                    Learn More About HTB
                  </a>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">HTB Calculator</h3>
                <p className="text-gray-600 mb-6">
                  Estimate how much you could receive through the Help-to-Buy scheme.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Property Price (€)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., 300000"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">First-time buyer?</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">New build?</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <button className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                    Calculate HTB Amount
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah O'Connor</h4>
                  <p className="text-gray-600 text-sm">Dublin</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Prop.ie made buying my first home so much easier. The Help-to-Buy integration saved me hours of paperwork, and I love the customizations I was able to make to my new apartment!"
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael Byrne</h4>
                  <p className="text-gray-600 text-sm">Cork</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As a first-time buyer, I was overwhelmed by the process until I found Prop.ie. Their platform guided me through every step, and the 3D visualization tools helped me see exactly what my home would look like."
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Emma and John Kelly</h4>
                  <p className="text-gray-600 text-sm">Galway</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The document management system made the legal process so much smoother. Our solicitor was able to access everything instantly, and we could track progress in real-time. Highly recommend!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied first-time buyers who found their perfect home with Prop.ie.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <a className="bg-white text-primary-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Create an Account
              </a>
            </Link>
            <Link href="/properties">
              <a className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Browse Properties
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
