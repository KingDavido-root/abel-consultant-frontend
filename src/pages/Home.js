import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Abel Consultant LLC</h1>
      <p className="text-gray-600 mb-8">
        We import and export Electronics, Vehicles and Spare Parts. Browse our catalog and place your order today!
      </p>
      <div className="space-x-4">
        <Link to="/electronics" className="bg-blue-600 text-white px-4 py-2 rounded">Electronics</Link>
        <Link to="/cars" className="bg-blue-600 text-white px-4 py-2 rounded">Vehicles</Link>
        <Link to="/spareparts" className="bg-blue-600 text-white px-4 py-2 rounded">Spare Parts</Link>
      </div>
    </div>
  );
}
