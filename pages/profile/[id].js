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
      <div className="p-4 coustard">
        <h1 className="bevan text-xl mb-2">Profile</h1>
        <h2>First name: {user.first_name}</h2>
        <h2>Last name: {user.last_name}</h2>
        <h2>Pronouns: {user.pronouns}</h2>
        <h2>Instrument: {user.instrument}</h2>
        <h2>Email address: {user.email}</h2>
        <div className="p-4">
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt, @next/next/no-img-element */}
          <img src={user.profile_image_url} alt="user picture" className="rounded-full" />
        </div>
        {user.is_teacher === false ? (
          <>
            <h2>Birthdate: {user.birthdate}</h2>
            <h2>Guardian names: {user.guardian_names}</h2>
            <Button onClick={handleClick}>View Teachers</Button>
          </>
        ) : ('')}
      </div>
    </>
  );
}
