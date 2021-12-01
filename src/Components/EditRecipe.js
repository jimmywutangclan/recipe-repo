import React, { useState } from 'react'
import { useParams } from 'react-router'

export default function EditRecipe(props) {
    const recipeList = props.recipes;
    const { id } = useParams();

    const recipe = recipeList[id];

    const [name, setName] = useState(recipe.name);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [steps, setSteps] = useState(recipe.steps);

    const ingredientsForms = ingredients.map((ingredient, index) => <div><input type="text" value={ingredient.ingredient}></input><button>Delete</button></div>);
    const stepsForms = steps.map((step, index) => <div><input type="text" value={step.content}></input><button>Add step below</button><button>Delete</button></div>);

    return (
        <div>
            <div>
                <h2>Edit recipe</h2>
                <form>
                    <label>Recipe name: <input type="text" value={name}></input></label>
                    <h3>Ingredients:</h3>
                    {ingredientsForms}
                    <button>Add ingredient</button>
                    <h3>Steps:</h3>
                    {stepsForms}
                    <button>Add step to bottom</button>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}
