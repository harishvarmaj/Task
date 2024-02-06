import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const params = useParams();
  const { id } = params;
  const [editMode, setEditMode] = useState(false);
  // console.log("====================="+userDetails);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [contact, setContactNumber] = useState('');
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/editUserDetails`,{
          id,
          name,
          email,
          age,
          dob,
          contact
        }
      );
        window.alert(response.data);
      }catch(e){
        window.alert(e);
      }
    setEditMode(false);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getUserDetails/${id}`
        );
        // console.log('============' + JSON.stringify(response));
        setName(response.data.name);
        setEmail(response.data.email);
        setAge(response.data.age);
        setDob(response.data.dob);
        setContactNumber(response.data.contact);
        // console.log('------------------' + JSON.stringify(editedDetails));
      } catch (e) {
        window.alert(e);
      }
    };
    getUserDetails();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="user-details">
        <p>
          <strong>Name:</strong>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            name
          )}
        </p>
        <p>
          <strong>Email:</strong>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            email
          )}
        </p>
        <p>
          <strong>Age:</strong>
          {editMode ? (
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          ) : (
            age
          )}
        </p>
        <p>
          <strong>DOB:</strong>
          {editMode ? (
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          ) : (
            dob
          )}
        </p>
        <p>
          <strong>Contact Number:</strong>
          {editMode ? (
            <input
              type="tel"
              name="contactNumber"
              value={contact}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          ) : (
            contact
          )}
        </p>
      </div>

      {editMode ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default Profile;
