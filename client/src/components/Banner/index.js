import React from "react";

const Banner = () => {
  return (
    <section className="hero is-small">
      <div className="hero-body">
        <div className="is-centered columns is-multiline">
          <div className="is-centered has-text-centered column">
            <img src="/logo.png" alt="logo" width="320" />
            <h1 className="is-center has-text-centered subtitle is-3">
              dare to deal
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
