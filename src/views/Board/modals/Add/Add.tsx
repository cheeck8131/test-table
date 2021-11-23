import { useAppDispatch } from "hooks/useAppDispatch";
import { useState } from "react";
import style from "./Add.module.scss";
import { v4 as uuid } from "uuid";

const Add = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [description, setDesc] = useState("");

  return (
    <div className={style.add}>
      <div>
        <h1>Добавление новой карточки</h1>
        <p>Название</p>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        <p>Описание</p>
        <input
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        ></input>
        <button
          onClick={() => {
            if (name.trim().length === 0) return;

            dispatch({ type: "BOARD_SHOW_MODAL", state: false });

            dispatch({
              type: "BOARD_CARD_ADD",
              card: {
                creationTime: new Date().toUTCString(),
                description,
                name,
                id: uuid(),
              },
            });
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
};

export default Add;
