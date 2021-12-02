import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router'

export default function EditRecipe(props) {
    const recipeList = props.recipes;
    const { id } = useParams();
    const nav = useNavigate();

    const recipe = recipeList[id];
    
    // the states
    const [name, setName] = useState(recipe.name);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [steps, setSteps] = useState(recipe.steps);

    // the helpers for ingredients

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

    const editAmount = (event, index) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(ingredients));
        clone[index].amount = event.target.value;
        setIngredients(clone);
    }

    const editUnit = (event, index) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(ingredients));
        clone[index].unit = event.target.value;
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

    const addStepAt = (event, index) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(steps));
        clone.splice(index + 1, 0, {content: "", sublist: []});
        setSteps(clone); 
    };

    const addStepToEnd = (event) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(steps));
        clone.push({content: "", sublist: []});
        setSteps(clone);
    }

    // helper funcs for sublists

    const addStepToSublistAt = (event, index, sublistIndex) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(steps));
        clone[index].sublist.splice(sublistIndex + 1, 0, "");
        setSteps(clone);
    }

    const editSublistStep = (event, index, sublistIndex) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(steps));
        clone[index].sublist[sublistIndex] = event.target.value;
        setSteps(clone);
    }

    const deleteSublistStep = (event, index, sublistIndex) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(steps));
        clone[index].sublist.splice(sublistIndex, 1);
        setSteps(clone);
    }

    const addStepToSublist = (event, index) => {
        event.preventDefault();
        const clone = JSON.parse(JSON.stringify(steps));
        clone[index].sublist.push("");
        setSteps(clone);
    }

    // the function that directs back to the recipe

    const submitChanges = () => {
        props.replaceRecipe(id, {name: name, ingredients: ingredients, steps: steps});
        nav("/recipes/" + id);
    }

    // makes the html

    const ingredientsForms = ingredients.map((ingredient, index) => <li>
        <label>Ingredient: <input type="text" value={ingredient.ingredient} onChange={(event) => editIngredient(event, index)}></input></label>
        <label>Amount: <input type="text" value={ingredient.amount} onChange={(event) => editAmount(event, index)}></input></label>
        <label>Unit: <input type="text" value={ingredient.unit} onChange={(event) => editUnit(event, index)}></input></label>
        <button onClick={(event) => deleteIngredient(event, index)}>Delete</button></li>);

    const stepsForms = steps.map((step, index) => <li><input type="text" value={step.content} onChange={(event) => editStep(event, index)}></input>
        <button onClick={(event) => addStepAt(event, index)}>Add step in front</button>
        <button onClick={(event) => addStepToSublist(event, index)}>Add step to sublist</button>
        <button onClick={(event) => deleteStep(event, index)}>Delete</button>
        <ul>
            {step.sublist.map((item, sublistIndex) => <li><input type="text" value={item} onChange={(event) => editSublistStep(event, index, sublistIndex)}></input>
            <button onClick={(event) => addStepToSublistAt(event, index, sublistIndex)}>Add step in front</button>
            <button onClick={(event) => deleteSublistStep(event, index, sublistIndex)}>Delete step</button></li>)}
        </ul>
        </li>);

    return (
        <div>
            <div>
                <h2>Edit recipe</h2>
                <form>
                    <label>Recipe name: <input type="text" value={name}></input></label>
                    <h3>Ingredients:</h3>
                    {ingredientsForms}
                    <button onClick={addIngredient}>Add ingredient</button>
                    <h3>Steps:</h3>
                    {stepsForms}
                    <button onClick={addStepToEnd}>Add step to bottom</button>
                    <button onClick={submitChanges}>Submit</button>
                </form>
            </div>
        </div>
    )
}
