import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import { AllRestaurants } from './components/restaurants/AllRestaurants';
import {RestaurantAdd} from "./components/restaurants/RestaurantAdd";
import {RestaurantDelete} from "./components/restaurants/RestaurantDelete"
import {RestaurantDetails} from "./components/restaurants/RestaurantDetails"
import {UpdateRestaurant} from "./components/restaurants/RestaurantUpdate"
import { RestaurantFilter } from './components/restaurants/RestaurantsFilter';

function App() {

  return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/restaurants" element={<AllRestaurants />} />
					<Route path="/restaurants/add" element={<RestaurantAdd />} />
					<Route path="/restaurants/:restaurantId/details" element={<RestaurantDetails />} />
					<Route path="/restaurants/:RestaurantId/delete" element={<RestaurantDelete />} />
					<Route path="/restaurants/:restaurantId/edit" element={<UpdateRestaurant/>} />
					<Route path="/restaurants-ordered-by-name" element={<RestaurantFilter />} />
				</Routes>
			</Router> 
		</React.Fragment>
	);
}

export default App;