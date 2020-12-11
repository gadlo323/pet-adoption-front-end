import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navhome from "./components/navhome";
import Welcoming from "./components/welcoming";
import Footer from "./components/footer";
import Swiperimg from "./components/swiperimg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navhome />
      <Welcoming />
      <Swiperimg />
      <Footer />
    </div>
  );
}

export default App;
