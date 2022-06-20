import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import { useState } from "react"
import Chip from "./components/Chip/Chip.jsx"
import Header from "./components/Header/Header.jsx"
import Instructions from "./components/Instructions/Instructions.jsx"
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel.jsx"
import { createDataSet } from "./data/dataset"
import "./App.css"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

export function App() {
  const [stateCategory, setCategory] = useState("")

  const [stateRestaurant, setRestaurant] = useState("")

  const [stateMenu, setMenu] = useState([])

  function setLabelBasedOnUser(userCategory) {
      setCategory(userCategory)
  }

  function setRestaurantBasedOnUser(userCategory) {
    setRestaurant(userCategory)
  }

  function setMenuBasedOnUser(userCategory) {
    setMenu(userCategory)
    console.log(stateMenu)
  }

  function filterArrayByMenu(item) {
      return item.food_category === stateCategory && item.restaurant === stateRestaurant; 
  }

  const currentMenuItems = data.filter(filterArrayByMenu)

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((category, idx) => {
            return <Chip handleClick = {setLabelBasedOnUser} key={idx} label={category} isActive={category === stateCategory ? true:false}/> 
          })}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {
          <Header title = {appInfo.title}
           tagline={appInfo.tagline}
           description={appInfo.description}/>
        }

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">{
            restaurants.map((restaurant, idx) => {
              return <Chip handleClick = {setRestaurantBasedOnUser} key={idx} label={restaurant} isActive={restaurant === stateRestaurant ? true:false}/>
            })
          }</div>
        </div>

        {
          <Instructions instructions={appInfo.instructions.start}/>
        }

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.map((menu, idx) => {
            return <Chip menu = {menu} handleClick={setMenuBasedOnUser} key={idx} label={menu.item_name} isActive={menu === stateMenu ? true:false}/> 
          })}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts"> {
            <NutritionalLabel item={stateMenu}/>
          }
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
