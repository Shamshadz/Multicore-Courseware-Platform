import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./component/Login.js"
import Home from "./screens/Home.js"
import Logout from "./component/Logout.js"
import Navigation from "./component/Navigation.js"
import EnrollmentScreen from './screens/EnrollmentScreen/EnrollmentScreen.jsx';
import PaymentScreen from './screens/PaymentScreen/PaymentScreen.jsx';
import CourseLandingScreen from './screens/CourseLandingScreen/CourseLandingScreen.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/enrollment" element={<EnrollmentScreen />} />
        <Route path="/Payment" element={<PaymentScreen />} />
        <Route path="/course" element={<CourseLandingScreen />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;