export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-12 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Welcome to Abel Consultant LLC
      </h1>
      <p className="text-gray-600 max-w-xl mb-6">
        Your trusted partner in importing quality Electronics, Vehicles & Spare Parts.
      </p>
      <img 
        src="https://source.unsplash.com/featured/?technology,car,sparepart"
        alt="Hero"
        className="rounded-lg shadow-lg w-full max-w-4xl h-64 object-cover"
      />
    </div>
  );
}
