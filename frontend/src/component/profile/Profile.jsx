// Profile.js
import React, { useEffect } from 'react';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import './profile.css';
import { deleteProfile } from '../../actions/user';

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);

  const profileDeleteHandler = () => {
    dispatch(deleteProfile());
  };
  
  

  return (
    <div className="profileParentContainer">
      <div className="profileContents">
        <div className="profileAvatar">
          <Avatar alt="profile" src={user.avatar.url}  sx={{ width: '15vh', height: '15vh' }}/>
        </div>
        <div className="profileName" style={{display:'flex'}}>
          <div className="nameHeading">
            <h5>NAME:</h5>
          </div>
          <div className="nameShow">
            <p>{user.name}</p>
          </div>
        </div>
        <div className="profileEmail" style={{display:'flex'}}>
          <div className="emailHeading">
            <h5>EMAIL:</h5>
          </div>
          <div className="emailShow">
            <p>{user.email}</p>
          </div>
        </div>
        <div className="profilePonts">
          <h2>Points : </h2><p>{user.points}</p>
        </div>
        <div className="profileDelete">
          <button onClick={profileDeleteHandler}>
         <a href='/' style={{color:'white',textDecoration:'none'}}> <DeleteIcon /></a>
          </button> 
        </div>
      </div>
    </div>
  );
};

export default Profile;
