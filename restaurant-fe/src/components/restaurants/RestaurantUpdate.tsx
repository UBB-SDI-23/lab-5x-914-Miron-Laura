import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Restaurant } from "../../models/Restaurant";
import { useEffect, useState } from "react";


export const UpdateRestaurant = () => {
    const { restaurantId } = useParams();
    const navigate = useNavigate();
    const [ vegetarian, setVegetarian ] = useState(false);
    const [restaurant, setRestaurant] = useState<Restaurant>({
        id: parseInt(String(restaurantId)),
        name: "",
        adress: "",
        phone_number: "",
        cuisine_type: "",
        is_vegetarian_friendly: vegetarian,
    });

    const UpdateRestaurant = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/restaurants/${restaurantId}/`, restaurant);
            navigate("/restaurants");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/restaurants");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/restaurants`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={UpdateRestaurant} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                               Name
                            </FormLabel>
                            <TextField
                                id="name"
                                variant="outlined"
                                onChange={(event) => setRestaurant({ ...restaurant, name: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Adress
                            </FormLabel>
                            <TextField
                                id="adress"
                                variant="outlined"
                                onChange={(event) => setRestaurant({ ...restaurant, adress: event.target.value })}
                            />
                        </Container>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Phone Number
                            </FormLabel>
                            <TextField
                                id="phone_number"
                                variant="outlined"
                                onChange={(event) => setRestaurant({ ...restaurant, phone_number: event.target.value })}
                            />
                        </Container>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Cuisine Type
                            </FormLabel>
                            <TextField
                                id="cuisine_type"
                                variant="outlined"
                                onChange={(event) => setRestaurant({ ...restaurant, cuisine_type: event.target.value })}
                            />
                        </Container>
                       
                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={UpdateRestaurant} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}