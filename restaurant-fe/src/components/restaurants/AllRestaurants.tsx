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

export const AllRestaurants = () => {
	const [loading, setLoading] = useState(false);
	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/restaurants/`)
			.then((response) => response.json())
			.then((data) => {
				setRestaurants(data);
				setLoading(false);
			});
	}, []);

	return (
		<Container>
			<h1>All restaurants</h1>

			{loading && <CircularProgress />}
			{!loading && restaurants.length === 0 && <p>No restaurants found</p>}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurants/add`}>
					<Tooltip title="Add a new restaurant" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}
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
							</TableRow>
						</TableHead>
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
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};