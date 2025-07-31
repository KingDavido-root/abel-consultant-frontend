import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const dummyProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: "₹1,29,900",
    description:
      "Apple iPhone 15 Pro Max with A17 Pro chip, 48MP camera, and Dynamic Island display.",
    image: "/images/iphone15.jpg",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: "₹1,39,999",
    description:
      "Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3, 200MP camera, and 6.8-inch AMOLED screen.",
    image: "/images/s24ultra.jpg",
  },
  {
    id: 3,
    name: "MacBook Air M3",
    price: "₹1,14,900",
    description:
      "Apple MacBook Air M3 with 13.6-inch Retina display, 18-hour battery life, and 8-core CPU.",
    image: "/images/macbookair.jpg",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Headphones",
    price: "₹29,990",
    description:
      "Industry-leading noise-canceling wireless headphones with up to 30 hours battery life.",
    image: "/images/sonyheadphones.jpg",
  },
];

export default function ElectronicsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = dummyProducts.find(
      (item) => item.id === parseInt(id)
    );
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate("/electronics");
    }
  }, [id, navigate]);

  if (!product) return null;

  return (
    <section className="min-h-screen py-12 px-4 md:px-10 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-xl shadow"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-indigo-600 font-bold text-xl mb-4">
              {product.price}
            </p>
            <p className="text-gray-700">{product.description}</p>
          </div>
          <button className="mt-6 w-full md:w-fit bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
