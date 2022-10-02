import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
// import './App.css';
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/main/Navbar";
import Dashboard from "./pages/Dashboard";



function App() {

  return (
    <div className="App">
      <NavBar></NavBar>
      <Container fluid className="bg-light mb-2 ml-2 mr-2" style={{ minHeight: "99vh" }}>

        <Routes>
          <Route path="/signup" element={<SignUpForm />} >  </Route>
          <Route path="/login" element={<LoginForm />} >  </Route>
          <Route path="/" element={<Dashboard />} >  </Route>
        </Routes>
      </Container>
    </div >
  );
}

export default App;
