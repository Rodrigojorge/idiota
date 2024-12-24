import React from 'react';
import { Card } from '../models/card.model';
import GameCard from './GameCard';
import Image from 'next/image';

interface PlayerProps {
    name: string;
    image: string;
    isMe:boolean;
    isPlayerTurn: boolean;
    hiddenCards: Card[];
    topCards: Card[];
    handCards: Card[];
}

const Player = (playerProps:PlayerProps) => {
//relative items-center grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
//className="relative grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-11 xl:gap-x-8"
    return (
        <div>
            <div className='h-8 w-64'>
                <div className={'relative grid grid-cols-2 m-4  '}>
                    <div className={(playerProps.isPlayerTurn ? ' border-2 rounded-lg ring-offset-2 ring-2 border-gray-700':'')}>
                        <Image src={playerProps?.image} alt={playerProps?.name + ' image'} width={50} height={50} />
                        <h1>
                            {playerProps?.name}
                        </h1> 
                    </div>
                    <div className="relative grid grid-cols-11 justify-center border-1">
                        {playerProps?.handCards?.map((card: Card, index: number) => (
                            <GameCard key={card.id} card={card} isOpen={playerProps?.isMe} playable={playerProps?.isPlayerTurn} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="relative grid grid-cols-3 justify-center border-1">
                <div className="absolute top-10 left-0 grid grid-cols-3 justify-center">
                    {playerProps?.hiddenCards?.map((card: Card, index: number) => (
                        <GameCard key={card.id} card={card} isOpen={false} playable={playerProps?.isPlayerTurn && (playerProps?.topCards?.length === 0)} />
                    ))}
                </div>
                <div className="absolute top-10 left-0 grid grid-cols-3 justify-center p-1">
                    {playerProps?.topCards?.map((card: Card, index: number) => (
                        <GameCard key={card.id} card={card} isOpen={true} playable={playerProps?.isPlayerTurn && (playerProps?.handCards?.length === 0)} />
                    ))}
                </div>    
            </div>
            {/* <div className="relative grid grid-cols-11 justify-center">
                {playerProps?.handCards?.map((card: Card, index: number) => (
                    <GameCard key={card.code} number={card.value} suit={card.suit} isOpen={playerProps.isMe} />
                ))}
            </div> */}
        </div>
    );
};

export default Player;
