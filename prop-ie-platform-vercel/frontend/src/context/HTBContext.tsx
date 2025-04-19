import React, { createContext, useState, useContext } from 'react';

interface HTBContextType {
  claimCode: string | null;
  claimStatus: 'pending' | 'approved' | 'rejected' | null;
  documentUrl: string | null;
  submitClaim: (code: string, documentUrl: string) => Promise<void>;
  checkStatus: () => Promise<void>;
}

const HTBContext = createContext<HTBContextType>({
  claimCode: null,
  claimStatus: null,
  documentUrl: null,
  submitClaim: async () => {},
  checkStatus: async () => {},
});

export const HTBProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [claimCode, setClaimCode] = useState<string | null>(null);
  const [claimStatus, setClaimStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);

  // In a real app, these functions would make API calls to the backend
  const submitClaim = async (code: string, docUrl: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setClaimCode(code);
    setDocumentUrl(docUrl);
    setClaimStatus('pending');
    
    // Store in localStorage for persistence
    localStorage.setItem('htb_claim_code', code);
    localStorage.setItem('htb_document_url', docUrl);
    localStorage.setItem('htb_claim_status', 'pending');
  };

  const checkStatus = async () => {
    // Simulate API call to check status
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would check the actual status from the backend
    // For demo purposes, we'll randomly approve or reject
    const newStatus = Math.random() > 0.3 ? 'approved' : 'rejected';
    setClaimStatus(newStatus as 'approved' | 'rejected');
    
    localStorage.setItem('htb_claim_status', newStatus);
  };

  // Load from localStorage on initial render
  React.useEffect(() => {
    const storedCode = localStorage.getItem('htb_claim_code');
    const storedDocUrl = localStorage.getItem('htb_document_url');
    const storedStatus = localStorage.getItem('htb_claim_status');
    
    if (storedCode) setClaimCode(storedCode);
    if (storedDocUrl) setDocumentUrl(storedDocUrl);
    if (storedStatus) setClaimStatus(storedStatus as 'pending' | 'approved' | 'rejected');
  }, []);

  return (
    <HTBContext.Provider value={{ claimCode, claimStatus, documentUrl, submitClaim, checkStatus }}>
      {children}
    </HTBContext.Provider>
  );
};

export const useHTB = () => useContext(HTBContext);
