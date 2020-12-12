import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navhome from "./components/homepage/navhome";
import Welcoming from "./components/homepage/welcoming";
import Footer from "./components/homepage/footer";
import Swiperimg from "./components/homepage/swiperimg";
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
