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
        <div className="text-left">
          <h1 className="bevan text-3xl mb-2 text-center">Profile</h1>
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

          <div className="mt-4">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt, @next/next/no-img-element */}
            <img src={user.profile_image_url} alt="user picture" className="rounded-2xl " />
          </div>
          {user.is_teacher === false ? (
            <>
              <h2>Birthdate: {user.birthdate}</h2>
              <h2>Guardian names: {user.guardian_names}</h2>
              <Button onClick={handleClick}>View Teachers</Button>
            </>
          ) : ('')}
        </div>
      </div>
    </>
  );
}
