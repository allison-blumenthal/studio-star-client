import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
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
      <Form onSubmit={handleSubmit}>
        <Form.Label>Edit assignment date:</Form.Label>
        <DatePicker
          // re-formats the date to the frontend format
          // so it will display correctly in the date picker
          selected={moment(editAssignment.date).toDate()}
          onChange={handleDateChange}
          placeholderText="Assignment Date"
          name="date"
        />
        <Button variant="primary" type="submit">
          Update Assignment
        </Button>
      </Form>

    </>
  );
}
