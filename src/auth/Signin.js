import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../pages/Layout';
import { signin, authenticate, isAuthenticated } from '../authBE';

const Signin = () => {

  const [value, setValue] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false

  });

  const { email, password, error, loading, redirectToReferrer } = value;
const { user } = isAuthenticated()


  const handleChange = theInput => event => {
    setValue({ ...value, error: false, [theInput]: event.target.value })
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValue({ ...value, error: false, loading: true });
    signin({ email, password })
    .then(data => {
      if (data.error) {
        setValue({ ...value, error: data.error, loading: false })
      } else {
        authenticate(data, () => {
          setValue({
            ...value,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  // Form variable component
  const signInForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted"><strong>Email</strong></label>
      <input type="email" value ={email} className="form-control" onChange={ handleChange('email') } />
      </div>
      <div className="form-group">
        <label className="text-muted"><strong>Password</strong></label>
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

  const showLoading = () => (
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    )
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if ( user && user.role  === 1) {
        return <Redirect to="/admin/dashboard" />;
      }else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  return (
    <Layout title="Signin Page" description="Save Earth App" className="container col-md-8">

      <div className="container col-md-12 pt-5 pb-3" style={{ backgroundColor: '#c7e0f2'}}>
        { showLoading() }
        { showError() }
        { signInForm() }
        { redirectUser() }

      </div>
    </Layout>
  )
}

export default Signin;
