import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';
import { getSingleUser } from '../../utils/data/userData';
import { createAssignment, getAssignmentsByStudentId } from '../../utils/data/assignmentData';
import AssignmentCard from '../../components/assignment/AssignmentCard';
import assignmentIcon from '../../src/assets/images/assignment-icon.png';
import { useAuth } from '../../utils/context/authContext';

export default function StudentAssignments() {
  const [student, setStudent] = useState({});
  const [assignments, setAssignments] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({});

  const { id } = router.query;

  const getCurrentStudent = () => {
    getSingleUser(id).then((data) => setStudent(data));
  };

  const getStudentAssignments = () => {
    getAssignmentsByStudentId(id).then((data) => setAssignments(data));
  };

  const setDate = (date) => {
    // formats the date for the backend using moment.js
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setFormData((prevState) => ({
      ...prevState,
      date: formattedDate,
    }));
  };

  const setData = () => {
    const currentDate = new Date();
    setDate(currentDate);

    setFormData((prevState) => ({
      ...prevState,
      studentId: id,
      date: moment(currentDate).format('YYYY-MM-DD'),
    }));
  };

  useEffect(() => {
    getCurrentStudent();
    getStudentAssignments();
    setData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = () => {
    createAssignment(formData).then((assignment) => router.push(`/assignments/${assignment.id}`));
  };

  const handleClick = () => {
    if (window.confirm('Create new assignment?')) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col justify-center items-center">
      <h1 className="text-4xl p-4 font-semibold mb-4 text-center text-gray-800">{student.first_name}&apos;s Assignments</h1>
      {user.is_teacher === true && (
        <Form onSubmit={handleSubmit} className="text-center mb-4">
          <Button onClick={handleClick}>
            <Image src={assignmentIcon} alt="assignment icon" />
          </Button>
        </Form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <section
            key={`assignment--${assignment.id}`}
            className="flex mb-3"
          >
            <div className="bg-white rounded-lg shadow-lg p-4">
              <AssignmentCard assignmentObj={assignment} onUpdate={getStudentAssignments} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
