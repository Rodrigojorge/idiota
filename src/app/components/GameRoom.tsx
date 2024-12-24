"use client";

import { insertCoin, isHost, isStreamScreen, myPlayer, onPlayerJoin, PlayerState, RPC, setState, useMultiplayerState, usePlayersList, usePlayersState, waitForState } from "playroomkit";
import { useCallback, useEffect, useState } from "react";
import { Card } from "../models/card.model";
import { DeckService } from "../services/deck.service";
import GameTable from "./GameTable";
import Player from "./Player";


type GameState = {
  cards: Card[];
  discardedCards: Card[];
  players?: PlayerState[];
  currentPlayer?: PlayerState;
};
enum PLAYER_STATES {
  HIDDEN_CARDS = "HIDDEN_CARDS",
  TOP_CARDS = "TOP_CARDS",
  HAND_CARDS = "HAND_CARDS",
  MY_TURN = "MY_TURN",
  CARD_PLAYED = "CARD_PLAYED"

}
const TOTAL = 20;

const initialState: GameState = { cards: [], discardedCards: [] };
const cardsService = new DeckService();

export default function GameRoom() {
  const players = usePlayersList(true);
  //const playersState = usePlayersState();
  const [gameState, setGameState] = useMultiplayerState<GameState>('gameState', initialState);

  //const [cards, setCards] = useMultiplayerState('cards', [] as Card[]);
  //const [discardedCards, setDiscardedCards] = useMultiplayerState('discardedCards', [] as Card[]);
  //const cardsPlayed = usePlayersState(PLAYER_STATES.CARD_PLAYED);

  const getDiscardedCards = useCallback(() => {
    return gameState.discardedCards;
  }, [gameState.discardedCards]);

  const getCards = useCallback(() => {
    return gameState.cards;
  }, [gameState.cards]);

  const updateGameState = useCallback((value: Partial<GameState>) => {
    setGameState({ ...gameState, ...value });
  }, [gameState, setGameState]);

  const discardCard = useCallback((card: Card) => {
    const newDiscardedCards = [...gameState.discardedCards, card];
    //setGameState({ ...gameState, discardedCards: newDiscardedCards }, true);
    updateGameState({ discardedCards: newDiscardedCards });
  }, [gameState.discardedCards, updateGameState]);

  const removeCardDeck = (card: Card) => {
    console.log(`quantity of cards: ${gameState.cards.length}`);
    const newCards = gameState.cards.filter((c) => c.id !== card.id);
    console.log(`final quantity of cards: ${newCards.length}`);
    //setGameState({ ...gameState, cards: newCards }, true);
    updateGameState({ cards: newCards });
    discardCard(card);
  };




  useEffect(() => {
    async function setGame() {
      await insertCoin({
        matchmaking: true,
        skipLobby: true
      });//{ streamMode: true }




      //setGameState(await waitForState('gameState'));

      onPlayerJoin(async (p) => {
        console.log(`${p.getProfile().name} joined the game`);
        if (isHost()) {

          const deck = cardsService.createNewDeck("deck-1", true);
          deck.cards = deck.cards.concat(cardsService.createNewDeck("deck-2", true).cards);
          //gameState.cards = deck.cards
          setGameState({ cards: deck.cards, discardedCards: [] }, true);
          //setGameState(gameState);
          console.log("I'm the host1");
          //setState("cards", deck.cards);
          //p.setState(PLAYER_STATES.MY_TURN, true);
          //setState("gameState", initialState)

          p.setState(PLAYER_STATES.MY_TURN, true);

        }
        const gameSet = await waitForState<GameState>('gameState');
        if (gameSet?.cards && gameSet.cards.length > 0) {
          console.log("dealing..");
          p.setState(PLAYER_STATES.HIDDEN_CARDS, cardsService.drawCard(gameSet.cards, 3), true);
          p.setState(PLAYER_STATES.TOP_CARDS, cardsService.drawCard(gameSet.cards, 3), true);
          p.setState(PLAYER_STATES.HAND_CARDS, cardsService.drawCard(gameSet.cards, 11), true);
          //p.setState(PLAYER_STATES.MY_TURN, false);
          //nextPlayer();
        }
        //}

        //}

      });
    }



    setGame();

    RPC.register('cardTurned', async (data: any, caller: PlayerState) => {
      console.log(`Player ${caller.getProfile().name} turned ${data.card.code} !`);


      //\\caller.setState(PLAYER_STATES.CARD_PLAYED, data.card, true);
      removeCardDeck(data.card);
      //nextPlayer();
      //cardPlayed(data.card, caller);
      //players[data.victimId].setState("dead", true);
    });
  }, []);





  useEffect(() => {
    if (isHost()) {
      const cardPlayed = players
        .filter((jogador) => jogador.getState(PLAYER_STATES.CARD_PLAYED) != null)
        .map((jogador) => {
          return {
            player: jogador,
            state: jogador.getState(PLAYER_STATES.CARD_PLAYED)
          };
        });
      /* mensagensPendentes.forEach((mensagemPendente) => {
         novoGameState.conteudoChat += `${mensagemPendente.player.getProfile().name}: ${mensagemPendente.mensagem} \n`;
         mensagemPendente.player.setState(MENSAGEM_PENDENTE, null, true);
       });*/
      //const cardPlayed = cardsPlayed.filter((play) => play.state != null);
      console.log('click host');

      //console.log("cardPlayed" + cardPlayed);
      console.dir(cardPlayed);
      if (cardPlayed.length != 0 && cardPlayed[0].state != null) {
        console.log("jogada pendente ");
        console.log(cardPlayed[0].state.id);
        const newDiscarded = [...gameState.discardedCards];//, cardPlayed[0].state
        console.log("cards.length: " + gameState.cards.length);
        const filteredCards = gameState.cards?.filter((c: Card) => c.id != cardPlayed[0].state.id);
        console.log("filteredCards.length: " + filteredCards.length);
        //cardPlayed[0].player.setState(PLAYER_STATES.MY_TURN, false);
        //nextPlayer();
        //setCards(filteredCards, true);
        //setDiscardedCards(newDiscarded, true);
        cardPlayed[0].player.setState(PLAYER_STATES.CARD_PLAYED, null, true);
        const newGameState = { ...gameState, cards: filteredCards, discardedCards: newDiscarded };

        setGameState(newGameState, true);
      }
    }
  }
    , [gameState, players, setGameState]);

  const drawClosedCards = (gameState: GameState) => {

  }

  const handleCardClick = (card: Card) => {
    console.log("Card clicked: " + card.code);
    /* const cards = gameState.deck?.cards?.filter((c: Card) => c.code === card.code)
    console.log(cards.length);
     setGameState({
      ...gameState
    }, true);
    */
  }

  const handleCardsDeckClick = (card: Card) => {
    // console.log("Deck clicked: " + card.code);

    //nextPlayer();
    RPC.call('cardTurned', { card }, RPC.Mode.HOST);
    //nextPlayer();
  }

  const getPlayers = useCallback(() => {
    return players;
  }, [players]);

  const nextPlayer = () => {
    if (isHost()) {
      //console.log("playerTurnIndex: " + playerTurnIndex);

      console.log("players: " + players);
      // const nextPlayerIndex = (playerTurnIndex + 1) % players.length;
      //setPlayerTurnIndex(nextPlayerIndex, true);
      //console.log("nextPlayerIndex: " + nextPlayerIndex);
      //players[nextPlayerIndex].setState(PLAYER_STATES.MY_TURN, true);
    }

  }

  /*const getCards = useCallback(() => {
    return cards;
  },[cards]);

  const getDiscardedCards = useCallback(() => {
    return discardedCards;
  },[discardedCards]);
  */
  return myPlayer()?.id ? (
    <main>
      <div className="flex grid bg-gray-800 justify-center">
        <h1>Hello: {myPlayer()?.getProfile().name} - {gameState.cards?.length} </h1>

        <GameTable cardsDeck={gameState.cards} onCardsDeckClick={handleCardsDeckClick} discardedDeck={gameState.discardedCards} >
          {players.map((p) => (
            <Player key={p.id}
              name={p.getProfile().name}
              image={p.getProfile().photo}
              isMe={p.id === myPlayer()?.id}
              isPlayerTurn={p.getState(PLAYER_STATES.MY_TURN)}
              hiddenCards={p.getState(PLAYER_STATES.HIDDEN_CARDS)}
              topCards={p.getState(PLAYER_STATES.TOP_CARDS)}
              handCards={p.getState(PLAYER_STATES.HAND_CARDS)}
            />
          ))}
        </GameTable>

        {isStreamScreen() ? (
          <div>streammode</div>
        ) : (
          <div>not streammode</div>
        )}
        {/*  <form action={handleDealClick}> */}
        {/*           <input type="number" min={0} max={gameState?.count} name="quantidade" />
  */}         {/*  <button type="submit">Deal</button> */}
        {/*  </form> */}
      </div>

    </main>
  )
    : //Loading
    (<div className="flex h-screen w-screen items-center justify-center bg-gray-800">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>)

}
