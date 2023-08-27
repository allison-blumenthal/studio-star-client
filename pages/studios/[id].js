import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import StudioStudentCard from '../../components/studio/StudioStudentCard';
import { useAuth } from '../../utils/context/authContext';
import { getStudentsByStudio } from '../../utils/data/studioData';

function StudioRoster() {
  const [studioStudents, setStudioStudents] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const { id } = router.query;

  const getAllStudioStudents = () => {
    getStudentsByStudio(id).then((data) => setStudioStudents(data));
  };

  useEffect(() => {
    getAllStudioStudents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <article className="studios">
      <h1>My Studio Roster</h1>
      {studioStudents.map((studioStudent) => (
        <section key={`studioStudent--${studioStudent.id}`} className="studioStudent">
          <StudioStudentCard studioStudentObj={studioStudent} onUpdate={getAllStudioStudents} />
        </section>
      ))}
    </article>
  );
}

export default StudioRoster;
