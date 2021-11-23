import Add from "./modals/Add";
import Card from "components/Card";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ColName } from "types/board";
import style from "./Board.module.scss";
import add from "./media/add.png";

const columns: {
  id: ColName;
  name: string;
}[] = [
  {
    id: "todo",
    name: "Сделать",
  },
  {
    id: "inProgress",
    name: "В прогрессе",
  },
  {
    id: "completed",
    name: "Завершено",
  },
];

const Board = () => {
  const { cards, isModalShow } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  return (
    <div>
      {isModalShow && <Add />}

      <img
        className={style.add}
        src={add}
        onClick={() => dispatch({ type: "BOARD_SHOW_MODAL", state: true })}
      />

      <DragDropContext
        onDragEnd={(result) => dispatch({ type: "BOARD_CARD_DND", result })}
      >
        <div className={style.board}>
          {columns.map((col) => (
            <Droppable key={col.id} droppableId={col.id}>
              {(provided) => (
                <div
                  className={style.col}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className={style.header}>{col.name}</div>
                  {cards[col.id].map((card, index) => (
                    <Draggable
                      key={card.id}
                      index={index}
                      draggableId={card.id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            marginTop: "2vh",
                            willChange: "transform",
                          }}
                        >
                          <Card {...card} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
