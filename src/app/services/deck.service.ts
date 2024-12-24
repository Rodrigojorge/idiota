import { Card } from "../models/card.model";
import { Deck } from "../models/deck.model";
import { v4 as uuid } from "uuid";

const DECK_ID_REQUIRED = "deckId is required";

const NOT_ENOUGH_CARDS = "Not enough cards";

export class DeckService {
  /**
   *
   * Creates a standard 52-card deck of French playing cards,
   * it includes all thirteen ranks in each of the four suits:
   *  spades (),
   *  clubs (),
   *  diamonds (),
   *  and hearts ().
   *  There is no Joker cards.
   *  It allows the following options to the request:
   *      The deck id (UUID)
   *      The deck properties like shuffled (boolean)
   *      and total cards remaining in this deck (integer)
   *
   * {
   *   "deck_id": "521b0293-01f7-44c2-9990-27079eb2352d",
   *   "shuffled": false,
   *   "remaining": 30
   * }
   *
   * @param deckId
   * @param shuffled
   * @param remaining
   */
  createNewDeck(deckId: string, shuffled: boolean, remaining = 52): Deck {
    const deck = {
      id: deckId ? deckId : uuid(),
      shuffled: shuffled,
      cards: [],
    };

    this.addCards(deck);

    shuffled && this.shuffleDeck(deck);

    //cut the deck to the remaining desired size
    deck.cards = deck.cards.slice(0, remaining);

    return deck;
  }

  private addCards(deck: Deck) {
    ["SPADES", "CLUBS", "DIAMONDS", "HEARTS"].forEach((suit) => {
      const suitCode = suit.charAt(0);

      deck.cards?.push({
        id: deck.id + "-A" + suitCode,
        code: "A" + suitCode,
        suit: suit,
        value: "A",
      });

      for (let i = 2; i <= 10; i++) {
        deck.cards?.push({
          id: deck.id + "-" + i + suitCode,
          code: i + suitCode,
          suit: suit,
          value: i.toString(),
        });
      }

      deck.cards?.push({
        id: deck.id + "-J" + suitCode,
        code: "J" + suitCode,
        suit: suit,
        value: "J",
      });

      deck.cards?.push({
        id: deck.id + "-Q" + suitCode,
        code: "Q" + suitCode,
        suit: suit,
        value: "Q",
      });

      deck.cards?.push({
        id: deck.id + "-K" + suitCode,
        code: "K" + suitCode,
        suit: suit,
        value: "K",
      });
    });
  }

  /**
   * Shuffles a Deck of cards
   *
   * @param deck
   */
  private shuffleDeck(deck: Deck) {
    const shuffledCards = deck.cards?.sort(() => Math.random() - 0.5);
    deck.cards = shuffledCards;
  }

  /**
   * Draw a card(s) of a given Deck, if the deck was not passed over
   * or invalid it should return an error. A count parameter needs to be
   * provided to define how many cards to draw from the deck.
   * The response needs to return a JSON that would include:
   *    All the drawn cards (card object)
   *
   * @param cards
   * @param count
   * @returns
   */
  drawCard(cards: Card[], count = 1): Card[] {
    const cardsDrawn: Card[] = [];

    if (count > cards?.length) {
      throw new Error(NOT_ENOUGH_CARDS);
    }

    let i = 1;
    while (i <= count) {
      const card = cards?.shift();
      if (card != null) cardsDrawn.push(card);

      i++;
    }

    return cardsDrawn;
  }
}
