import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import PrivateRoute from './authBE/PrivateRoutes';
import AdminRoute from './authBE/AdminRoutes';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Detail from './pages/Detail';
import Upload from './pages/Upload';
import Saviour from './pages/Saviour';
import Dashboard from './auth/UserDashboard';
import Profile from './auth/Profile';
import AdminDashboard from './auth/AdminDashboard';
import Manage from './auth/Manage';



const Routes = () => {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/upload" exact component={Upload} />
            <Route path="/saviour" exact component={Saviour} />
            <Route path="/detail/:detailId" exact component={Detail} />
            <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/profile/:userId" exact component={Profile} />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            <AdminRoute path="/admin/manage" exact component={Manage} />

          </Switch>
        </BrowserRouter>
    )
}

export default Routes;
