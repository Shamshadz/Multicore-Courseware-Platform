import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./component/Login.js"
import Home from "./screens/Home.js"
import Logout from "./component/Logout.js"
import Navigation from "./component/Navigation.js"
import EnrollmentScreen from './screens/EnrollmentScreen/EnrollmentScreen.jsx';
import PaymentScreen from './screens/PaymentScreen/PaymentScreen.jsx';
import CourseLandingScreen from './screens/CourseLandingScreen/CourseLandingScreen.jsx';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen.jsx';
import PrivateRoute from './component/Routing/PrivateRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpScreen />} />

        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path="/logout" element={<Logout />} />
        </Route>

        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path='/home' element={<Home />} />
        </Route>

        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path="/enrollment" element={<EnrollmentScreen />} />
        </Route>

        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path="/payment" element={<PaymentScreen />} />
        </Route>

        <Route exact path='/' element={<PrivateRoute />}>
          <Route path="/course" element={<CourseLandingScreen />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;