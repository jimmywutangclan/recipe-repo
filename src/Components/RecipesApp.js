import React, { Component } from 'react'
import Recipe from './Recipe';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import MainMenu from './MainMenu';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';

export default class RecipesApp extends Component {
    constructor(props) {
        super(props);
        this.state = { recipes: localStorage.getItem('recipes') ? JSON.parse(localStorage.getItem('recipes')) : [] };
    }

    // helper functions to work with data
    submitRecipe = (recipe) => {
        const recipeCopy = this.state.recipes;
        recipeCopy.push(recipe);
        this.setState({ recipes: recipeCopy });
        localStorage.setItem('recipes', JSON.stringify(recipeCopy));
    };

    // helper functions to work with data
    replaceRecipe = (id, recipe) => {
        const recipeCopy = this.state.recipes;
        recipeCopy[id] = recipe;
        this.setState({ recipes: recipeCopy });
        localStorage.setItem('recipes', JSON.stringify(recipeCopy));
    };

    // helper function to delete recipe
    replaceRecipeList = (recipes) => {
        this.setState({ recipes: recipes });
        localStorage.setItem('recipes', JSON.stringify(recipes));
    };

    // clear local storage
    clearLocalStorage = () => {
        localStorage.clear();
        this.setState({ recipes: [] });
    };

    render() {
        const recipeList = this.state.recipes;
        const recipeHtml = recipeList.map((recipe, index) => <h2><a href={"/recipes/" + index}>{recipe.name}</a></h2>)

        return (
            <BrowserRouter>
                <div>
                    <h1><a href="/">Recipes</a></h1>
                    <Routes>
                        <Route path="/" element={<MainMenu recipePreviews={recipeHtml} clearLocalStorage={this.clearLocalStorage}/>} />
                        <Route path="/submit" element={<AddRecipe submitRecipe={this.submitRecipe} futureIndex={this.state.recipes.length}/>} />
                        <Route path="/recipes/:id" element={<Recipe recipes={this.state.recipes} replaceRecipeList={this.replaceRecipeList}/>} />
                        <Route path="/edit/:id" element={<EditRecipe recipes={this.state.recipes} replaceRecipe={this.replaceRecipe}/>} />
                        <Route path="/*" element={<h1>Out of bounds</h1>} />
                    </Routes>
                </div>
            </BrowserRouter>
        )
    }
}
