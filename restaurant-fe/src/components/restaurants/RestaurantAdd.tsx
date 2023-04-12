import { Button, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Restaurant } from "../../models/Restaurant"
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const RestaurantAdd = () => {
	const navigate = useNavigate();
    const [ vegetarian, setVegetarian ] = useState(false);

	const [restaurant, setRestaurant] = useState<Restaurant>({
	name: "",
	adress: "",
	phone_number: "",
	cuisine_type: "",
    is_vegetarian_friendly: vegetarian,
	});
    const handleChange = (event: SelectChangeEvent) => {
        setVegetarian(event.target.value as any );
       
     };
    console.log("/veg",vegetarian);
	const addRestaurant = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/restaurants/`, restaurant);
			navigate("/restaurants");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurants`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addRestaurant}>
						<TextField
							id="name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setRestaurant({ ...restaurant, name: event.target.value })}
						/>
						<TextField
							id="adress"
							label="Adress"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setRestaurant({ ...restaurant, adress: event.target.value })}
						/>
                        <TextField
							id="phone_number"
							label="Phone Number"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setRestaurant({ ...restaurant, phone_number: event.target.value })}
						/>
                        <TextField
							id="cuisine_type"
							label="Cuisine Type"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setRestaurant({ ...restaurant, cuisine_type: event.target.value })}
						/>

                        <Select
                            value={vegetarian as any}
                            label="Vegeratrian"
                            onChange={handleChange}
                        >
                            <MenuItem value={true as any}>Yes</MenuItem>
                            <MenuItem value={false as any }>No</MenuItem>
                        </Select>
						<Button type="submit">Add Restaurant</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};