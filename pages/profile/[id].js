import React from 'react';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';

export default function ProfileDetails() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="p-4 coustard flex flex-col items-center h-screen">
        <h1 className="bevan text-3xl  mb-2 text-center">Profile</h1>
        <div className="max-w-4xl text-left bg-gray-100 rounded-lg shadow-lg p-4 m-4">
          <div className="text-gray-900">
            <div className="flex items-center">
              <h2 className="bevan pr-1">Name: </h2>
              <h3 className="coustard ml-2 text-xl">{user.first_name} {user.last_name}</h3>
            </div>
            <div className="flex items-center">
              <h2 className="bevan pr-1">Pronouns:</h2>
              <h3 className="coustard ml-2 text-xl">{user.pronouns}</h3>
            </div>
            <div className="flex items-center">
              <h2 className="bevan pr-1">Instrument:</h2>
              <h3 className="coustard ml-2 text-xl">{user.instrument}</h3>
            </div>
            <div className="flex flex-wrap items-center">
              <h2 className="bevan pr-1">Email address:</h2>
              <h3 className="coustard ml-2 text-xl">{user.email}</h3>
            </div>
            {user.is_teacher === false ? (
              <>
                <div className="flex items-center">
                  <h2 className="bevan pr-1">Birthdate:</h2>
                  <h3 className="coustard ml-2 text-xl">{user.birthdate}</h3>
                </div>
                <div className="flex items-center pb-4">
                  <h2 className="bevan pr-1">Guardian names:</h2>
                  <h3 className="coustard ml-2 text-xl">{user.guardian_names}</h3>
                </div>
              </>
            ) : ('')}
          </div>
          <div className="p-4 flex items-center justify-center">
            <div className="w-72 h-72 rounded-full overflow-hidden">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt, @next/next/no-img-element */}
              <img src={user.profile_image_url} alt="user picture" className="object-cover w-full h-full max-w-full max-h-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
