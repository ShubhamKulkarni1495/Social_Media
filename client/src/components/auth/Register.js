import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // const [file,setfile] = useState();

  // const onFormSubmit =(e) =>{
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('photo',file);

  //   const config = {
  //     headers:{
  //       'Content-Type':'multipart/form-data'
  //     },
  //   };
  //   const url = "http://localhost:5000/api/profile/upload"
  //   axios.post(url,formData,config).then((response) =>{
  //     console.log(response)
  //   })
  // }

  // const onInputChange = (e) =>{
  //   setfile(e.target.files[0])
  // }

  const { name, email, password, password2} = formData;


  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const file = {
    selectedFile:''
  }

  const fileSelectHandler = (e) => {
    this.setState({selectedFile:e.target.files[0]})
  }
  
  const fileUploadHandler = () => {
    const config = {
          headers:{
            'content-type':'multipart/form-data'
          },
        };
    const fd = new FormData();
    fd.append('photo',file)
    const url = "http://localhost:5000/api/profile/upload";
    axios.post(url,fd,config).then(res => {
      console.log(res);
    })
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <div className="from-group">
          <input type="file" onChange={fileSelectHandler}/>
            <button onClick={fileUploadHandler}>Upload</button>
        </div>
        {/* <div className="form-group">
          <form onSubmit ={onFormSubmit}>
            <input type="file" name="photo" onChange={onInputChange} />
            <button type="submit">Upload</button>
          </form>
        </div> */}
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
