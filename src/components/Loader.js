import { FaSpinner } from 'react-icons/fa';

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-8">
      <FaSpinner className="animate-spin text-2xl text-blue-600" />
    </div>
  );
}
