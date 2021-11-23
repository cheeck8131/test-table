import { ICard } from "types/board";
import styles from "./Card.module.scss";
import m from "moment";
import "moment/locale/ru";
import { useAppDispatch } from "hooks/useAppDispatch";

const toLocaleTime = (date: string) => m(date).locale("ru").calendar();

const Card = ({ name, description, creationTime, id }: ICard) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.card}>
      <div className={styles.header}>{name}</div>
      <div>{description}</div>
      <div className={styles.bottom}>
        <div onClick={() => dispatch({ type: "BOARD_CARD_REMOVE", cardId: id })}>Удалить</div>
        <div>{toLocaleTime(creationTime)}</div>
      </div>
    </div>
  );
};

export default Card;
