import React from 'react';

import { MainNavbar, RuleBook } from '../sections';
import { Root, Container } from '../layouts';
import { ScrollBar } from '../components';

const GameRulesPage: React.FC = props => {
  return (
    <Root>
      <MainNavbar />
      <ScrollBar>
        <Container>
          <RuleBook />
        </Container>
      </ScrollBar>
    </Root>
  );
};

export default GameRulesPage;
