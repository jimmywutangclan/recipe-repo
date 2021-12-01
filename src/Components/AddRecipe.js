import React, { useState } from 'react'

export default function AddRecipe(props) {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    // helper funcs for creating/adding/deleting ingredients

    const deleteIngredient = (event, index) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(ingredients));
        clone.splice(index, 1);
        setIngredients(clone);
    };

    const editIngredient = (event, index) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(ingredients));
        clone[index].ingredient = event.target.value;
        setIngredients(clone);
    }

    const addIngredient = (event) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(ingredients));
        clone.push({ingredient: "", amount: 0, unit: ""});
        setIngredients(clone);
    }

    // helper funcs for creating/adding/deleting steps

    const deleteStep = (event, index) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(steps));
        clone.splice(index, 1);
        setSteps(clone);
    };

    const editStep = (event, index) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(steps));
        clone[index].content = event.target.value;
        setSteps(clone);
    }

    const addStepToEnd = (event) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(steps));
        clone.push({content: "", sublist: []});
        setSteps(clone);
    }

    // the logic for rendering the HTML

    const ingredientsForms = ingredients.map((ingredient, index) => <div><input type="text" value={ingredient.ingredient} onChange={(event) => editIngredient(event, index)}></input>
        <button onClick={(event) => deleteIngredient(event, index)}>Delete</button></div>);
    const stepsForms = steps.map((step, index) => <div><input type="text" value={step.content} onChange={(event) => editStep(event, index)}></input>
        <button>Add step in between</button><button onClick={deleteStep}>Delete</button></div>);

    return (
        <div>
            <h2>Add recipe</h2>
            <form>
                <label>Recipe name: <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input></label>
                <h3>Ingredients:</h3>
                {ingredientsForms}
                <button onClick={addIngredient}>Add ingredient</button>
                <h3>Steps:</h3>
                {stepsForms}
                <button onClick={addStepToEnd}>Add step to bottom</button>
                <button onClick={() => props.submitRecipe({name: name, ingredients: ingredients, steps: steps})}>Submit</button>
            </form>
        </div>
    )
}
