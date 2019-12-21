import React, { useState } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(results=>{
      updateColors(colors.map(color => {
        if(color.id === colorToEdit.id)
        {
          return colorToEdit
        }
        else 
          return color
      }));
    })
    .catch(err=>{
      console.log('error found',err)
    })
};





const deleteColor = color => {
  // make a delete request to delete this color
  axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(results => {
      updateColors(colors.filter(colorCheck => colorCheck.id !== results.data))
    })
    .catch(err=>console.log(err))
    
};











  const handleChange = e => {
    addNewColor({
      ...addColor,
      [e.target.name]: e.target.value
    });
  };

  const addNewColor = event => {
    // event.preventDefault();
      axiosWithAuth()
        .post('/api/colors', addColor)
        .then(res => {
          updateColors(res)
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.res)
        }
      )};

    function refreshPage() {
      window.location.reload(false);
    }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
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
            <button onClick={refreshPage} type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* Attempted stretch */}
      <div>
        <form onSubmit={addNewColor}>
          <input  
              type='text'
              name='name'
              placeholder='color name'
              value={addColor.name}
              onChange={handleChange}
              />
            <input
              type='text'
              name='hex'
              placeholder='hex color'
              value={addColor.code.hex}
              onChange={handleChange}
             />
        </form>
        <button onClick={addNewColor}>Add New Color</button>
      </div>
    </div>
  );
};

export default ColorList;