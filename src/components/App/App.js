import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
  Redirect,
  useParams
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DynamicImport from 'components/DynamicImport/DynamicImport';
import Styles from './App.scss';
import 'babel-polyfill';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/">
            <ContentWrapper />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

const ContentWrapper = () => {
  return (
    <React.Fragment>
      <AuthButton />
      <ToastContainer position="top-right" autoClose={3000} />
      <ul>
        <li>
          <div>Project 1</div>
          <NavLink className={Styles.link} activeClassName={Styles.active} to="/project/1/photos">
            Photos
          </NavLink>
          <NavLink className={Styles.link} activeClassName={Styles.active} to="/project/1/fonts">
            Fonts
          </NavLink>
          <NavLink className={Styles.link} activeClassName={Styles.active} to="/project/1/icons">
            Icons
          </NavLink>
          <NavLink className={Styles.link} activeClassName={Styles.active} to="/project/1/videos">
            Videos
          </NavLink>
        </li>
        <li>
          <div>Project 2</div>
          <NavLink className={Styles.link} activeClassName={Styles.active} to="/project/2/photos">
            Photos
          </NavLink>
          <NavLink className={Styles.link} activeClassName={Styles.active} to="/project/2/fonts">
            Fonts
          </NavLink>
          <NavLink className={Styles.link} activeClassName={Styles.active} to="/project/2/icons">
            Icons
          </NavLink>
          <NavLink className={Styles.link} activeClassName={Styles.active} to="/project/2/videos">
            Videos
          </NavLink>
        </li>
        <li>
          <div>Project 3</div>
          <NavLink className={Styles.link} activeClassName={Styles.active} to="/project/3/photos">
            Photos
          </NavLink>
          <NavLink className={Styles.link} activeClassName={Styles.active} to="/project/3/fonts">
            Fonts
          </NavLink>
          <NavLink className={Styles.link} activeClassName={Styles.active} to="/project/3/icons">
            Icons
          </NavLink>
          <NavLink className={Styles.link} activeClassName={Styles.active} to="/project/3/videos">
            Videos
          </NavLink>
        </li>
      </ul>
      <Switch>
        <PrivateRoute path="/project/:projectId/photos">
          <Photos />
        </PrivateRoute>
        <PrivateRoute path="/project/:projectId/fonts">
          <h2>Fonts</h2>
          <Fonts />
        </PrivateRoute>
        <PrivateRoute path="/project/:projectId/icons">
          <Icons />
        </PrivateRoute>
        <PrivateRoute path="/project/:projectId/videos">
          <Videos />
        </PrivateRoute>
      </Switch>
    </React.Fragment>
  );
};

const Photos = () => {
  const { projectId } = useParams();
  return (
    <div>
      <DynamicImport load={() => import('components/HookTest/HookTest')}>
        {HookTest => (HookTest === null ? <p>Loading</p> : <HookTest />)}
      </DynamicImport>
    </div>
  );
};

const Videos = () => {
  const { projectId } = useParams();
  return (
    <div>
      <h2>Videos</h2>
      <div>{projectId}</div>
    </div>
  );
};

const Fonts = () => {
  const { projectId } = useParams();
  return (
    <div>
      <DynamicImport load={() => import('components/Gallery/Gallery')}>
        {Gallery => (Gallery === null ? <p>Loading</p> : <Gallery />)}
      </DynamicImport>
    </div>
  );
};

const Icons = () => {
  const { projectId } = useParams();
  return (
    <div>
      <h2>Icons</h2>
      <div>{projectId}</div>
    </div>
  );
};

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = () => {
  const history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      <button
        type="button"
        onClick={() => {
          fakeAuth.signout(() => history.push('/'));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
};

const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };
  const login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <button type="button" onClick={login}>
        Log in
      </button>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  return (
    <Route
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default App;
