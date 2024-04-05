import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./component/Login.js"
import Home from "./screens/Home.jsx"
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

        {/* <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path="/logout" element={<Logout />} />
        </Route>

        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path='/' element={<Home />} />
        </Route>

        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path="/enrollment/:courseId" element={<EnrollmentScreen />} />
        </Route>

        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path="/payment/:courseId" element={<PaymentScreen />} />
        </Route>

        <Route exact path='/' element={<PrivateRoute />}>
          <Route path="/course/:courseId" element={<CourseLandingScreen />} />
        </Route> */}

        <Route element={<PrivateRoute />}>
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path="/enrollment/:courseId" element={<EnrollmentScreen />} />
          <Route exact path="/payment/:courseId" element={<PaymentScreen />} />
          <Route path="/course/:courseId" element={<CourseLandingScreen />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;