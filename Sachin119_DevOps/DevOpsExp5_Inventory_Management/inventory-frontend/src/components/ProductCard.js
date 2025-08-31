import React from "react";
import { Package, Trash2, DollarSign, Box } from 'lucide-react';

function ProductCard({ product, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-lg p-2">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Price</span>
            </div>
            <span className="text-lg font-bold text-green-600">₹{product.price.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Box className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Stock</span>
            </div>
            <span className={`text-lg font-bold ${product.quantity > 10 ? 'text-green-600' : product.quantity > 5 ? 'text-yellow-600' : 'text-red-600'}`}>
              {product.quantity} units
            </span>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(product.id)}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Product</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;