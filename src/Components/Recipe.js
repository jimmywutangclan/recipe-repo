import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router'

export default function Recipe(props) {
    // load data from params and props
    const { id } = useParams();
    const nav = useNavigate();
    const [recipe, editRecipe] = useState(props.recipes[id]); 
    const [toDelete, changeDeletePrompt] = useState(false);

    const stepsList = recipe.steps;
    const ingredientsList = recipe.ingredients;

    // function to change amount of an ingredient
    // this displays the actual data after recompiling but not closing the webpage cache
    const trackIngredientAmount = (ingredientId) => {
        // the  problem here was that editRecipe of state wasn't working and replacing the value properly, by creating a copy of the object, mutating that and then editing, it works now
        const clone = JSON.parse(JSON.stringify(recipe));

        clone.ingredients[ingredientId].amount -= 1;
        editRecipe(clone);
    };

    // fork the recipe
    const forkRecipe = (event) => {
        event.preventDefault();
        const recipeCopy = props.recipes;
        recipeCopy.push({name: recipe.name, ingredients: ingredientsList, steps: stepsList});
        props.replaceRecipeList(recipeCopy);
        nav("/recipes/" + (recipeCopy.length - 1))
    }

    // delete the recipe
    const deleteRecipe = (event) => {
        event.preventDefault();
        const recipeCopy = props.recipes;
        recipeCopy.splice(id, 1);
        props.replaceRecipeList(recipeCopy);
        nav("/");
    };

    // function to trigger delete
    const triggerDeletePrompt = (event, val) => {
        event.preventDefault();
        changeDeletePrompt(val);
    };

    // creates html mapping
    const htmlSteps = stepsList.map((step, index) => <li>{step.content}{step.sublist ? <ul>
        {step.sublist.map((step, index) => <li>{step}</li>)}
    </ul> : ''}</li>)
    const htmlIngredients = ingredientsList.map((ingredient, index) => <li>{ingredient.amount + " " + ingredient.unit + " " + ingredient.ingredient}
        <button onClick={() => trackIngredientAmount(index)}>Track amount</button></li>);

    // return recipe html
    return (
        <div>
            <a href={"/edit/" + id}>Edit</a>
            <button onClick={forkRecipe}>Fork</button>
            {toDelete ? <label>Are you sure you want to delete?<button onClick={deleteRecipe}>Yes</button><button onClick={(event) => triggerDeletePrompt(event, false)}>No</button></label> : 
                <button onClick={(event) => triggerDeletePrompt(event, true)}>Delete</button>}
            <form>
                <label>Adjust proportions: <input type="text"></input></label>
                <button>Adjust</button>
            </form>
            <h2>{recipe.name}</h2>
            <h3>Ingredients:</h3>
            <ul>
                {htmlIngredients}
            </ul>
            <h3>Steps:</h3>
            <ul>
                {htmlSteps}
            </ul>
        </div>);
}
