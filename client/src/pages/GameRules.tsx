import React from 'react';

import { AppNavBar } from '../components/organisms';
import { Root, Container } from '../components/layouts';
import RuleBook from '../components/organisms/RuleBook';
import ScrollBar from 'react-perfect-scrollbar';

export default function() {
  return (
    <Root>
      <AppNavBar />
      <ScrollBar>
        <Container paddingOnTablets>
          <RuleBook />
        </Container>
      </ScrollBar>
    </Root>
  );
}
