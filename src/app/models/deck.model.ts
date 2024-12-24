import { Card } from "./card.model";

export type Deck = {
  id: string;
  shuffled: boolean;
  cards: Card[];
};
