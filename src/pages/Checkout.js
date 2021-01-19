import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getBraintreeClientToken, processPayment } from '../apis';
import {isAuthenticated} from '../authBE';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';

const Checkout = ({amount}) => {

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  })

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const username = isAuthenticated() && isAuthenticated().user.name;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) {
        setData({...data, error: data.error})
      } else {
        setData({ clientToken: data.clientToken})
      }
    })
  }

  useEffect(() => {
    getToken(userId, token);
  }, [])

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div className="">{showDropIn()}</div>
    ) : (
      <Link to='/signin'><button className="btn btn-primary">Signin first</button></Link>
    )
  }

  let deliveryAddress = data.address;

  const buy = () => {
    // send the nonce to server
    // nonce = data.instance.requestPaymentMethod()
    let keep;
    let nonce;
    let getNonce = data.instance.requestPaymentMethod().then(data => {
    nonce = data.nonce

    const paymentData = {
      paymentMethodNonce: nonce,
      amount: amount.toFixed(2)
    }
    // send the processed payment to the backend
    processPayment(userId, token, paymentData)
    .then(response => {

      keep = {
        username: username,
        notes: deliveryAddress,
        donated: amount
      }

      axios.post('/.netlify/functions/thanks', keep)

      setData({ ...data, success: true })

    })
    .catch(error => console.log(error))

    })
    .catch(error => {
      setData({...data, error: error.message})
    })
  }

  const handleAddress = (event) => {
    setData({...data, address: event.target.value})
  }

  const showDropIn = () => {
    return (
      <div onBlur = {() => setData({...data, error: ''})} >
        {data.clientToken !== null && amount > 0 ? (
          <div>
            <div className="form-group mb-3">
              <label htmlFor="" className="text-muted">Add a note!: </label>
              <textarea name="" id="" cols="30" rows="4" onChange={handleAddress} className="form-control" value={data.address} placeholder="Thank You! You can add a note here"></textarea>
            </div>
            <DropIn options={{ authorization: data.clientToken }} onInstance={ instance => (data.instance = instance) } />
            <button onClick={buy} className="btn btn-success btn-block">Pay!</button>
          </div>
        ): null}
      </div>
    )
  }

  const showError = (error) => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none' }}>
      {error}
    </div>
  )

  const showSuccess = (success) => (
    <div className="alert alert-info" style={{display: success ? '' : 'none' }}>
      <h3>Payment successful!, Thank You!</h3>
    </div>
  )

  return (<div>
    <h2>Total of: ${ `${amount}` }</h2>

    { showError(data.error) }
    { showSuccess(data.success) }
    {showCheckout()}
  </div>)
}


export default Checkout;
