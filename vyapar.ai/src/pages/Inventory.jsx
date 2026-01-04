import React from 'react';
import { Package, Search, Filter } from 'lucide-react';
import TiltCard from '../components/ui/TiltCard';

export default function Inventory(){
  const items = [
    { name: "Super Sneakers", price: "2,499", stock: 120, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { name: "Smart Watch X", price: "4,999", stock: 45, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
    { name: "Gaming Headset", price: "3,200", stock: 8, stockLow: true, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
    { name: "Mechanical Keyboard", price: "6,500", stock: 32, img: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=400&q=80" },
    { name: "4K Monitor", price: "28,000", stock: 15, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80" },
    { name: "Wireless Mouse", price: "1,200", stock: 200, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80" },
  ];

  return (
    <div className="space-y-6 animate-slideUp">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3"><Package className="text-pink-400" /> Stock Management</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search products..." className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-pink-500 outline-none" />
          </div>
          <button className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-pink-600/20"><Filter size={18} /> Filter</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item,idx)=> (
          <TiltCard key={idx} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 group hover:shadow-2xl hover:shadow-pink-500/10">
            <div className="h-48 overflow-hidden relative">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-2 right-2">{item.stockLow ? (<span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg animate-pulse">Low Stock</span>) : (<span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">In Stock</span>)}</div>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white text-black px-4 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all">Quick Edit</button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
              <p className="text-gray-400 text-sm mb-3">ID: #PROD-{100+idx}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-pink-400">₹{item.price}</span>
                <span className="text-sm text-gray-500">{item.stock} Units</span>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
