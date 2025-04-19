import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../context/AuthContext';
import { useCustomization } from '../../../context/CustomizationContext';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Link from 'next/link';

// Mock data for customization options
const customizationOptions = {
  livingRoom: {
    flooring: [
      {
        id: 'lr-floor-1',
        name: 'Oak Hardwood',
        description: 'Premium oak hardwood flooring',
        price: 3500,
        imageUrl: '/images/customization/flooring/oak-hardwood.jpg',
        category: 'flooring',
        room: 'livingRoom'
      },
      {
        id: 'lr-floor-2',
        name: 'Engineered Wood',
        description: 'Durable engineered wood flooring',
        price: 2200,
        imageUrl: '/images/customization/flooring/engineered-wood.jpg',
        category: 'flooring',
        room: 'livingRoom'
      },
      {
        id: 'lr-floor-3',
        name: 'Luxury Vinyl',
        description: 'Waterproof luxury vinyl flooring',
        price: 1800,
        imageUrl: '/images/customization/flooring/luxury-vinyl.jpg',
        category: 'flooring',
        room: 'livingRoom'
      }
    ],
    paint: [
      {
        id: 'lr-paint-1',
        name: 'Soft White',
        description: 'Clean, bright white paint',
        price: 450,
        imageUrl: '/images/customization/paint/soft-white.jpg',
        category: 'paint',
        room: 'livingRoom'
      },
      {
        id: 'lr-paint-2',
        name: 'Warm Beige',
        description: 'Neutral beige tone',
        price: 450,
        imageUrl: '/images/customization/paint/warm-beige.jpg',
        category: 'paint',
        room: 'livingRoom'
      },
      {
        id: 'lr-paint-3',
        name: 'Sage Green',
        description: 'Calming sage green color',
        price: 550,
        imageUrl: '/images/customization/paint/sage-green.jpg',
        category: 'paint',
        room: 'livingRoom'
      }
    ],
    lighting: [
      {
        id: 'lr-light-1',
        name: 'Recessed Lighting',
        description: 'Modern recessed ceiling lights',
        price: 1200,
        imageUrl: '/images/customization/lighting/recessed.jpg',
        category: 'lighting',
        room: 'livingRoom'
      },
      {
        id: 'lr-light-2',
        name: 'Pendant Fixtures',
        description: 'Stylish pendant light fixtures',
        price: 1800,
        imageUrl: '/images/customization/lighting/pendant.jpg',
        category: 'lighting',
        room: 'livingRoom'
      },
      {
        id: 'lr-light-3',
        name: 'Track Lighting',
        description: 'Adjustable track lighting system',
        price: 1500,
        imageUrl: '/images/customization/lighting/track.jpg',
        category: 'lighting',
        room: 'livingRoom'
      }
    ]
  },
  kitchen: {
    cabinetry: [
      {
        id: 'k-cab-1',
        name: 'White Shaker',
        description: 'Classic white shaker cabinets',
        price: 8500,
        imageUrl: '/images/customization/cabinetry/white-shaker.jpg',
        category: 'cabinetry',
        room: 'kitchen'
      },
      {
        id: 'k-cab-2',
        name: 'Dark Wood',
        description: 'Rich dark wood cabinets',
        price: 9200,
        imageUrl: '/images/customization/cabinetry/dark-wood.jpg',
        category: 'cabinetry',
        room: 'kitchen'
      },
      {
        id: 'k-cab-3',
        name: 'Modern Gray',
        description: 'Contemporary gray cabinets',
        price: 8800,
        imageUrl: '/images/customization/cabinetry/modern-gray.jpg',
        category: 'cabinetry',
        room: 'kitchen'
      }
    ],
    countertops: [
      {
        id: 'k-count-1',
        name: 'Granite',
        description: 'Natural granite countertops',
        price: 4500,
        imageUrl: '/images/customization/countertops/granite.jpg',
        category: 'countertops',
        room: 'kitchen'
      },
      {
        id: 'k-count-2',
        name: 'Quartz',
        description: 'Engineered quartz countertops',
        price: 5200,
        imageUrl: '/images/customization/countertops/quartz.jpg',
        category: 'countertops',
        room: 'kitchen'
      },
      {
        id: 'k-count-3',
        name: 'Marble',
        description: 'Luxury marble countertops',
        price: 6800,
        imageUrl: '/images/customization/countertops/marble.jpg',
        category: 'countertops',
        room: 'kitchen'
      }
    ],
    appliances: [
      {
        id: 'k-app-1',
        name: 'Standard Package',
        description: 'Basic stainless steel appliance package',
        price: 5500,
        imageUrl: '/images/customization/appliances/standard.jpg',
        category: 'appliances',
        room: 'kitchen'
      },
      {
        id: 'k-app-2',
        name: 'Premium Package',
        description: 'High-end stainless steel appliance package',
        price: 8500,
        imageUrl: '/images/customization/appliances/premium.jpg',
        category: 'appliances',
        room: 'kitchen'
      },
      {
        id: 'k-app-3',
        name: 'Luxury Package',
        description: 'Professional-grade appliance package',
        price: 12500,
        imageUrl: '/images/customization/appliances/luxury.jpg',
        category: 'appliances',
        room: 'kitchen'
      }
    ]
  },
  bathroom: {
    fixtures: [
      {
        id: 'b-fix-1',
        name: 'Standard Fixtures',
        description: 'Basic chrome bathroom fixtures',
        price: 1200,
        imageUrl: '/images/customization/fixtures/standard.jpg',
        category: 'fixtures',
        room: 'bathroom'
      },
      {
        id: 'b-fix-2',
        name: 'Premium Fixtures',
        description: 'Brushed nickel bathroom fixtures',
        price: 2200,
        imageUrl: '/images/customization/fixtures/premium.jpg',
        category: 'fixtures',
        room: 'bathroom'
      },
      {
        id: 'b-fix-3',
        name: 'Luxury Fixtures',
        description: 'Designer matte black fixtures',
        price: 3500,
        imageUrl: '/images/customization/fixtures/luxury.jpg',
        category: 'fixtures',
        room: 'bathroom'
      }
    ],
    tiling: [
      {
        id: 'b-tile-1',
        name: 'Ceramic Tile',
        description: 'Standard ceramic wall and floor tiles',
        price: 2800,
        imageUrl: '/images/customization/tiling/ceramic.jpg',
        category: 'tiling',
        room: 'bathroom'
      },
      {
        id: 'b-tile-2',
        name: 'Porcelain Tile',
        description: 'Premium porcelain wall and floor tiles',
        price: 3500,
        imageUrl: '/images/customization/tiling/porcelain.jpg',
        category: 'tiling',
        room: 'bathroom'
      },
      {
        id: 'b-tile-3',
        name: 'Natural Stone',
        description: 'Luxury natural stone tiles',
        price: 5200,
        imageUrl: '/images/customization/tiling/stone.jpg',
        category: 'tiling',
        room: 'bathroom'
      }
    ],
    vanity: [
      {
        id: 'b-van-1',
        name: 'Single Vanity',
        description: 'Standard single sink vanity',
        price: 1800,
        imageUrl: '/images/customization/vanity/single.jpg',
        category: 'vanity',
        room: 'bathroom'
      },
      {
        id: 'b-van-2',
        name: 'Double Vanity',
        description: 'Spacious double sink vanity',
        price: 3200,
        imageUrl: '/images/customization/vanity/double.jpg',
        category: 'vanity',
        room: 'bathroom'
      },
      {
        id: 'b-van-3',
        name: 'Luxury Vanity',
        description: 'Custom luxury vanity with storage',
        price: 4500,
        imageUrl: '/images/customization/vanity/luxury.jpg',
        category: 'vanity',
        room: 'bathroom'
      }
    ]
  }
};

