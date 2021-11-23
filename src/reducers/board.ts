import { DropResult } from "react-beautiful-dnd";
import { ICard, ColName } from "types/board";

type CartActions = [
  {
    type: "BOARD_CARD_ADD";
    card: ICard;
  },
  {
    type: "BOARD_CARD_DND";
    result: DropResult;
  },
  {
    type: "BOARD_CARD_REMOVE";
    cardId: string;
  },
  {
    type: "BOARD_SHOW_MODAL";
    state: boolean;
  }
];

interface ICartState {
  cards: {
    [key in ColName]: ICard[];
  };
  isModalShow: boolean;
}

const initial: ICartState = {
  isModalShow: false,
  cards: {
    completed: [],
    inProgress: [],
    todo: [],
  },
};

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  source: any[],
  destination: any[],
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = [...source];
  const destClone = [...destination];
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: any } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const saveToLocalStorage = (state: ICartState) => {
  localStorage.setItem("cards", JSON.stringify(state.cards));
};

const loadInitial = (): ICartState => {
  let json = localStorage.getItem("cards");
  if (json) {
    const cards = <ICartState["cards"]>JSON.parse(json);
    return {
      ...initial,
      cards,
    };
  } else {
    return initial;
  }
};

const reducer = (
  state = loadInitial(),
  action: ArrayElements<CartActions>
): ICartState => {
  switch (action.type) {
    case "BOARD_CARD_REMOVE": {
      const cards: ICartState["cards"] = {
        completed: state.cards.completed.filter((x) => x.id !== action.cardId),
        inProgress: state.cards.inProgress.filter(
          (x) => x.id !== action.cardId
        ),
        todo: state.cards.todo.filter((x) => x.id !== action.cardId),
      };

      const nstate = {
        ...state,
        cards,
      };

      saveToLocalStorage(nstate);
      return nstate;
    }
    case "BOARD_SHOW_MODAL": {
      return {
        ...state,
        isModalShow: action.state,
      };
    }
    case "BOARD_CARD_ADD": {
      const nstate = {
        ...state,
        cards: {
          ...state.cards,
          todo: [...state.cards.todo, action.card],
        },
      };

      saveToLocalStorage(nstate);
      return nstate;
    }

    case "BOARD_CARD_DND": {
      const { source, destination } = action.result;
      if (!destination) return state;

      if (source.droppableId === destination.droppableId) {
        state.cards[source.droppableId as ColName] = reorder(
          state.cards[source.droppableId as ColName],
          source.index,
          destination.index
        );
      } else {
        const result = move(
          state.cards[source.droppableId as ColName],
          state.cards[destination.droppableId as ColName],
          source,
          destination
        );

        state.cards[source.droppableId as ColName] = result[source.droppableId];
        state.cards[destination.droppableId as ColName] =
          result[destination.droppableId];
      }

      const nstate = {
        ...state,
        cards: {
          ...state.cards,
        },
      };

      saveToLocalStorage(state);
      return nstate;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
