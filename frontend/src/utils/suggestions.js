import axios from "./axios"; // or "../utils/axios" if that's your custom axios

const PARTS_DB = [
  {
    type: "cpu",
    model: "Intel Core i5-12400",
    price: 179.99,
    link: "https://www.amazon.com/dp/B09V6FJ7KJ"
  },
  {
    type: "ram",
    model: "Corsair Vengeance LPX 16GB (2x8GB) DDR4",
    price: 49.99,
    link: "https://www.amazon.com/dp/B0143RT8OY"
  },
  {
    type: "gpu",
    model: "NVIDIA GeForce RTX 4060",
    price: 299.99,
    link: "https://www.amazon.com/dp/B0C7J6Q6Q6"
  }
  // ...add more parts
];

const SEARCH_URLS = {
  cpu: "https://www.amazon.com/s?k=desktop+cpu",
  ram: "https://www.amazon.com/s?k=ddr4+ram",
  storage: "https://www.amazon.com/s?k=ssd",
  gpu: "https://www.amazon.com/s?k=graphics+card"
};

export function getSuggestions(specs) {
  const suggestions = [];
  if (specs.cpu && specs.cpu.cores < 4) {
    suggestions.push({
      part: "CPU",
      problem: "Low core count",
      link: "https://www.amazon.in/s?k=desktop+cpu",
      label: "Find a better CPU"
    });
  }
  if (specs.ram && specs.ram < 8) {
    suggestions.push({
      part: "RAM",
      problem: "Low memory",
      link: `https://www.amazon.in/s?k=ddr4+ram+${specs.ram < 4 ? "8gb" : "16gb"}`,
      label: "Find more RAM"
    });
  }
  if (specs.storage && specs.storage.size < 256) {
    suggestions.push({
      part: "Storage",
      problem: "Upgrade storage to at least 256GB SSD",
      link: `https://www.amazon.in/s?k=ssd+256gb`,
      label: "Find a 256GB SSD"
    });
  }
  if (specs.gpu && specs.gpu.toLowerCase().includes("integrated")) {
    suggestions.push({
      part: "GPU",
      problem: "Integrated graphics detected",
      link: "https://www.amazon.in/s?k=graphics+card",
      label: "Find a dedicated GPU"
    });
  }
  return suggestions;
}

export async function fetchPartSuggestion(type, query) {
  const res = await axios.get(`/api/parts/suggest?type=${type}&query=${query}`);
  return res.data;
}