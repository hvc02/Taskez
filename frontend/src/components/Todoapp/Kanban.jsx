import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Board from "./Board";
import store from "../../context/store";
import { KanbanContext } from "../../context/kanban.context";

const dataStorage = JSON.parse(window.localStorage.getItem("youShd-kanban"));

const initialState = () => {
  if (dataStorage) {
    return dataStorage;
  } else {
    window.localStorage.setItem("youShd-kanban", JSON.stringify(store));
    return store;
  }
};
const Kanban = () => {
  const [data, setData] = useState(initialState);

  const addMoreCard = (title, boardId, desc) => {
    if (!title) {
      return;
    }

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
      desc,
    };

    const board = data.boards[boardId];
    board.cards = [...board.cards, newCard];

    const newState = {
      ...data,
      boards: {
        ...data.boards,
        [boardId]: board,
      },
    };
    setData(newState);
    window.localStorage.setItem("youShd-kanban", JSON.stringify(newState));
  };

  const removeCard = (index, boardId) => {
    const board = data.boards[boardId];

    board.cards.splice(index, 1);

    const newState = {
      ...data,
      boards: {
        ...data.boards,
        [boardId]: board,
      },
    };
    setData(newState);
    window.localStorage.setItem("youShd-kanban", JSON.stringify(newState));
  };

  const updateCardTitle = (title, index, boardId) => {
    const board = data.boards[boardId];
    board.cards[index].title = title;

    const newState = {
      ...data,
      boards: {
        ...data.boards,
        [boardId]: board,
      },
    };
    setData(newState);
    window.localStorage.setItem("youShd-kanban", JSON.stringify(newState));
  };

  const updateCardDescription = (desc, index, boardId) => {
    const board = data.boards[boardId];
    board.cards[index].desc = desc;

    const newState = {
      ...data,
      boards: {
        ...data.boards,
        [boardId]: board,
      },
    };
    setData(newState);
    window.localStorage.setItem("youShd-kanban", JSON.stringify(newState));
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceboard = data.boards[source.droppableId];
    const destinationboard = data.boards[destination.droppableId];
    const draggingCard = sourceboard.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceboard.cards.splice(source.index, 1);
      destinationboard.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        boards: {
          ...data.boards,
          [sourceboard.id]: destinationboard,
        },
      };

      // console.log(newState, "new state");
      window.localStorage.setItem("youShd-kanban", JSON.stringify(newState));

      setData(newState);
    } else {
      sourceboard.cards.splice(source.index, 1);
      destinationboard.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        boards: {
          ...data.boards,
          [sourceboard.id]: sourceboard,
          [destinationboard.id]: destinationboard,
        },
      };
      // console.log(newState, "newState");

      setData(newState);
      window.localStorage.setItem("youShd-kanban", JSON.stringify(newState));
    }
  };

  // console.log(data, "in kanban comp");
  return (
    <KanbanContext.Provider
      value={{
        addMoreCard,
        removeCard,
        updateCardTitle,
        updateCardDescription,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="app" type="board" direction="horizontal">
          {(provided) => (
            <div
              className="droppable__wrapper"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="boards__container">
                {data.boardIds.map((boardId, index) => {
                  const board = data.boards[boardId];

                  return <Board board={board} key={boardId} index={index} />;
                })}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </KanbanContext.Provider>
  );
};

export default Kanban;
