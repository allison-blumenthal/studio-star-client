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

  console.warn(studios);

  useEffect(() => {
    getAllStudios();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <article className="studios">
      <h1>Studios</h1>
      {studios.map((studio) => (
        <section key={`studio--${studio.id}`} className="studio">
          <StudioCard studioObj={studio} onUpdate={getAllStudios} enrolled={studio.enrolled} />
        </section>
      ))}
    </article>
  );
}

export default StudiosPage;
