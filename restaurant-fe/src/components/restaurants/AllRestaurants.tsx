import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
	Button,
	TextField,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Restaurant } from "../../models/Restaurant";
import { useNavigate } from "react-router-dom";

export const AllRestaurants = () => {

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
	const [ filterName, setFilterName ] = useState("");

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/restaurants/`)
			.then((response) => response.json())
			.then((data) => {
				setRestaurants(data);
				setLoading(false);
			});
	}, []);



    const filterByName = (searchString: string): Restaurant[] => {
        return restaurants.filter(restaurant => restaurant?.name.toLowerCase().includes(searchString.toLowerCase()))
    }

	const handleChange = (event: any) => {
		setFilterName(event.target.value)
	}

	
	return (
		<Container>
			<h1>All restaurants</h1>

			<div style={{
				marginTop: '20px'
			}}>
				<Button 
					onClick = {() => navigate("/restaurants-ordered-by-name")}
					style={{
						border: '2px solid blue',
						marginRight: '10px',
					}}
					>
					Restaurants ordered by Name
				</Button>
				<Button 
					onClick = {() => navigate("/restaurants-ordered-by-vegetarian")}
					style={{
						border: '2px solid blue',
					}}
					>
					Vegetariant Restaurants
				</Button>
			</div>


			{loading && <CircularProgress />}
			{!loading && restaurants.length === 0 && <p>No restaurants found</p>}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurants/add`}>
					<Tooltip title="Add a new restaurant" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}

			<div>
				<TextField
					value={filterName}
					label="Search by Name"
					onChange={handleChange}
				>
				</TextField>
			</div>
			{!loading && restaurants.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Name</TableCell>
								<TableCell align="right">Adress</TableCell>
								<TableCell align="right">Phone number</TableCell>
								<TableCell align="center">Cuisine Type</TableCell>
								<TableCell align="center">Vegetarian Friendly</TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						{!filterName ? 
						(
						<TableBody>
							{restaurants.map((restaurant, index) => (
								<TableRow key={restaurant.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/restaurants/${restaurant.id}/details`} title="View restaurant
                                     details">
											{restaurant.name}
										</Link>
									</TableCell>
									<TableCell align="right">{restaurant.adress}</TableCell>
									<TableCell align="right">{restaurant.phone_number}</TableCell>
									<TableCell align="right">{restaurant.cuisine_type}</TableCell>
									<TableCell align="right">{restaurant.is_vegetarian_friendly? "yes":"no"}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/restaurants/${restaurant.id}/details`}>
											<Tooltip title="View restaurant details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurants/${restaurant.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurants/${restaurant.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						)
						: 
						(
						<TableBody>
						{filterByName(filterName).map((restaurant, index) => (
							<TableRow key={restaurant.id}>
								<TableCell component="th" scope="row">
									{index + 1}
								</TableCell>
								<TableCell component="th" scope="row">
									<Link to={`/restaurants/${restaurant.id}/details`} title="View restaurant
								 details">
										{restaurant.name}
									</Link>
								</TableCell>
								<TableCell align="right">{restaurant.adress}</TableCell>
								<TableCell align="right">{restaurant.phone_number}</TableCell>
								<TableCell align="right">{restaurant.cuisine_type}</TableCell>
								<TableCell align="right">{restaurant.is_vegetarian_friendly? "yes":"no"}</TableCell>
								<TableCell align="right">
									<IconButton
										component={Link}
										sx={{ mr: 3 }}
										to={`/restaurants/${restaurant.id}/details`}>
										<Tooltip title="View restaurant details" arrow>
											<ReadMoreIcon color="primary" />
										</Tooltip>
									</IconButton>

									<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurants/${restaurant.id}/edit`}>
										<EditIcon />
									</IconButton>

									<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurants/${restaurant.id}/delete`}>
										<DeleteForeverIcon sx={{ color: "red" }} />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>) }
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};