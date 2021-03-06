import React, {useEffect, useState} from 'react'
import './App.css';
import Recipe from './Recipe'

function App() {
   const APP_ID = '0d1be209'
   const APP_KEY ='b439bde557df5defce0ed8039b8db2ed'

   const [recipes, setRecipes] = useState([])
   const [search, setSearch] = useState('')
   const [query, setQuery] = useState('chicken')
    
//useEffect() is a function that takes
//an arrow function as an Parameter
useEffect( () => {     
        getRecipes()
}, [query])


const getRecipes =  async () => {
     const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
                                   
     const data = await response.json()
     setRecipes(data.hits)
     console.log(data.hits)
   }

   const updateSearch = e => {
    setSearch(e.target.value)
    
  }

   const getSearch  = e => {
    //setSearch()
     e.preventDefault()
     setQuery(search)
     setSearch('')
}



return (
    <div className="App">
    <h1>Recipes Site..</h1>
 
     <form onSubmit= {getSearch} className="search-form">      
        <input 
            className ="search-bar" 
            type ="text"
            value = {search}
            placeholder = "Search food name for it's recipes"
            onChange = {updateSearch} s
            />

        <button  
            className = "search-button"
            type="submit">
            Search
        </button>
     </form>

 <div className ="recipes">
     {
     recipes.map(recipe => ( 
        <Recipe 
            key = {recipe.recipe.label}  
            title={recipe.recipe.label} 
            calories= {recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
        />))
     }
     </div>
    </div>
  );
}

export default App;
