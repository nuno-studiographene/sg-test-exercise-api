import express from 'express';
import { v4 as uuidv4} from 'uuid';

const router = express.Router();


// DATABASE
let foods = [
	// template for the foods
	{
		"title": "Quinoa Croquettas",
		"description": "Quinoa and cheddar croquettas with aji rocotto & pineapple salsa (v)",
		"price": "4.95",
		"type": "starters",
		"id": "2dd36f02-9853-4a44-8e62-f787f78bf9de"
	},
	{
		"title": "Chiffa Chicarrones",
		"description": "Slow cooked, crispy pork belly with sweet soy sauce",
		"price": "6.95",
		"type": "starters",
		"id": "280ca611-15ad-491c-b943-ee3ba8988703"
	},
	{
		"title": "Calamares",
		"description": "Crispy baby squid with pickled jalapeño miso salsa",
		"price": "6.95",
		"type": "starters",
		"id": "bbbf51fe-a8ca-4227-bdd9-4aec75f583b2"
	},
	{
		"title": "El Clasico",
		"description": "Sea bass ceviche with aji limo tiger’s milk, sweet potato purée, choclo corn,red onion, coriander & plantain (gf)",
		"price": "8.95",
		"type": "main_courses",
		"id": "da9c0bd3-fbee-4b8d-8e3c-092b9ae89944"
	},
	{
		"title": "Tiradito Callao",
		"description": "Cobia tiradito with coriander tiger’s milk, black tobika, crème fraiche & sweet potato crunchies",
		"price": "10.00",
		"type": "main_courses",
		"id": "57ab4144-d4ec-4c0a-a8ce-cc0767df8408"
	},
	{
		"title": "Super Pollo",
		"description": "Marinated corn fed chicken pieces with rocotto salsa",
		"price": "4.95",
		"type": "sides",
		"id": "c365272c-afe9-4da7-809c-1f0d170c524a"
	},
	{
		"title": "Patatas Fritas",
		"description": "Sweet potato fries with aji rocotto mayonnaise (v)",
		"price": "3.95",
		"type": "sides",
		"id": "f4aa7f7e-3659-42d2-bf45-ed6b4db44ac1"
	},
	{
		"title": "Icecream",
		"description": "Lorem ice cream dolor sit amet salerma petrum sea",
		"price": "1.95",
		"type": "desserts",
		"id": "579ba1fb-9280-401d-b584-501d12096fde"
	},
	{
		"title": "Tiramisu",
		"description": "Tiramisu ipsum dolor sit amet salerma petrum sea",
		"price": "2.95",
		"type": "desserts",
		"id": "a8f06f56-a709-4771-a7ff-ae1238a616a5"
	},
	{
		"title": "Chocolate Brownie",
		"description": "Brownie ipsum dolor sit amet salerma petrum sea",
		"price": "4.95",
		"type": "desserts",
		"id": "46e10a77-d62d-4db8-a40e-2588a2f65f76"
	}
	
]



// GET api call
router.get('/', (req, res) => {
	res.send(foods);
});


// POST api call
router.post('/', (req, res) => {
	const newFoodWithoutId = req.body

	if(
		newFoodWithoutId.title && newFoodWithoutId.title.length &&
		newFoodWithoutId.description && newFoodWithoutId.description.length &&
		newFoodWithoutId.price && newFoodWithoutId.price.length &&
		newFoodWithoutId.type && newFoodWithoutId.type.length
	){
		const newFood = {...newFoodWithoutId, id: uuidv4()}
		foods.push(newFood)
		res.send(`Food with the foodname ${newFood.title} added to the database!`);
	}else{
		res.status(400).send({
	   		message: 'Missing parameters. Please check if you have a title, description, price and type, and make sure they are strings.'
		})
	}
});


// GET food (by id) api call
router.get('/:id', (req, res) => {
	const {id} = req.params;

	const foundFood = foods.find((food) => food.id === id);
	res.send(foundFood);
});


// DELETE food (by id) api call
router.delete('/:id', (req, res) => {
	const {id} = req.params;

	if (foods.find((foundFood) => foundFood.id === id)) {
	  // foods array contains the element we're looking for
	  foods = foods.filter((food) => food.id !== id)
	  res.send('Food has been successfully deleted!')
	}else{
		res.status(400).send({
	   		message: 'Could not find food with this id'
		})
	}
})


// UPDATE food (by id) api call
router.patch('/:id', (req, res) => {
	const {id} = req.params;

	if (foods.find((foundFood) => foundFood.id === id)) {
	    // foods array contains the element we're looking for
	    const {title, description, price, type} = req.body;
	    const foodToBeUpdated = foods.find((food) => food.id === id);


		if(!title && !description && !price && !type){
			res.status(400).send({
		   		message: 'You need to update at least one field of the object. (title, description, price or type).'
			})
		}else{
			if(title) foodToBeUpdated.title = title
			if(description) foodToBeUpdated.description = description
			if(price) foodToBeUpdated.price = price
			if(type) foodToBeUpdated.type = type

			res.send('Food has been successfully updated!')
		}
	}else{
		res.status(400).send({
	   		message: 'Could not find food with this id'
		})
	}
})


export default router;