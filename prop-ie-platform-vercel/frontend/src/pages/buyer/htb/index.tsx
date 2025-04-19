import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../context/AuthContext';
import { useHTB } from '../../../context/HTBContext';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Link from 'next/link';

const HTBClaimForm = () => {
  const [claimCode, setClaimCode] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { user } = useAuth();
  const { submitClaim } = useHTB();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!claimCode.trim()) {
      setError('Please enter your Help-to-Buy claim code');
      return;
    }
    
    if (!file) {
      setError('Please upload your Help-to-Buy confirmation document');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // In a real app, we would upload the file to storage and get a URL
      // For demo purposes, we'll create a fake URL
      const fakeDocumentUrl = `https://storage.prop.ie/htb-documents/${user?.id}/${file.name}`;
      
      await submitClaim(claimCode, fakeDocumentUrl);
      setSuccess(true);
      
      // Reset form
      setClaimCode('');
      setFile(null);
    } catch (err) {
      setError('Failed to submit Help-to-Buy claim. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Help-to-Buy Claim - Prop.ie">
      <ProtectedRoute allowedRoles={['buyer']}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Help-to-Buy Claim Submission</h1>
            <p className="text-gray-600">
              Submit your Help-to-Buy claim code and documentation to proceed with your property purchase.
            </p>
          </div>
          
          {success ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Your Help-to-Buy claim has been successfully submitted! We will verify your claim with Revenue and update you on the status.
                  </p>
                  <div className="mt-4">
                    <Link href="/buyer/htb/status">
                      <a className="text-sm font-medium text-green-700 hover:text-green-600">
                        View claim status <span aria-hidden="true">&rarr;</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      The Help-to-Buy (HTB) incentive is a tax refund scheme to help first-time buyers get the deposit needed to buy or build a new home. You must have received your claim code from Revenue before proceeding.
                    </p>
                    <div className="mt-4">
                      <a href="https://www.revenue.ie/en/property/help-to-buy-incentive/index.aspx" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-700 hover:text-blue-600">
                        Learn more about HTB on Revenue.ie <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="claimCode" className="block text-sm font-medium text-gray-700">
                        HTB Claim Code
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="claimCode"
                          value={claimCode}
                          onChange={(e) => setClaimCode(e.target.value)}
                          className="input-field"
                          placeholder="e.g., HTB1234567890"
                          required
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        This is the unique code provided by Revenue after your HTB application was approved.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="htbDocument" className="block text-sm font-medium text-gray-700">
                        HTB Confirmation Document
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="htbDocument"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                            >
                              <span>Upload a file</span>
                              <input
                                id="htbDocument"
                                name="htbDocument"
                                type="file"
                                className="sr-only"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                required
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                      {file && (
                        <p className="mt-2 text-sm text-gray-500">
                          Selected file: {file.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-medium text-gray-700">
                          I confirm that the information provided is accurate
                        </label>
                        <p className="text-gray-500">
                          I authorize Prop.ie to verify my Help-to-Buy status with Revenue.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        disabled={loading}
                      >
                        {loading ? 'Submitting...' : 'Submit HTB Claim'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default HTBClaimForm;
