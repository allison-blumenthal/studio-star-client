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
    <div className="min-h-screen flex flex-col justify-start items-center">
      <h1 className="text-4xl p-4 font-semibold mb-4 text-center text-gray-800">My Studio Roster</h1>
      <div className="max-w-md p-4 md:p-6 bg-white rounded-lg shadow-lg mt-4">
        {studioStudents.map((studioStudent) => (
          <section
            key={`studioStudent--${studioStudent.id}`}
            className="mb-4" // Add margin between student cards
          >
            <StudioStudentCard
              studioStudentObj={studioStudent}
              onUpdate={getAllStudioStudents}
            />
          </section>
        ))}
      </div>
    </div>
  );
}

export default StudioRoster;
