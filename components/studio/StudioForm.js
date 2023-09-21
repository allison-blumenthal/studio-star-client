import React, { useState } from 'react';
import { useRouter } from 'next/router';
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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={currentStudio.name}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <div className="text-center">
          <button
            size="lg"
            className="bg-blue-700 hover:bg-blue-900 text-white rounded-lg py-3 px-6 mb-4 transition duration-200 ease-in-out coustard"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>

    </>
  );
}

export default StudioForm;
