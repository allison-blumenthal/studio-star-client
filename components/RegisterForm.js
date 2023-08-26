import PropTypes from 'prop-types';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    uid: user.uid,
    isTeacher: false,
    instrument: '',
    firstName: '',
    lastName: '',
    pronouns: '',
    birthdate: null,
    guardianNames: null,
    email: '',
    profileImageUrl: '',
  });

  // handles the date when chosen from the date picker
  const handleDateChange = (date) => {
    // formats the date for the backend using moment.js
    const formattedDate = moment(date).format('YYYY-MM-DD');

    setFormData((prevState) => ({
      ...prevState,
      birthdate: formattedDate,
    }));
  };

  // handles radio button selection
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    const newValue = value === 'true'; // Converts the string 'true' to boolean true, and 'false' to boolean false
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  // handles changes to regular values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.isTeacher === true) {
      registerUser(formData).then(() => updateUser(user.uid)).then(router.push('/studios/new'));
    } else {
      registerUser(formData).then(() => updateUser(user.uid)).then(router.push('/studios'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formBasicText">

        <div>
          <Form.Label>Select your account type:</Form.Label>
          <Form.Check
            inline
            label="Teacher"
            name="isTeacher"
            type="radio"
            // eslint-disable-next-line react/jsx-boolean-value
            value={true}
            checked={formData.isTeacher === true}
            onChange={handleRadioChange}
            required
          />
          <Form.Check
            inline
            label="Student"
            name="isTeacher"
            type="radio"
            value={false}
            checked={formData.isTeacher === false}
            onChange={handleRadioChange}
            required
          />
        </div>
        <br />

        <Form.Label>Instrument</Form.Label>
        <Form.Control type="text" placeholder="Instrument" name="instrument" value={formData.instrument} onChange={handleChange} required />

        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <Form.Label>Pronouns</Form.Label>
        <Form.Control type="text" placeholder="Pronouns" name="pronouns" value={formData.pronouns} onChange={handleChange} required />

        {formData.isTeacher === false ? (
          <>
            <div>
              <Form.Label>Select your date of birth:</Form.Label>
              <DatePicker
              // re-formats the date to the frontend format
              // so it will display correctly in the date picker
                selected={formData.birthdate ? moment(formData.birthdate).toDate() : null}
                onChange={handleDateChange}
                placeholderText="Birthdate"
                name="birthdate"
              />
            </div>

            <Form.Label>Gaurdian Names</Form.Label>
            <Form.Control type="text" placeholder="Guardian Names" name="guardianNames" value={formData.guardianNames} onChange={handleChange} required />
          </>
        ) : ('')}

        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />

        <Form.Label>Profile Image URL</Form.Label>
        <Form.Control type="url" placeholder="Profile Image URL" name="profileImageUrl" value={formData.profileImageUrl} onChange={handleChange} required />

      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    isTeacher: PropTypes.bool,
    instrument: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    pronouns: PropTypes.string,
    birthdate: PropTypes.string,
    guardianNames: PropTypes.string,
    email: PropTypes.string,
    profileImageUrl: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
