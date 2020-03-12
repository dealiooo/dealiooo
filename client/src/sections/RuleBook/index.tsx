import React from 'react';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';
import { Link as AnchorLink } from '@styled-icons/boxicons-regular/Link';

import rules from './rules';
import * as S from './style';

const RuleBook: React.FC = props => (
  <div {...props}>
    {Object.keys(rules).map(key => {
      return (
        <S.Section id={key} key={key}>
          <S.Rule>
            <S.Title left>{key}</S.Title>
            <S.Link as={HashLink} to={`#${key}`}>
              <AnchorLink size="20" />
            </S.Link>
          </S.Rule>
          <S.Points>
            {rules[key].map((rule, index) => (
              <S.Point key={index}>{rule}</S.Point>
            ))}
          </S.Points>
        </S.Section>
      );
    })}
  </div>
);

export default styled(RuleBook)``;
