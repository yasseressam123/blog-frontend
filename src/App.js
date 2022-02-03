import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Home from './pages/home/home';
import BlogPage from './pages/blogPage/blogPage';





function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route path="/post/:id" element={<BlogPage/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
