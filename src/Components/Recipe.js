import React, { useState } from 'react'
import { useParams } from 'react-router'

export default function RecipeFC(props) {
    // load data from params and props
    const { id } = useParams();

    const [recipe, editRecipe] = useState(props.recipes[id]); 

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
