import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl font-medium text-gray-600 mb-8">
        Page not found
      </p>
      <Link
        to="/"
        replace
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Go back to home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
