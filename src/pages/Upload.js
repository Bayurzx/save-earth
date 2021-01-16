import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { isAuthenticated } from '../authBE';
import { Link } from 'react-router-dom';

const Upload = () => {
  const { user , token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    caption: "",
    description: "",
    username: "",
    email: "",
    location: "",
    attended_to: false,
    created_at: "",
    donated: "",
    photo: "",
    coord: "",
    button_visible: true,
    endanger: "",
    ofClass: "",
    error: "",
    loading: "",
    createdProduct: "",
    redirectToProfile: false
  })

  const {
    name,
    caption,
    description,
    username,
    email,
    location,
    attended_to,
    created_at,
    donated,
    photo,
    coord,
    button_visible,
    endanger,
    ofClass,
    error,
    loading,
    createdProduct
  } = values

  // try to get coords
  let ofCoord = {
    "coordinates": [],
    "type": "Point"
  }


  const init = () => {
    setValues({...values, coord: ofCoord
    })
  }

  useEffect(() => {
    init()
  }, [])

  const handleChange = key => event => {
    const value = key === 'photos' ? event.target.files[0] : event.target.value
    setValues({
      ...values,
      [key]: value
    })
  }

  // get location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showGeoErrors);
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  // add coordinates to ofCoord
  const showPosition = (position) => {
    alert(`Your Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`)
    ofCoord.coordinates.push(position.coords.latitude)
    ofCoord.coordinates.push(position.coords.longitude)
    setValues({
      ...values,
      coord: ofCoord,
      username: user.name,
      email: user.email,
      created_at: new Date()
    })
  }
  // Prepare for errors
  const showGeoErrors = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
    }
  }
  // get location ends

  // This runs on submit
  const clickSumbit = (event) => {
    setValues({...values, error: '', loading: true})
    event.preventDefault();

    axios.post('/.netlify/functions/addData', values)
    .then(data => {
      setValues({
        ...values,
        name: '',
        description: '',
        photo: '',
        error: "",
        loading: false,
        createdProduct: name
      })
    })
    .catch(error => setValues({...values, error: error})
    )

  };

  const productForm = () => {
  return (
    <form onSubmit={ clickSumbit } className="mb-3 placeholderInput" data-netlify="true">

      <div className="form-group placeholderInput">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" value={name} required onChange={ handleChange('name') } placeholder = "        **White Tiger 🐯 **"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Caption</label>
        <input type="text" className="form-control" value={caption} onChange={ handleChange('caption') } placeholder = "      **Injured Male Tiger 🐯 **"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea type="text" className="form-control" value={description} onChange={ handleChange('description') } placeholder = "     **This white tiger was found at...**"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Found at</label>
        <input type="text" className="form-control" value={location} onChange={ handleChange('location') } placeholder = "       **10 Downing St, Westminster, London..."/>
      </div>
      <div className="form-group">
        <label className="text-muted">Add an image link</label>
        <input type="text" className="form-control" value={photo} onChange={ handleChange('photo') } placeholder = "       **Link Format: 'https://abcxyz.jpg' Can upload at <postimages.org or imgur> **"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Class</label>
        <select className="form-control" onChange={ handleChange('ofClass') }>
          <option>Please Select...</option>
          <option value="0">Plant</option>
          <option value="1">Animal</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Ask Donation</label>
        <select className="form-control" onChange={ handleChange('button_visible') }>
          <option>Please Select...</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Endangered</label>
        <select className="form-control" onChange={ handleChange('endanger') }>
          <option>Please Select...</option>
          <option value="0">extinct</option>
          <option value="1">extinct in the wild</option>
          <option value="2">critically endangered</option>
          <option value="3">endangered</option>
          <option value="4">vulnerable</option>
          <option value="5">near threatened</option>
          <option value="6">least concern</option>
          <option value="7">Data deficient</option>
          <option value="8">Not evaluated</option>
        </select>
      </div>
      <div className="form-group">
        <label className="btn btn btn-info">
          &nbsp;  Add coordinates to allow pinpoint accuracy  &nbsp;
          <input type="button" value="Save location" onClick={getLocation} />
        </label>
      </div>
      <br/> <hr/>

      <button className="btn btn-outline-primary">Discover</button>
    </form>
  )
}

const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
      { error }
    </div>
)

const showSuccess = () => (
    <div className="alert alert-info" style={{ display: createdProduct ? "" : "none" }}>
      <h2>{ `${createdProduct} was created successfully!` }</h2>
    </div>
)

const showLoading = () => (
  loading && (
    <div className="alert alert-success">
      <h2>Loading...</h2>
    </div>
  )
)



  return (
    <Layout title="Add a new discovery" description={ `Hello ${user.name}, add a discovery` }>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          { showError() }
          { showSuccess() }
          { showLoading() }
          { productForm() }
          <br/><hr/>
          {/* { JSON.stringify(values) } */}
        </div>
      </div>
    </Layout>
  )
}

export default Upload;
