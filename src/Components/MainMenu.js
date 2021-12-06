import React, { useState } from 'react'

export default function MainMenu(props) {
    const [ clearing, setClearing ] = useState(false);

    const clearRecipes = (event) => {
        event.preventDefault();
        setClearing(false);
        props.clearLocalStorage();
    }

    const toggleClear = (event, val) => {
        event.preventDefault();
        setClearing(val);
    }

    return (
        <div>
            <a href="/submit">Submit new recipe</a>
            { clearing ? <label>Are you sure you want to clear?<button onClick={clearRecipes}>Yes</button><button onClick={(event) => toggleClear(event, false)}>No</button></label> : 
            <button onClick={(event) => toggleClear(event, true)}>Clear recipes</button>}
            {props.recipePreviews}
        </div>
    )
}
