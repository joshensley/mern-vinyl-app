import React, { Fragment, useEffect } from 'react';
import NavBarTop from './components/layout/NavbarTop';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AlertComponent from './components/layout/AlertComponent';
import Dashboard from './components/dashboard/Dashboard';
import Users from './components/displayVinylInformation/UsersDisplay/Users';
import Artist from './components/displayVinylInformation/ArtistDisplay/Artist';
import Albums from './components/displayVinylInformation/AlbumsDisplay/Albums';
import Songs from './components/displayVinylInformation/SongsDisplay/Songs';
import vinylForms from './components/vinylForms/vinylForms';
import CreateProfile from './components/profileForm/CreateProfile';
import EditProfile from './components/profileForm/EditProfile';
import EditUserAvatar from './components/editUserInformation/EditUserAvatar';
import Posts from './components/posts/Posts';
import Comments from './components/posts/Comments';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import {
  BrowserRouter as Router,
  Switch,
  Route 
}  from 'react-router-dom';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBarTop />
          <AlertComponent />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/artist/:id" component={Artist} />
            <Route exact path="/albums/:userId/:artistId" component={Albums} />
            <Route exact path="/songs/:userId/:artistId/:albumId" component={Songs} />
            <Route exact path="/users" component={Users} />
            <PrivateRoute exact path="/avatar" component={EditUserAvatar} />
            <PrivateRoute exact path="/forms" component={vinylForms} />
            <PrivateRoute exact path="/posts/:userId" component={Posts} />
            <PrivateRoute exact path="/comments/:postId" component ={Comments} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
