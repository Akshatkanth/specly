import React from "react";

const PARTS = [
	{
		category: "CPU",
		name: `Intel Core i7-14700K`,
		link: "https://www.amazon.in/s?k=intel+core+i7+14700k",
	},
	{
		category: "RAM",
		name: "Corsair Vengeance 32GB",
		link: "https://www.amazon.in/s?k=corsair+vengeance+32gb+ddr5",
	},
	{
		category: "SSD",
		name: "Samsung 990 Pro 1TB NVMe",
		link: "https://www.amazon.in/s?k=samsung+990+pro+1tb+nvme",
	},
	{
		category: "GPU",
		name: "NVIDIA RTX 4070 Super",
		link: "https://www.amazon.in/s?k=rtx+4070+super",
	},
];

const Shop = () => (
	<div className="min-h-screen bg-black flex flex-col items-center justify-center pt-24 px-4">
		<h2 className="text-3xl font-extrabold text-[#2176FF] mb-8 text-center">
			Latest PC Parts
		</h2>
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
			{PARTS.map((part, idx) => (
				<div
					key={idx}
					className="bg-[#181A1B] rounded-xl shadow-lg p-6 flex flex-col items-center border border-[#2176FF]/30 transition-transform hover:scale-105"
				>
					<span className="text-[#2176FF] font-bold text-lg mb-2 text-center">
						{part.category}
					</span>
					<span className="text-white font-semibold mb-4 text-center">
						{part.name}
					</span>
					<a
						href={part.link}
						target="_blank"
						rel="noopener noreferrer"
						className="bg-black text-white font-bold px-4 py-2 rounded-lg shadow border-2 border-[#2176FF] hover:bg-[#181A1B] hover:text-[#2176FF] transition-colors mt-4 w-full text-center"
					>
						View on Amazon.in
					</a>
				</div>
			))}
		</div>
	</div>
);

export default Shop;