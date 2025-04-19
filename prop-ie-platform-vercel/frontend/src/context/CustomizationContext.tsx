import React, { createContext, useState, useContext } from 'react';

interface PropertyCustomizationOption {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  room: string;
}

interface CustomizationContextType {
  selectedOptions: Record<string, PropertyCustomizationOption>;
  totalCost: number;
  addOption: (option: PropertyCustomizationOption) => void;
  removeOption: (optionId: string) => void;
  clearOptions: () => void;
}

const CustomizationContext = createContext<CustomizationContextType>({
  selectedOptions: {},
  totalCost: 0,
  addOption: () => {},
  removeOption: () => {},
  clearOptions: () => {},
});

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, PropertyCustomizationOption>>({});
  const [totalCost, setTotalCost] = useState(0);

  // Add a customization option
  const addOption = (option: PropertyCustomizationOption) => {
    setSelectedOptions(prev => {
      // If there's already an option in the same category and room, replace it
      const newOptions = { ...prev };
      
      // Create a unique key for the category+room combination
      const key = `${option.room}-${option.category}`;
      
      // If we're replacing an option, subtract its price from the total
      if (newOptions[key]) {
        setTotalCost(current => current - newOptions[key].price + option.price);
      } else {
        setTotalCost(current => current + option.price);
      }
      
      newOptions[key] = option;
      
      // Store in localStorage for persistence
      localStorage.setItem('customization_options', JSON.stringify(newOptions));
      localStorage.setItem('customization_total_cost', String(totalCost));
      
      return newOptions;
    });
  };

  // Remove a customization option
  const removeOption = (optionId: string) => {
    setSelectedOptions(prev => {
      const newOptions = { ...prev };
      
      if (newOptions[optionId]) {
        setTotalCost(current => current - newOptions[optionId].price);
        delete newOptions[optionId];
        
        // Update localStorage
        localStorage.setItem('customization_options', JSON.stringify(newOptions));
        localStorage.setItem('customization_total_cost', String(totalCost));
      }
      
      return newOptions;
    });
  };

  // Clear all options
  const clearOptions = () => {
    setSelectedOptions({});
    setTotalCost(0);
    
    // Clear localStorage
    localStorage.removeItem('customization_options');
    localStorage.removeItem('customization_total_cost');
  };

  // Load from localStorage on initial render
  React.useEffect(() => {
    const storedOptions = localStorage.getItem('customization_options');
    const storedTotalCost = localStorage.getItem('customization_total_cost');
    
    if (storedOptions) {
      setSelectedOptions(JSON.parse(storedOptions));
    }
    
    if (storedTotalCost) {
      setTotalCost(Number(storedTotalCost));
    }
  }, []);

  return (
    <CustomizationContext.Provider value={{ selectedOptions, totalCost, addOption, removeOption, clearOptions }}>
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => useContext(CustomizationContext);
