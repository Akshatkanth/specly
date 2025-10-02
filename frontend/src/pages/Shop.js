import React from "react";

const PARTS = [
  {
    category: "CPU",
    name: "Intel Core i7-14700K",
    link: "https://www.amazon.in/s?k=intel+core+i7+14700k"
  },
  {
    category: "RAM",
    name: "Corsair Vengeance 32GB DDR5",
    link: "https://www.amazon.in/s?k=corsair+vengeance+32gb+ddr5"
  },
  {
    category: "SSD",
    name: "Samsung 990 Pro 1TB NVMe",
    link: "https://www.amazon.in/s?k=samsung+990+pro+1tb+nvme"
  },
  {
    category: "GPU",
    name: "NVIDIA RTX 4070 Super",
    link: "https://www.amazon.in/s?k=rtx+4070+super"
  }
];

const Shop = () => (
  <div className="min-h-screen bg-gray-950 px-4 py-10">
    <h2 className="text-3xl font-extrabold text-cyan-400 mb-8 text-center">Latest PC Parts</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {PARTS.map((part, idx) => (
        <div key={idx} className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform hover:scale-105">
          <span className="text-cyan-400 font-bold text-lg mb-2">{part.category}</span>
          <span className="text-white font-semibold mb-4 text-center">{part.name}</span>
          <a
            href={part.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan-400 text-gray-900 font-bold px-4 py-2 rounded-lg shadow hover:bg-cyan-300 transition-colors"
          >
            View on Amazon.in
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Shop;