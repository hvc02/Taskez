import React, { useState, useContext } from "react";
import { UserContext } from "../../context/user.context";
import { KanbanContext } from "../../context/kanban.context";
import AvatarThree from "../../assets/images/avatars/avatar-three.svg";

const EditForm = ({ title, description, boardId, index }) => {
  const { updateCardTitle, updateCardDescription } = useContext(KanbanContext);
  const {
    user: { name },
  } = useContext(UserContext);
  const [state, setState] = useState({
    title,
    description,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className="edit__form">
      <input
        className="edit__input"
        type="text"
        value={state.title}
        name="title"
        onChange={handleOnChange}
        onBlur={() => updateCardTitle(state.title, index, boardId)}
      />
      <hr className="edit__hr" />
      <div className="edit__grid">
        <span>Created by</span>
        <div className="flex items-center">
          <img src={AvatarThree} alt="user-avatar" />
          <span>{name}</span>
        </div>
        <span>Description</span>
        <textarea
          className="edit__desc"
          name="description"
          value={state.description}
          onChange={handleOnChange}
          rows="5"
          onBlur={() =>
            updateCardDescription(state.description, index, boardId)
          }
        ></textarea>
      </div>
    </div>
  );
};

export default EditForm;
