import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';
import getSingleUser from '../../utils/data/userData';
import { createAssignment, getAssignmentsByStudentId } from '../../utils/data/assignmentData';
import AssignmentCard from '../../components/assignment/AssignmentCard';
import assignmentIcon from '../../src/assets/images/assignment-icon.png';
import { useAuth } from '../../utils/context/authContext';

export default function StudentAssignments() {
  const [student, setStudent] = useState({});
  const [assignments, setAssignments] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date: null,
    studentId: '',
  });

  const { id } = router.query;

  const setDate = (date) => {
    // formats the date for the backend using moment.js
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setFormData((prevState) => ({
      ...prevState,
      date: formattedDate,
    }));
  };

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

  const handleSubmit = () => {
    createAssignment(formData).then((assignment) => router.push(`/assignments/${assignment.id}`));
  };

  const handleClick = () => {
    if (window.confirm('Create new assignment?')) {
      const currentDate = new Date();
      setDate(currentDate);
      setFormData((prevState) => ({
        ...prevState,
        studentId: id,
        date: moment(currentDate).format('YYYY-MM-DD'),
      }));
      console.warn(formData);
      handleSubmit();
    }
  };

  return (
    <div>
      <h1>{student.first_name}&apos;s Assignments</h1>
      {user.is_teacher === true
        ? (
          <Form onSubmit={handleSubmit}>
            <Button onClick={handleClick}>
              <Image src={assignmentIcon} alt="assignment icon" />
            </Button>
          </Form>
        ) : ('')}
      {assignments.map((assignment) => (
        <section key={`assignment--${assignment.id}`} className="assignment">
          <AssignmentCard assignmentObj={assignment} onUpdate={getStudentAssignments} />
          <br />
        </section>
      ))}
    </div>
  );
}
