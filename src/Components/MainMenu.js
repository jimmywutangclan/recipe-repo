import React from 'react'

export default function MainMenu(props) {
    return (
        <div>
            <a href="/submit">Submit new recipe</a>
            {props.recipePreviews}
        </div>
    )
}
