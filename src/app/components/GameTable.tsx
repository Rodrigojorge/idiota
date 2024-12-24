import React, { useState } from 'react';
import { Card } from '../models/card.model';
import GameCard from './GameCard';
import { Deck } from '../models/deck.model';

interface GameTableProps {
    children?: React.ReactNode[];
    cardsDeck?: Card[];
    onCardsDeckClick?: (card: Card) => void;
    discardedDeck?: Card[];
    onDiscardedDeckClick?: (card: Card) => void;

}

const GameTable = (gameTableProps: GameTableProps) => {
    const handleCardsDeckClick = (card: Card) => {
        console.log("  clicked: " + card.code);
        gameTableProps.onCardsDeckClick && gameTableProps.onCardsDeckClick(card);
    }

    const handleDiscardedDeckClick = (card: Card) => {
        console.log("discardedDeck clicked: " + card.code);
        gameTableProps.onDiscardedDeckClick && gameTableProps.onDiscardedDeckClick(card);
    }

    const moveCardToDiscarded = (card: Card) => {
        console.log("Deck clicked: " + card.code);
        if (gameTableProps?.discardedDeck?.length === 0) {
            console.log("discardedDeck clicked: " + card.code);
        }
    }


    const positions = ["-left-[150px] -top-[150px]", "-top-[150px] -right-[150px]", "bottom-10 -left-[150px]", "bottom-10 -right-[150px]"];
    return (
        <div className="relative box-border w-[900px] h-[300px] m-[200px] p-[32px] border-[32px] border-black rounded-full  bg-gradient-to-r from-green-800 from-5% via-black-800 via-50% to-green-800 to-95%" >
            {gameTableProps?.children?.map((child, i, array) => (
                <div key={i} className={"absolute " + positions[i]} >
                    {child}
                </div>
            ))}
            <div className="absolute left-[250px] top-[75px]">
                {gameTableProps.cardsDeck?.map((card: Card, index: number) => (
                    //pile game cards on above the other
                    <div className="absolute grid grid-cols-4 justify-center" key={card.id} >
                        <GameCard card={card} isOpen={true} onClick={handleCardsDeckClick} playable={true} />
                    </div>
                ))}
            </div>
            <div className="absolute left-[450px] top-[75px]">
                {gameTableProps.discardedDeck?.map((card: Card, index: number) => (
                    //pile game cards on above the other
                    <div className="absolute grid grid-cols-4 justify-center" key={card.id} >
                        <GameCard card={card} isOpen={true} onClick={handleDiscardedDeckClick} />
                    </div>
                ))}
            </div>
        </div>

    );
};

export default GameTable;
