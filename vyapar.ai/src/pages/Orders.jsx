import React from 'react';
import { ShoppingCart, MoreVertical } from 'lucide-react';
import TiltCard from '../components/ui/TiltCard';

export default function Orders(){
  const orders = [
    { id: "#ORD-001", user: "Rohan Sharma", prod: "Super Sneakers", amt: "2,499", status: "Delivered", sCol: "text-green-400" },
    { id: "#ORD-002", user: "Priya Singh", prod: "Gaming Headset", amt: "3,200", status: "Processing", sCol: "text-yellow-400" },
    { id: "#ORD-003", user: "Amit Kumar", prod: "4K Monitor", amt: "28,000", status: "Shipped", sCol: "text-blue-400" },
    { id: "#ORD-004", user: "Sneha Verma", prod: "Smart Watch X", amt: "4,999", status: "Cancelled", sCol: "text-red-400" },
    { id: "#ORD-005", user: "Vikram Malhotra", prod: "Wireless Mouse", amt: "1,200", status: "Delivered", sCol: "text-green-400" },
  ];

  return (
    <div className="space-y-6 animate-slideUp">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3"><ShoppingCart className="text-orange-400" /> Recent Orders</h2>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg">New Order</button>
      </div>

      <TiltCard className="bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="bg-gray-900/50 text-gray-400 uppercase text-xs tracking-wider border-b border-gray-700">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((order, i) => (
                <tr key={i} className="text-gray-300 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-indigo-400 font-bold">{order.id}</td>
                  <td className="p-4 font-medium text-white">{order.user}</td>
                  <td className="p-4">{order.prod}</td>
                  <td className="p-4 font-bold">₹{order.amt}</td>
                  <td className={`p-4 font-bold ${order.sCol} flex items-center gap-2`}>
                    <div className={`w-2 h-2 rounded-full ${order.sCol.replace('text-', 'bg-')} animate-pulse`}></div>
                    {order.status}
                  </td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TiltCard>
    </div>
  );
}
