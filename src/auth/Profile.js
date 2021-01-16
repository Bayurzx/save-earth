import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../pages/Layout';
import { isAuthenticated } from '../authBE';
import { read, update, updateUserLocalStorage } from './apiAuth';

const Profile = ({match}) => {
  // destructured match from props
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
  });

  const { token } = isAuthenticated()

  const {name, email, password, error, success} = values;

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({...values, error: true})
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
        })
      }
    })
  }

  useEffect(() => {
    init(match.params.userId)
  }, [])

  const handleChange = name => (e) => {
    setValues({...values, error: false, [name]: e.target.value})
    //notice we use array to save a variable key; it is called "Object Initializer"
  }

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, {name, email, password}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        updateUserLocalStorage(data, () => {
          setValues({...values, name: data.name, email: data.email, success: true})
        })
      }
    })
  }

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />
    }
  }

  const profileUpdate = (name, email, password) => (
    <form action="">
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
      </div>
      <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
    </form>
  )

  return (
    <Layout title="Profile" description="Update your profile" className="container-fluid">
      <h2 className="mb-4">Profile Update</h2>
      <div>
        {profileUpdate(name, email, password)}
        { redirectUser(success) }
      </div>
    </Layout>
  )
}

export default Profile;
