import React from 'react';
import Hero from 'react-bulma-components/lib/components/hero';
import Columns from 'react-bulma-components/lib/components/columns/columns';
import header_logo from './header_logo.png';
import Image from 'react-bulma-components/lib/components/image';

const Banner = () => {
  return (
    <Hero size="fullwidth" className="is-success">
      <Hero.Body>
        <Columns className="is-centered">
          <Columns.Column className="is-centered" size="3" offset="0">
            <div style={{ width: 300 }}>
              <Image src={header_logo} size="5by2" />
            </div>
          </Columns.Column>
        </Columns>
      </Hero.Body>
    </Hero>
  );
};

export default Banner;
