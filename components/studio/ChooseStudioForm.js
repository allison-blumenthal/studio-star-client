import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import TeacherCard from './TeacherCard';

// const initialState = {
//   studentId: 0,
//   teacherId: 0,
// };

export default function TeacherForm() {
  // eslint-disable-next-line no-unused-vars
  const [teachers, setTeachers] = useState([]);

  return (
    <Form>
      <h1>Choose Studios</h1>
      <div className="teacher-cards-container">
        {teachers.map((teacher) => (
          <TeacherCard teacherObj={teacher} onSelect />
        ))}
      </div>
    </Form>

  );
}

TeacherForm.propTypes = {

};
