import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';

export default function ProfileDetails() {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    router.push('/studios');
  };

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="p-4 coustard flex flex-col items-center h-screen">
        <h1 className="bevan text-3xl mb-2 text-center">Profile</h1>
        <div className="text-left bg-white rounded-lg p-4 m-4 flex flex-col md:flex-row md:items-start md:space-x-4">
          <div className="max-w-1/2">
            <h2 className="bevan">First name: </h2>
            <h3 className="coustard ml-2 text-xl">{user.first_name}</h3>

            <h2 className="bevan">Last name:</h2>
            <h3 className="coustard ml-2 text-xl">{user.last_name}</h3>

            <h2 className="bevan">Pronouns:</h2>
            <h3 className="coustard ml-2 text-xl">{user.pronouns}</h3>

            <h2 className="bevan">Instrument:</h2>
            <h3 className="coustard ml-2 text-xl">{user.instrument}</h3>

            <h2 className="bevan">Email address:</h2>
            <h3 className="coustard ml-2 text-xl">{user.email}</h3>
            {user.is_teacher === false ? (
              <>
                <h2 className="bevan">Birthdate:</h2>
                <h3 className="coustard ml-2 text-xl">{user.birthdate}</h3>
                <h2 className="bevan">Guardian names:</h2>
                <h3 className="coustard ml-2 text-xl">{user.guardian_names}</h3>
              </>
            ) : ('')}
            <Button onClick={handleClick} className="bg-blue-700 hover:bg-blue-900 text-white rounded-lg py-3 px-6 mb-4 transition duration-200 ease-in-out coustard my-4">View Teachers</Button>
          </div>
          <div className="max-w-1/2 relative flex justify-end pr-3 pt-2">
            <div className="w-36 h-36 rounded-full overflow-hidden">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt, @next/next/no-img-element */}
              <img src={user.profile_image_url} alt="user picture" className="object-cover w-full h-full max-w-full max-h-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
