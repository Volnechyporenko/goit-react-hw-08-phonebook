import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router';
import RegisterView from './Views/RegisterView/RegisterView';
import LoginView from './Views/LoginView/LoginView';
import Phonebook from './Views/Phonebook/Phonebook';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import authOperation from '../redux/auth/authOperation';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperation.fetchRefreshUser());
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" />

        <PublicRoute path="/register" restricted>
          <RegisterView />
        </PublicRoute>

        <PublicRoute path="/login" restricted>
          <LoginView />
        </PublicRoute>

        <PrivateRoute path="/contacts">
          <Phonebook />
        </PrivateRoute>
      </Switch>
    </div>
  );
};

export default App;
