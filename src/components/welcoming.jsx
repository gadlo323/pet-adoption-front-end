import React from "react";
import "./welcoming.css";
const Welcoming = () => {
  return (
    <section id="home-section">
      <div className="hero">
        <div className="img-details">
          <img src="./adopet-hero.jpg" alt="adopet" />
        </div>
        <div className="details-info">
          <h1 className="head-line">
            Welcome and hope you find the friend that works best for you.
          </h1>
          <p>
            By taking home a dog adoption from a rescue or a shelter, not only
            are you saving that pet, you're either making room in the rescue so
            they can save another pet from a shelter, or making room at the
            shelter itself. As you can see, dog adoption is truly a continuous
            cycle of saving lives, and it's the humane thing to do! Thank you
            for considering dog adoption, and please help us debunk the myth of
            homeless pets in the future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Welcoming;