const PropertyCustomization = () => {
  const { user } = useAuth();
  const { selectedOptions, totalCost, addOption, removeOption, clearOptions } = useCustomization();
  
  const [activeRoom, setActiveRoom] = useState<'livingRoom' | 'kitchen' | 'bathroom'>('livingRoom');
  const [activeCategory, setActiveCategory] = useState<string>('flooring');
  
  // Get categories for the active room
  const getCategories = () => {
    return Object.keys(customizationOptions[activeRoom]);
  };
  
  // Get options for the active room and category
  const getOptions = () => {
    return customizationOptions[activeRoom][activeCategory];
  };
  
  // Check if an option is selected
  const isOptionSelected = (option) => {
    const key = `${option.room}-${option.category}`;
    return selectedOptions[key]?.id === option.id;
  };
  
  // Handle option selection
  const handleOptionSelect = (option) => {
    addOption(option);
  };
  
  return (
    <Layout title="Property Customization - Prop.ie">
      <ProtectedRoute allowedRoles={['buyer']}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Customize Your Home</h1>
            <p className="text-gray-600">
              Personalize your new home with our selection of finishes, fixtures, and upgrades.
            </p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Select Room and Features</h2>
            </div>
            
            {/* Room Selection Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => {
                    setActiveRoom('livingRoom');
                    setActiveCategory('flooring');
                  }}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeRoom === 'livingRoom'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Living Room
                </button>
                <button
                  onClick={() => {
                    setActiveRoom('kitchen');
                    setActiveCategory('cabinetry');
                  }}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeRoom === 'kitchen'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Kitchen
                </button>
                <button
                  onClick={() => {
                    setActiveRoom('bathroom');
                    setActiveCategory('fixtures');
                  }}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeRoom === 'bathroom'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Bathroom
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {/* Category Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Feature
                </label>
                <div className="flex flex-wrap gap-2">
                  {getCategories().map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        activeCategory === category
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getOptions().map((option) => (
                  <div
                    key={option.id}
                    className={`border rounded-lg overflow-hidden ${
                      isOptionSelected(option) ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'
                    }`}
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        [Option Image]
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{option.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{option.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-primary-600 font-bold">€{option.price.toLocaleString()}</span>
                        <button
                          onClick={() => handleOptionSelect(option)}
                          className={`px-4 py-2 rounded-md text-sm font-medium ${
                            isOptionSelected(option)
                              ? 'bg-primary-600 text-white'
                              : 'bg-white border border-primary-600 text-primary-600 hover:bg-primary-50'
                          }`}
                        >
                          {isOptionSelected(option) ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Summary Section */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Your Selections</h2>
            </div>
            
            <div className="p-6">
              {Object.keys(selectedOptions).length === 0 ? (
                <p className="text-gray-500 italic">No customizations selected yet.</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {Object.values(selectedOptions).map((option) => (
                      <div key={option.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div>
                          <h4 className="font-medium text-gray-900">{option.name}</h4>
                          <p className="text-sm text-gray-500">
                            {option.room === 'livingRoom' ? 'Living Room' : option.room === 'kitchen' ? 'Kitchen' : 'Bathroom'} - 
                            {option.category.charAt(0).toUpperCase() + option.category.slice(1)}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-primary-600 font-medium mr-4">€{option.price.toLocaleString()}</span>
                          <button
                            onClick={() => removeOption(`${option.room}-${option.category}`)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium text-gray-900">Total Cost</p>
                      <p className="text-sm text-gray-500">All customizations and upgrades</p>
                    </div>
                    <span className="text-2xl font-bold text-primary-600">€{totalCost.toLocaleString()}</span>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={clearOptions}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Clear All Selections
                    </button>
                    
                    <Link href="/buyer/customization/summary">
                      <a className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700">
                        Save and Continue
                      </a>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* 3D Visualization Teaser */}
          <div className="mt-8 bg-primary-50 rounded-lg p-6 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">See Your Customizations in 3D</h3>
              <p className="text-gray-600 mb-4">
                Visualize how your selections will look in your new home with our interactive 3D tool.
              </p>
              <Link href="/buyer/customization/visualization">
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                  Launch 3D Visualization
                </a>
              </Link>
            </div>
            <div className="md:w-1/3 bg-gray-200 h-40 rounded-lg flex items-center justify-center text-gray-500">
              [3D Visualization Preview]
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default PropertyCustomization;
