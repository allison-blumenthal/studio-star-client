import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import getSingleUser from '../../utils/data/userData';
import { getAssignmentsByStudentId } from '../../utils/data/assignmentData';
import AssignmentCard from '../../components/assignment/AssignmentCard';

export default function StudentAssignments() {
  const [student, setStudent] = useState({});
  const [assignments, setAssignments] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  const getCurrentStudent = () => {
    getSingleUser(id).then((data) => setStudent(data));
  };

  const getStudentAssignments = () => {
    getAssignmentsByStudentId(id).then((data) => setAssignments(data));
  };

  useEffect(() => {
    getCurrentStudent();
    getStudentAssignments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <h1>{student.first_name}&apos;s Assignments</h1>
      {assignments.map((assignment) => (
        <section key={`assignment--${assignment.id}`} className="assignment">
          <AssignmentCard assignmentObj={assignment} onUpdate={getStudentAssignments} />
          <br />
        </section>
      ))}

    </div>
  );
}
