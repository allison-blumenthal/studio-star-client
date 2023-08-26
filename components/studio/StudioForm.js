import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createStudio } from '../../utils/data/studioData';

const initialState = {
  name: '',
  teacherId: 0,
};

function StudioForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStudio, setCurrentStudio] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudio((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createStudio(currentStudio, user.uid).then((studio) => router.push(`/studios/${studio.id}`));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Studio Name</Form.Label>
          <Form.Control name="name" required value={currentStudio.name} onChange={handleChange} type="text" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </>
  );
}

export default StudioForm;
