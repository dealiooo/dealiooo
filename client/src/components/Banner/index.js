import React from 'react';
import Hero from 'react-bulma-components/lib/components/hero';
import Columns from 'react-bulma-components/lib/components/columns/columns';
import header_logo from './header_logo.png';
import Image from 'react-bulma-components/lib/components/image';
import './banner.css';

const Banner = () => {
  return (
    <Hero className="is-small">
      <Hero.Body>
        <Columns className="is-centered">
          <Columns.Column className="is-centered imgSize" offset={null}>
            <div style={{ width: 300 }}>
              <Image className="is-centered" src={header_logo} />
            </div>
          </Columns.Column>
        </Columns>
      </Hero.Body>
    </Hero>
  );
};

export default Banner;
