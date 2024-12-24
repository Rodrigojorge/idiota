import React from 'react';
import { Card } from '../models/card.model';

type GameCardProps = {
    card: Card;
    isOpen: boolean;
    playable?: boolean;
    onClick?: (card:Card) => void;
};

const suits: { [key: string]: JSX.Element } = {
  'HEARTS': (
    <path d="M50 85 C20 50, 20 20, 50 35 C80 20, 80 50, 50 85 Z" fill="red" />
  ),
  'DIAMONDS': (
    <path d="M50 20 L70 50 L50 80 L30 50 Z" fill="red" /> 
  ),
  'CLUBS': (
 <g fill="black">
      <circle cx="50" cy="35" r="10" />
      <circle cx="40" cy="50" r="10" />
      <circle cx="60" cy="50" r="10" />
      <rect x="47" y="50" width="6" height="20" />
      <circle cx="50" cy="65" r="6" />
    </g>  ),
  'SPADES': (
    <g transform="translate(10, -30) scale(0.8)" fill="black">
      <path d="M50 60 C20 90, 20 130, 50 110 C80 130, 80 90, 50 60 Z" />
      <rect x="47" y="110" width="6" height="20" />
      <circle cx="50" cy="130" r="6" />
    </g> ),
};

const GameCard = ({card, isOpen, playable, onClick }: GameCardProps) => {
  const [openState, setOpenState] = React.useState(isOpen);

  
  const renderCardFront = () => (
    <svg width="100" height="150" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <g transform=" scale(0.7)">
        <rect width="100" height="150" rx="10" ry="10" fill="white" stroke="black" />
        <text x="10" y="30" fontSize="22" fill="black">{card.value}</text>
        <text x="90" y="140" fontSize="22" fill="black" textAnchor="end">{card.value}</text>
        <g transform="translate(25, 40) scale(0.5)">
          {suits[card.suit]}
        </g>  
      </g>
    </svg>
  );

  const renderCardBack = () => (
    <svg width="100" height="150" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(0.7)">
        <rect className='plaid-background' width="100" height="150" rx="10" ry="10" fill="blue" stroke="black" />
        <text x="50" y="75" fontSize="32" fill="white" textAnchor="middle" alignmentBaseline="middle">🂠</text>
      </g>
    </svg>
  );

  const renderCardBack1 = () => (
    <div className='plaid-background'></div>
  );

  const handleCardClick = (event: any) => {
    if (!playable) return;
    onClick && onClick(card);
  }

  return (
    <div className={(playable === true ? 'hover:scale-110 hover:cursor-pointer' : '')} onClick={handleCardClick}>
      {openState ? renderCardFront() : renderCardBack()}
    </div>
  );
};
export default GameCard;
