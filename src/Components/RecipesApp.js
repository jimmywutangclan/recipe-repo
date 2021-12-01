import React, { Component } from 'react'
import Recipe from './Recipe';
import {BrowserRouter, Switch, Navigate, useNavigate, Link, Route, Routes, useParams } from 'react-router-dom';
import MainMenu from './MainMenu';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';

const recipes = [{name: "Pizza", ingredients: [{ingredient: "tomato", amount: 5, unit: "fruits"}, {ingredient: "flour", amount: 5, unit: "cups"}], steps: [{content: "Make dough"}, {content: "Add sauce", sublist: ["Make cheese"]}]}, {name: "Burger", ingredients: [{ingredient: "beef", amount: 10, unit: "kg"}], steps: [{content: "do beef stuff"}, {content: "flip"}]}];

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
        alert(localStorage.getItem('recipes'));
    };

    render() {
        const recipeList = this.state.recipes;
        const recipeHtml = recipeList.map((recipe, index) => <h2><a href={"/recipes/" + index}>{recipe.name}</a></h2>)

        return (
            <BrowserRouter>
                <div>
                    <h1><a href="/">Recipes</a></h1>
                    <Routes>
                        <Route path="/" element={<MainMenu recipePreviews={recipeHtml} />} />
                        <Route path="/submit" element={<AddRecipe submitRecipe={this.submitRecipe}/>} />
                        <Route path="/recipes/:id" element={<Recipe recipes={this.state.recipes} />} />
                        <Route path="/edit/:id" element={<EditRecipe recipes={this.state.recipes} />} />
                        <Route path="/*" element={<h1>Out of bounds</h1>} />
                    </Routes>
                </div>
            </BrowserRouter>
        )
    }
}
