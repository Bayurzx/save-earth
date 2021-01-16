import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../pages/Layout';
import { signup } from '../authBE';

const Signup = () => {
  // useState
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false

  });

  const { name, email, password, error, success } = value;


  const handleChange = theInput => event => {
    setValue({ ...value, error: false, [theInput]: event.target.value })
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValue({ ...value, error: false });
    signup({ name, email, password })
    .then(data => {
      if (data.error) {
        setValue({ ...value, error: data.error, success: false })
      } else {
        setValue({
          ...value,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true
        })
      }
    })
  }

  // Form variable component
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label htmlFor="" className="text-muted"><strong>Name</strong></label>
      <input type="text" value ={name} className="form-control" onChange={ handleChange('name') } />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted"><strong>Email</strong></label>
      <input type="email" value ={email} className="form-control" onChange={ handleChange('email') } />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted"><strong>Password</strong></label>
      <input type="password" value ={password} className="form-control" onChange={ handleChange('password') } />
      </div>
      <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
    </form>
  )

  const showError = () => (
      <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
        { error }
      </div>
  )

  const showSuccess = () => (
      <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
        You successfully signed up. Please <Link to='/signin'>Signin</Link>
      </div>
  )

  return (
    <Layout title="Signup Page" description="Save Earth App" className="container col-md-8">

      <div className="container col-md-12 pt-5 pb-3" style={{ backgroundColor: '#c7e0f2'}}>
        { showSuccess() }
        { showError() }
        { signUpForm() }

      </div>
    </Layout>
  )
}

export default Signup;
