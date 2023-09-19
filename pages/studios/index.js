import React, { useState, useEffect } from 'react';
import StudioCard from '../../components/studio/StudioCard';
import { useAuth } from '../../utils/context/authContext';
import { getStudios } from '../../utils/data/studioData';

function StudiosPage() {
  const [studios, setStudios] = useState([]);
  const { user } = useAuth();

  const getAllStudios = () => {
    getStudios(user.uid).then((data) => setStudios(data));
  };

  useEffect(() => {
    getAllStudios();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="min-h-screen p-4 flex flex-col justify-start items-center">
      <h1 className="text-4xl p-4 font-semibold text-center text-gray-800 bevan">Studios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {studios.map((studio) => (
          <section
            key={`studio--${studio.id}`}
            className="bg-white rounded-lg shadow-lg p-4"
          >
            <StudioCard studioObj={studio} onUpdate={getAllStudios} enrolled={studio.enrolled} />
            <br />
          </section>
        ))}
      </div>
    </div>
  );
}

export default StudiosPage;
