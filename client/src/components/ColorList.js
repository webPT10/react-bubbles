import React, { useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};
// []  , response.data
const ColorList = ({ colors, updateColors }) => {
  console.log("Colors array", colors);

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(null);
  // console.log(colorToEdit);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    const id = colorToEdit.id; // how does colorToEdit have an id on it????
    console.log({ colorToEdit });

    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${id}`, colorToEdit)
      .then(response => {
        const updatedColor = response.data;
        console.log({ updatedColor });
        const newColors = colors.map(currentColor => {
          console.log(currentColor);
          if (updatedColor.id === currentColor.id) {
            return updatedColor;
          }
          return currentColor;
        });
        updateColors(newColors);
      })
      .catch(error => console.log(error));

    setEditing(false);
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log(color);
    const id = color.id;

    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${id}`)
      .then(response => {
        updateColors([...colors.filter(color => color.id !== id)]);
      })
      .catch(error => console.log(error));

    setColorToEdit(false);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.id} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
