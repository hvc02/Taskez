import React, { useState, useContext } from "react";
import Button from "../Button/Button";
import { KanbanContext } from "../../context/kanban.context";
import { ReactComponent as AvatarPlaceholder } from "../../assets/images/avatars/avatar-placeholder.svg";
import AddIcon from "../../assets/images/add.svg";

const AddForm = ({ listId, type }) => {
  const initialState = { title: "", desc: "" };
  const { addMoreCard } = useContext(KanbanContext);
  const [values, setValues] = useState(initialState);
  const [open, setOpen] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBtnConfirm = (e) => {
    e.preventDefault();
    if (type === "card") addMoreCard(values.title, listId, values.desc);

    setOpen(false);
    setValues({
      ...values,
      title: "",
      desc: "",
    });
  };
  return (
    <>
      {!open ? (
        <button onClick={() => setOpen(true)} className="btn board__add-btn">
          <img src={AddIcon} alt="Add todo" />
        </button>
      ) : (
        <form onSubmit={handleBtnConfirm} className="add-form">
          <input
            className="add-form__textfield"
            type="text"
            placeholder="Give your task a title"
            onChange={handleOnChange}
            name={"title"}
            value={values.title}
          />
          <textarea
            type="text"
            name={"desc"}
            rows="3"
            value={values.desc}
            placeholder="Description"
            className="add-form__textarea"
            onChange={handleOnChange}
          />
          <div className="add-form__footer ">
            <AvatarPlaceholder />
            <div className="flex">
              <Button variant="text" type="submit" text="Add" />
              <Button
                variant="text"
                text="Cancel"
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default AddForm;
