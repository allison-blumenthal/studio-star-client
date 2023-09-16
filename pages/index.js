import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <div className="max-w-md p-4 md:p-6 bg-white rounded-lg shadow-lg mt-4">
        <h1 className="text-3xl font-semibold mb-4">
          Welcome to Studio Star, {user.first_name}!
        </h1>
        <h2 className="text-lg text-gray-600">
          {user.is_teacher === true
            ? 'Thank you for using our platform for all your music teaching studio needs.'
            : 'Thank you for using our platform to access all your music lesson materials.'}
        </h2>
      </div>
    </div>
  );
}

export default Home;
