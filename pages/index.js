import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  console.warn(user);
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {user.is_teacher === true ? (
        <>
          <h1> Hello, {user.first_name}! </h1>
          <h2>You are a teacher.</h2>
        </>
      ) : (
        <>
          <h1>Greetings, {user.first_name}! </h1>
          <h2>You are a student.</h2>
        </>
      )}
    </div>
  );
}

export default Home;
