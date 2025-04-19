import React from 'react';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../context/AuthContext';
import { useHTB } from '../../../context/HTBContext';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Link from 'next/link';

const HTBStatus = () => {
  const { user } = useAuth();
  const { claimCode, claimStatus, documentUrl, checkStatus } = useHTB();
  const [loading, setLoading] = React.useState(false);
  
  const handleCheckStatus = async () => {
    setLoading(true);
    try {
      await checkStatus();
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout title="Help-to-Buy Status - Prop.ie">
      <ProtectedRoute allowedRoles={['buyer']}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Help-to-Buy Claim Status</h1>
            <p className="text-gray-600">
              Track the status of your Help-to-Buy claim and verification process.
            </p>
          </div>
          
          {!claimCode ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="text-center">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No HTB claim found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven't submitted a Help-to-Buy claim yet.
                  </p>
                  <div className="mt-6">
                    <Link href="/buyer/htb">
                      <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Submit HTB Claim
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="border-b border-gray-200 pb-5 mb-5">
                  <h3 className="text-lg font-medium text-gray-900">Claim Information</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm font-medium text-gray-500">Claim Code</p>
                      <p className="mt-1 text-sm text-gray-900">{claimCode}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Submission Date</p>
                      <p className="mt-1 text-sm text-gray-900">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <div className="mt-1">
                      {claimStatus === 'pending' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending Verification
                        </span>
                      )}
                      {claimStatus === 'approved' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Approved
                        </span>
                      )}
                      {claimStatus === 'rejected' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Submitted Document</p>
                    <div className="mt-1">
                      <a 
                        href={documentUrl || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-500"
                      >
                        View Document
                      </a>
                    </div>
                  </div>
                  
                  {claimStatus === 'pending' && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            Your claim is being verified with Revenue. This process typically takes 3-5 business days.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {claimStatus === 'approved' && (
                    <div className="bg-green-50 border-l-4 border-green-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700">
                            Your Help-to-Buy claim has been approved! You can now proceed with your property purchase.
                          </p>
                          <div className="mt-4">
                            <Link href="/properties">
                              <a className="text-sm font-medium text-green-700 hover:text-green-600">
                                Browse Properties <span aria-hidden="true">&rarr;</span>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {claimStatus === 'rejected' && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">
                            Your Help-to-Buy claim has been rejected. This could be due to incorrect information or documentation.
                          </p>
                          <div className="mt-4">
                            <Link href="/buyer/htb">
                              <a className="text-sm font-medium text-red-700 hover:text-red-600">
                                Submit New Claim <span aria-hidden="true">&rarr;</span>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {claimStatus === 'pending' && (
                    <div className="mt-6">
                      <button
                        onClick={handleCheckStatus}
                        disabled={loading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        {loading ? 'Checking...' : 'Check Status Update'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default HTBStatus;
