import styled from 'styled-components';

type CardProps = { cardId: number };
export const Card = styled.div.attrs<CardProps>(props => ({ 'data-card-id': props.cardId }))<CardProps>``;
