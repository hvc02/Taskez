import React, { useState, useContext } from "react";
import AvatarOne from "../../assets/images/avatars/avatar-one.svg";
import { ReactComponent as ChatIcon } from "../../assets/images/chat.svg";
import DeleteIcon from "../../assets/images/delete.svg";
import { KanbanContext } from "../../context/kanban.context";
import { Draggable } from "react-beautiful-dnd";
import EditForm from "./EditForm";
import Drawer from "../Drawer/Drawer";
import IconButton from "../Button/IconButton";

const Todo = ({ card, index, boardId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { removeCard } = useContext(KanbanContext);

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <div className="todo">
              <h4 className="todo__title" onClick={() => setIsOpen(!isOpen)}>
                {card.title}{" "}
              </h4>

              <div className="todo__content">{card.desc}</div>
              <div className="todo__footer">
                <img src={AvatarOne} alt="todo-creator" />
                <div className="flex items-center">
                  <IconButton
                    variant="icon"
                    Icon={DeleteIcon}
                    onClick={() => removeCard(index, boardId)}
                  />
                  <ChatIcon />
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="right">
        <EditForm
          title={card.title}
          description={card.desc}
          boardId={boardId}
          index={index}
        />
      </Drawer>
    </>
  );
};

export default Todo;
