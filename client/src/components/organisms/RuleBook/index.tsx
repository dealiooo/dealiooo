import React from 'react';
import styled from 'styled-components';
import { Link as AnchorLink } from 'styled-icons/boxicons-regular/Link';

import rules from './rules';
import { space, fontSize, fontWeight, lineHeight } from '../../../styles';
import { Link, CenterInline } from '../../atoms';
import { HashLink } from 'react-router-hash-link';

// TODO:
// (1) Better rule descriptions
// (2) Rules should be categorized and graphical
// (3) Game layout and description
// (4) More rules

export default function() {
  return (
    <>
      {Object.keys(rules).map(ruleKey => {
        return (
          <Section id={ruleKey} key={ruleKey}>
            <Rule>
              <RuleTitle left>{ruleKey}</RuleTitle>
              <RuleLink as={HashLink} to={`#${ruleKey}`}>
                <AnchorLink size="20" />
              </RuleLink>
            </Rule>
            <Points>
              {rules[ruleKey].map((rule, index) => (
                <Point key={index}>{rule}</Point>
              ))}
            </Points>
          </Section>
        );
      })}
    </>
  );
}

const Section = styled.section`
  padding: ${space.large};
`;

const RuleLink = styled(Link)`
  color: ${({ theme }) => theme.secondary};
  visibility: hidden;
`;

const Rule = styled.div`
  &:hover ${RuleLink} {
    visibility: visible;
  }
`;

const RuleTitle = styled(CenterInline)`
  font-size: ${fontSize.large};
  font-weight: ${fontWeight.bold};
  color: ${({ theme }) => theme.secondaryLight};
`;

const Point = styled.li`
  color: ${({ theme }) => theme.textLight};
`;

const Points = styled.ul`
  padding: ${space.large} ${space.large} ${space.large} 0;
  list-style: circle;
  line-height: ${lineHeight.large};

  > ${Point} + ${Point} {
    margin-top: ${space.large};
  }
`;
