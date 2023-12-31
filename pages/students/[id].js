import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Head from 'next/head';
import { getSingleUser } from '../../utils/data/userData';
import { createAssignment, getAssignmentsByStudentId } from '../../utils/data/assignmentData';
import AssignmentCard from '../../components/assignment/AssignmentCard';
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
    createAssignment(formData).then(() => getStudentAssignments());
  };

  const handleClick = () => {
    if (window.confirm('Create new assignment?')) {
      handleSubmit();
    }
  };

  return (
    <>
      <Head>
        <title>{student.first_name}&apos;s Assignments</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-start items-center">
        <h1 className="text-4xl font-semibold text-center text-gray-800 bevan bg-gray-100 rounded m-4 p-3 shadow-lg">{student.first_name}&apos;s Assignments</h1>
        {user.is_teacher === true && (
        <form onSubmit={handleSubmit} className="text-center">
          <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-800 text-white rounded-lg py-3 px-6 transition duration-200 ease-in-out coustard" type="button">New Assignment
          </button>
        </form>
        )}
        {assignments.length > 0 ? (
          <div className="p-4 md:p-6 gap-2 flex flex-wrap justify-center">
            {assignments.map((assignment) => (
              <section
                key={`assignment--${assignment.id}`}
                className="flex mb-3"
              >
                <div>
                  <AssignmentCard assignmentObj={assignment} onUpdate={getStudentAssignments} />
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="coustard bg-gray-100 rounded p-3 shadow-lg m-4">No assignments have been created yet.</p>
        )}
      </div>
    </>
  );
}
