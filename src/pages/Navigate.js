import { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../authBE';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' }
  }
};


const Navigate = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs" style={{"backgroundColor": "indigo", "marginBottom": "-1px"}}>
        <li className="nav-item">
          <Link className="nav-link" style= {isActive(history, '/')} to="/">Home</Link>
        </li>

        { isAuthenticated() && isAuthenticated().user.role === 0 && (<li className="nav-item">
            <Link className="nav-link" style= {isActive(history, '/upload')} to="/upload">Upload</Link>
          </li>) }

        <li className="nav-item">
          <Link className="nav-link bg-alert" style= {isActive(history, '/saviour')} to="/saviour">Our Saviour</Link>
        </li>

        { isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link className="nav-link" style= {isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
          </li>

        ) }

        { isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link className="nav-link" style= {isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
          </li>

        ) }

        { !isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link" style= {isActive(history, '/signup')} to="/signup">Signup</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style= {isActive(history, '/signin')} to="/signin">Signin</Link>
            </li>
          </Fragment>

        ) }

        {/* as you can see you can decide to use fragment or an empty enclosing tag */}

        { isAuthenticated() && (
          <>
            <li className="nav-item">
              <span className="nav-link" style= {{ cursor: "pointer", color: "#ffffff" }} onClick = { () => signout(() => { history.push('/') }) } >Signout</span>
            </li>
          </>

        ) }

      </ul>
    </div>
  )
}

export default withRouter(Navigate);
