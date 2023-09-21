import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="min-h-screen w-full flex flex-col justify-start items-center bg-cover bg-fixed bg-no-repeat" style={{ backgroundImage: 'url(/instruments.png)' }}>
        <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg mt-4 mx-4">
          <h1 className="text-3xl font-semibold mb-4 text-center bevan">
            Welcome, {user.first_name}!
          </h1>
          <div className="text-xl text-gray-600 coustard text-center">
            {user.is_teacher === true
              ? (
                <div>
                  <h2>Thanks for using Studio Star for all your music studio needs.</h2>
                  <h2>Use the navbar icons to access your student roster, see all teachers, and view your profile.</h2>
                  <br />
                  <h1 className="bevan text-blue-900">Features coming soon:</h1>
                  <h2>Post updates for your entire studio, message back and forth with students on assignments, and access a wide variety of unique and searchable stickers.</h2>
                  <br />
                  <h1 className="bevan text-2xl">Happy teaching!</h1>
                </div>
              )
              : (
                <div>
                  <h2>Thanks for using Studio Star for all your music lesson materials.</h2>
                  <h2>Use the navbar icons to access your assignment page, see all teachers, and view your profile.
                  </h2>
                  <br />
                  <h1 className="bevan text-blue-900">Features coming soon:</h1>
                  <h2>View teacher updates for the entire studio, message back and forth with teachers on assignments, and access a wide variety of unique and searchable stickers.</h2>
                  <br />
                  <h1 className="bevan text-2xl">Happy practicing!</h1>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
