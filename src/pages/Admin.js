import dummyCars from '../data/dummyCars';
import dummyElectronics from '../data/dummyElectronics';
import dummySpareParts from '../data/dummySpareParts';

export default function AdminDashboard() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>

      <section className="mb-6">
        <h3 className="text-lg font-bold mb-2">Electronics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {dummyElectronics.map(item => (
            <div key={item._id} className="border rounded p-2">
              <img src={item.images[0]} alt={item.title} className="h-32 w-full object-cover mb-1" />
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">${item.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-bold mb-2">Cars</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {dummyCars.map(item => (
            <div key={item._id} className="border rounded p-2">
              <img src={item.images[0]} alt={item.title} className="h-32 w-full object-cover mb-1" />
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">${item.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-2">Spare Parts</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {dummySpareParts.map(item => (
            <div key={item._id} className="border rounded p-2">
              <img src={item.images[0]} alt={item.title} className="h-32 w-full object-cover mb-1" />
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">${item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
