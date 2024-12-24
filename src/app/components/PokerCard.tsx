import React from 'react';

type GameCardProps = {
    number: string;
    suit: string;
    isOpen: boolean;
};

const suits: { [key: string]: JSX.Element } = {
  '♥': (
    <path d="M50 20 C55 30, 70 40, 50 70 C30 40, 45 30, 50 20 Z" fill="red" />
  ),
  '♦': (
    <path d="M50 20 L70 50 L50 80 L30 50 Z" fill="red" />
  ),
  '♣': (
    <path d="M50 60 C40 60, 40 80, 50 80 C60 80, 60 60, 50 60 M50 50 C40 50, 40 40, 50 40 C60 40, 60 50, 50 50 M40 30 C30 30, 30 40, 40 40 C50 40, 50 30, 40 30 M60 30 C50 30, 50 40, 60 40 C70 40, 70 30, 60 30" fill="black" />
  ),
  '♠': (
    <path d="M50 20 C40 35, 35 50, 50 70 C65 50, 60 35, 50 20 Z M40 55 C35 60, 30 60, 30 70 C30 75, 40 80, 50 80 C60 80, 70 75, 70 70 C70 60, 65 60, 60 55 C55 50, 45 50, 40 55 Z" fill="black" />
  ),
};

const PokerCard = ({ number, suit, isOpen }:GameCardProps) => {
  const renderCardFront = () => (
    <svg width="100" height="150" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="150" rx="10" ry="10" fill="white" stroke="black" />
      <text x="10" y="20" fontSize="16" fill="black">{number}</text>
      <text x="90" y="140" fontSize="16" fill="black" textAnchor="end">{number}</text>
      <g transform="translate(50, 75)">
        {suits[suit]}
      </g>
    </svg>
  );

  const renderCardBack = () => (
    <svg width="100" height="150" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="25%" stopColor="transparent" />
        <stop offset="25%" stopColor="dodgerblue" />
        <stop offset="50%" stopColor="dodgerblue" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
      <linearGradient id="gradient2" x1="0" y1="0" x2="1" y2="-1" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="25%" stopColor="transparent" />
        <stop offset="25%" stopColor="tomato" />
        <stop offset="50%" stopColor="tomato" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
      <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="25%" stopColor="transparent" />
        <stop offset="25%" stopColor="gold" />
        <stop offset="50%" stopColor="gold" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    
    <rect width="100" height="150" fill="url(#gradient1)" />
    <rect width="100" height="150" fill="url(#gradient2)" />
    <rect width="100" height="150" fill="url(#gradient3)" />
  </svg>
  );

  return (
    <div>
      {isOpen ? renderCardFront() : renderCardBack()}
    </div>
  );
};

export default PokerCard;
