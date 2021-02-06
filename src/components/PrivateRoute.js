import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../redux/auth/authSelectors';

const PrivateRoute = ({ children, ...routeProps }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to="/login" />}
    </Route>
  );
};

export default PrivateRoute;
