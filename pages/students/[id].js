import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import getSingleUser from '../../utils/data/userData';

export default function StudentAssignments() {
  const [student, setStudent] = useState({});
  const router = useRouter();

  const { id } = router.query;

  const getCurrentStudent = () => {
    getSingleUser(id).then((data) => setStudent(data));
  };

  useEffect(() => {
    getCurrentStudent();
  }, [id]);

  return (
    <div>
      <h1>{student.first_name}&apos;s Assignments</h1>
    </div>
  );
}
