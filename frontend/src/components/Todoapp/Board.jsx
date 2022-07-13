import React from "react";
import AddForm from "./AddForm";
import Todo from "./Todo";
import { Droppable } from "react-beautiful-dnd";

const Board = ({ board }) => {
  return (
    <div className="board">
      <div className="board__header flex items-center justify-between">
        <p>{board.title}</p>
        <span className="board__todo-count">{board.cards.length}</span>
      </div>

      <AddForm listId={board.id} type="card" />
      <Droppable droppableId={board.id} type="task">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="droppable__card-container"
          >
            {board.cards.map((card, index) => (
              <Todo
                key={card.id}
                card={card}
                index={index}
                boardId={board.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Board;
