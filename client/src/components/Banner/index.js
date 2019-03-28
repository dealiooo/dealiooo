import React from "react";
import Heading from "react-bulma-components/lib/components/heading";
import Columns from "react-bulma-components/lib/components/columns/columns";
import Hero from "react-bulma-components/lib/components/hero";

import "./banner.css";

const Banner = () => {
  return (
    <Hero className="is-small">
      <Hero.Body>
        <Columns className="is-centered">
          <Columns.Column
            className="is-centered has-text-centered"
            offset={null}
          >
            <img
              src={process.env.PUBLIC_URL + `/logo.png`}
              alt="logo"
              width="320"
            />
            <Heading className="is-center has-text-centered" subtitle size={3}>
              dare to deal
            </Heading>
          </Columns.Column>
        </Columns>
      </Hero.Body>
    </Hero>
  );
};

export default Banner;
