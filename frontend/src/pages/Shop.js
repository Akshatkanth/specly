import React from "react";
import bgStars from "./assets/bg.jpg"; 

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
	<div
		className="min-h-screen w-full flex flex-col items-center justify-center pt-24 px-4 relative"
		style={{
			backgroundImage: `url(${bgStars})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			backgroundColor: "#000",
		}}
	>
		<div
			className="absolute inset-0 pointer-events-none"
			style={{
				background:
					"linear-gradient(135deg, rgba(0,0,0,0.95) 80%, #2176FF 120%)",
				opacity: 0.85,
			}}
		></div>
		<div className="relative w-full flex flex-col items-center justify-center">
			<h2 className="text-3xl font-extrabold text-[#2176FF] mb-8 text-center">
				Latest PC Parts
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
				{PARTS.map((part, idx) => (
					<div
						key={idx}
						className="bg-black bg-opacity-95 rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-[#2176FF]/60 transition-transform hover:scale-105"
						style={{
							boxShadow:
								"0 8px 32px 0 rgba(33, 118, 255, 0.15), 0 1.5px 8px 0 rgba(0,0,0,0.7)",
							backdropFilter: "blur(2px)",
							border: "1.5px solid #2176FF",
						}}
					>
						<span className="text-[#2176FF] font-extrabold text-lg mb-2 text-center drop-shadow">
							{part.category}
						</span>
						<span className="text-white font-semibold mb-4 text-center">
							{part.name}
						</span>
						<a
							href={part.link}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-black text-white font-bold px-4 py-2 rounded-lg shadow border-2 border-[#2176FF] hover:bg-[#2176FF] hover:text-white transition-colors mt-4 w-full text-center"
						>
							View on Amazon.in
						</a>
					</div>
				))}
			</div>
		</div>
	</div>
);

export default Shop;