import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
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
    <>
      <Head>
        <title>Roster</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-start items-center">
        <h1 className="text-4xl p-6 font-semibold m-4 text-center text-gray-800 bevan bg-gray-100 rounded-lg shadow-lg mt-4 mx-4">My Studio Roster</h1>
        <div className="flex flex-wrap justify-center">
          {studioStudents.length > 0 ? (
            studioStudents.map((studioStudent) => (
              <section
                key={`studioStudent--${studioStudent.id}`}
                className="m-4"
              >
                <StudioStudentCard
                  studioStudentObj={studioStudent}
                  onUpdate={getAllStudioStudents}
                />
              </section>
            ))
          ) : (
            <h2 className="coustard text-lg bg-gray-100 p-3 rounded shadow-lg">No students currently enrolled.</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default StudioRoster;
