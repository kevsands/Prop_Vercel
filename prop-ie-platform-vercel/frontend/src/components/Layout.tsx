import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Prop.ie - First-Time Buyer Platform' 
}) => {
  const { user, logout } = useAuth();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Prop.ie helps first-time buyers find, customize, and purchase their perfect home with Help-to-Buy support." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-primary-600">Prop.ie</a>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="/">
                <a className="text-gray-800 hover:text-primary-600">Home</a>
              </Link>
              <Link href="/properties">
                <a className="text-gray-800 hover:text-primary-600">Properties</a>
              </Link>
              {user && (
                <>
                  {user.role === 'buyer' && (
                    <>
                      <Link href="/buyer/htb">
                        <a className="text-gray-800 hover:text-primary-600">Help-to-Buy</a>
                      </Link>
                      <Link href="/buyer/customization">
                        <a className="text-gray-800 hover:text-primary-600">Customization</a>
                      </Link>
                    </>
                  )}
                  {user.role === 'developer' && (
                    <>
                      <Link href="/developer/properties">
                        <a className="text-gray-800 hover:text-primary-600">My Properties</a>
                      </Link>
                      <Link href="/developer/contractors">
                        <a className="text-gray-800 hover:text-primary-600">Contractors</a>
                      </Link>
                    </>
                  )}
                  {(user.role === 'buyerSolicitor' || user.role === 'sellerSolicitor') && (
                    <>
                      <Link href="/solicitor/documents">
                        <a className="text-gray-800 hover:text-primary-600">Documents</a>
                      </Link>
                      <Link href="/solicitor/transactions">
                        <a className="text-gray-800 hover:text-primary-600">Transactions</a>
                      </Link>
                    </>
                  )}
                  {user.role === 'admin' && (
                    <Link href="/admin">
                      <a className="text-gray-800 hover:text-primary-600">Admin</a>
                    </Link>
                  )}
                </>
              )}
            </nav>
            
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Hello, {user.name}</span>
                  <button 
                    onClick={logout}
                    className="px-4 py-2 text-primary-600 hover:text-primary-800"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <a className="px-4 py-2 text-primary-600 hover:text-primary-800">Login</a>
                  </Link>
                  <Link href="/register">
                    <a className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Register</a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
        
        <main className="flex-grow bg-gray-50">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Prop.ie</h3>
                <p className="text-gray-400">Helping first-time buyers find their dream home in Ireland.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/">
                      <a className="text-gray-400 hover:text-white">Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/properties">
                      <a className="text-gray-400 hover:text-white">Properties</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/buyer/htb">
                      <a className="text-gray-400 hover:text-white">Help-to-Buy</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/buyer/customization">
                      <a className="text-gray-400 hover:text-white">Customization</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/buyers-guide">
                      <a className="text-gray-400 hover:text-white">Buyer's Guide</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/mortgage-calculator">
                      <a className="text-gray-400 hover:text-white">Mortgage Calculator</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq">
                      <a className="text-gray-400 hover:text-white">FAQ</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <a className="text-gray-400 hover:text-white">Contact Us</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <p className="text-gray-400 mb-2">123 Main Street</p>
                <p className="text-gray-400 mb-2">Dublin, Ireland</p>
                <p className="text-gray-400 mb-2">info@prop.ie</p>
                <p className="text-gray-400">+353 1 234 5678</p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Prop.ie. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
