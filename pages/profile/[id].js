import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';

export default function ProfileDetails() {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    router.push('/studios');
  };

  return (
    <div>
      <h1>Profile</h1>
      <h2>First name: {user.first_name}</h2>
      <h2>Last name: {user.last_name}</h2>
      <h2>Pronouns: {user.pronouns}</h2>
      <h2>Instrument: {user.instrument}</h2>
      <h2>Email address: {user.email}</h2>
      {user.is_teacher === false ? (
        <>
          <h2>Birthdate: {user.birthdate}</h2>
          <h2>Guardian names: {user.guardian_names}</h2>
          <Button onClick={handleClick}>View Teachers</Button>
        </>
      ) : ('')}
    </div>
  );
}
