import PropTypes from 'prop-types';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
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
      registerUser(formData).then(() => updateUser(user.uid)).then(router.push('/'));
    } else {
      registerUser(formData).then(() => updateUser(user.uid)).then(router.push('/studios'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 mb-4 rounded-lg shadow-lg coustard">
      <div className="mb-3">
        <h2 className="block font-medium">Select your account type:</h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              name="isTeacher"
              value
              checked={formData.isTeacher === true}
              onChange={handleRadioChange}
              required
              className="mr-2"
            />
            <span>Teacher</span>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="isTeacher"
              value={false}
              checked={formData.isTeacher === false}
              onChange={handleRadioChange}
              required
              className="mr-2"
            />
            <span>Student</span>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <h2 className="block font-medium">Instrument:</h2>
        <input
          type="text"
          placeholder="Instrument"
          name="instrument"
          value={formData.instrument}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="mb-3">
        <h2 className="block font-medium">First Name:</h2>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="mb-3">
        <h2 className="block font-medium">Last Name:</h2>
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="mb-3">
        <h2 className="block font-medium">Pronouns:</h2>
        <input
          type="text"
          placeholder="Pronouns"
          name="pronouns"
          value={formData.pronouns}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>

      {formData.isTeacher === false ? (
        <>
          <div className="mb-3">
            <h2 className="block font-medium">Select your date of birth:</h2>
            <DatePicker
              selected={formData.birthdate ? moment(formData.birthdate).toDate() : null}
              onChange={handleDateChange}
              placeholderText="Birthdate"
              name="birthdate"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="mb-3">
            <h2 className="block font-medium">Guardian Names:</h2>
            <input
              type="text"
              placeholder="Guardian Names"
              name="guardianNames"
              value={formData.guardianNames}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
            />
          </div>
        </>
      ) : null}

      <div className="mb-3">
        <h2 className="block font-medium">Email:</h2>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="mb-3">
        <h2 className="block font-medium">Profile Image URL:</h2>
        <input
          type="url"
          placeholder="Profile Image URL"
          name="profileImageUrl"
          value={formData.profileImageUrl}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-900 text-white rounded-lg py-3 px-6 mt-4 transition duration-200 ease-in-out coustard"
      >
        Submit
      </button>
    </form>

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
