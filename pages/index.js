import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div>
      {user.is_teacher === true ? (
        <>
          <h1>Welcome to Studio Star, {user.first_name}! </h1>
          <h2>Thank you for using our platform for all your music teaching studio needs.</h2>
        </>
      ) : (
        <>
          <h1>Welcome to Studio Star, {user.first_name}! </h1>
          <h2>Thank you for using our platform to access all your music lesson materials.</h2>
        </>
      )}
    </div>
  );
}

export default Home;
