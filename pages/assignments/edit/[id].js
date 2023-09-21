import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Head from 'next/head';
import { getSingleAssignment, updateAssignment } from '../../../utils/data/assignmentData';

export default function EditAssignment() {
  const [editAssignment, setEditAssignment] = useState({});
  const router = useRouter();

  const { id } = router.query;

  const getEditAssignment = () => {
    getSingleAssignment(id).then(setEditAssignment);
  };

  useEffect(() => {
    getEditAssignment();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // handles the date when chosen from the date picker
  const handleDateChange = (date) => {
  // formats the date for the backend using moment.js
    const formattedDate = moment(date).format('YYYY-MM-DD');

    setEditAssignment((prevState) => ({
      ...prevState,
      date: formattedDate,
      studentId: editAssignment.student_id.id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateAssignment(editAssignment).then(() => router.push(`/assignments/${id}`));
  };

  return (
    <>
      <Head>
        <title>Edit Assignment</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-start items-center">
        <h1 className="text-4xl p-4 font-semibold mt-4 text-center text-gray-800 bevan">Edit Assignment Date</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <DatePicker
              // re-formats the date to the frontend format
              // so it will display correctly in the date picker
              selected={moment(editAssignment.date).toDate()}
              onChange={handleDateChange}
              placeholderText="Assignment Date"
              name="date"
              className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-900 text-white rounded-lg py-3 px-6 mt-4 transition duration-200 ease-in-out coustard"
            >
              Update
            </button>
          </div>
        </form>
      </div>

    </>
  );
}
