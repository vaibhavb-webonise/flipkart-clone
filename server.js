import express from "express";
import cors from 'cors'
import { v4 } from "uuid";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { MongoClient } from "mongodb";
import { offersCard, urls } from './DummyUrls.js';
// app configs
const app = express();
app.use(cors());
app.use(express.json())

// constants
const PORT = 9000;

// database configs

const MONGO_CLIENT_ENDPOINT = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(MONGO_CLIENT_ENDPOINT);

// starting the server and listening to an endpoint
app.listen(PORT, () => {
    console.log('listening the server to the port ', PORT);
})

app.get('/', async (req, resp) => {
    await mongoClient.connect()
    const userCollection = mongoClient.db('flipkart').collection('users');
    const users = await userCollection.find().toArray()
    resp.send(users)
})

app.post('/signup', async (req, resp) => {
    const { firstName, lastName, password, email, mobile, gender = 'male' } = req.body;

    try {
        await mongoClient.connect();
        const userCollection = mongoClient.db('flipkart').collection('users');
        const sanitizedEmail = email?.toString()?.toLowerCase();
        if (!password || password.length < 6) {
            resp.status(407).send({
                error: 'short password',
                description: 'password must be at least 6 characters'
            })
            return
        }
        const query = { $or: [{ email: sanitizedEmail }, { mobile }] }
        const exist = await userCollection.findOne(query)
        if (exist) {
            resp.status(409).send({
                error: 'duplicate user',
                description: 'This email or mobile is address already registered, try please logging in'
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = v4()
        const user = {
            firstName,
            lastName,
            fullName: firstName + ' ' + lastName,
            userId,
            hashedPassword,
            mobile,
            email: sanitizedEmail,
            gender
        }
        await userCollection.insertOne(user);
        const token = jwt.sign({ sanitizedEmail }, 'secret', {
            expiresIn: 60,
        })

        const userInfo = {
            token,
            sanitizedEmail,
            userId,
            user
        }
        resp.status(201).send(userInfo)
    } catch (e) {
        resp.status(500).send('Internal server error');
    } finally {
        await mongoClient.close();
    }
})


// login endpoint

app.post('/login', async (req, resp) => {
    const { email, password } = req.body;
    const sanitizedEmail = email.toString().toLowerCase();

    try {
        await mongoClient.connect();
        const userCollection = mongoClient.db('flipkart').collection('users');
        const user = await userCollection.findOne({ $or: [{ email: sanitizedEmail }, { mobile: sanitizedEmail }] });
        if (!user) {
            resp.status(404).send({
                error: 'user not exist',
                description: 'user not found with email, please try signing up'
            })
            return
        }
        const matchedPassword = await bcrypt.compare(password, user.hashedPassword);
        if (!matchedPassword) {
            resp.status(400).send({
                error: 'wrong password',
                description: 'Wrong password'
            })
            return
        }
        const token = jwt.sign({ sanitizedEmail }, 'secret', {
            expiresIn: 60,
        })

        const userResponse = {
            ...user, token
        }
        resp.status(201).send(userResponse);

    } catch (e) {
        resp.status(504).send('Internal server error');
    } finally {
        await mongoClient.close();
    }
})

// getting user by userId

app.get('/getuser', async (req, resp) => {
    const { userId, AuthToken } = req.query;
    try {
        await mongoClient.connect();
        const userCollection = mongoClient.db('flipkart').collection('users');
        const user = await userCollection.findOne({ userId })
        if (!user) return resp.status(404).send('User not found')
        return resp.status(200).send(user)

    } catch {
        return resp.status(500).send('Internal server error')
    } finally {
        await mongoClient.close();
    }
})

// getting an URLs for initial ads
app.get('/getad', async (req, resp) => {
    resp.status(200).send(urls)
})


app.get('/getoffer', (req, resp) => {
    resp.status(200).send(offersCard)
})
// creating an API for add to cart 

app.post('/addincart', async (req, resp) => {
    const product = {
        productId: '5',
        name: '',
        description: '',
        price: '',
        rating: '',
        imgUrl: '',
    }
    const { userId } = req.body;
    try {
        await mongoClient.connect();
        const cartCollection = mongoClient.db('flipkart').collection('cart');
        const userCollection = mongoClient.db('flipkart').collection('users');
        const user = await userCollection.findOne({ userId });
        // logic for adding in cart if user is adding inside of the cart for the very first time
        if (!user.cartId) {
            const newCart = {
                userId,
                cartId: user.userId.toString() + user.email,
                products: [],
            }
            await cartCollection.insertOne(newCart);
            const query = { $set: { cartId: newCart.cartId } }
            await userCollection.updateOne({ userId }, query);
        }
        // logic if user already has a cart associated with his account and adding a product 

        const findQuery = { cartId: user.userId + user.email }
        const userCart = await cartCollection.findOne(findQuery);
        const productIdArray = userCart.products.map(prod => prod.productId);
        let productArray = [...userCart.products]

        // if product is not present inside of the cart

        if (!productIdArray.includes(product.productId)) {
            productArray = [...productArray, { productId: product.productId, count: 1 }]
        }

        // if product is already present in the cart

        else {
            const presentProduct = productArray.find(prod => prod.productId == product.productId);
            const restProduct = productArray.filter(prod => prod.productId != product.productId)
            presentProduct.count += 1;
            productArray = [...restProduct, presentProduct]
        }
        // updating in the database
        const query = { $set: { products: productArray } };
        await cartCollection.updateOne({ userId }, query);
        const updatedUserCart = await cartCollection.findOne(findQuery);
        resp.send(updatedUserCart);

    } catch (e) {
        resp.status(504).send('Internal server error');
    }
    finally {
        await mongoClient.close();
    }
})


// removing from the cart 

app.post('/removefromcart', async (req, resp) => {
    const product = {
        productId: '5',
    }
    const { userId } = req.body;
    try {
        await mongoClient.connect();
        const cartCollection = mongoClient.db('flipkart').collection('cart');
        const userCollection = mongoClient.db('flipkart').collection('users');
        const user = await userCollection.findOne({ userId });

        const findQuery = { cartId: user.userId + user.email }
        const userCart = await cartCollection.findOne(findQuery);
        let productArray = [...userCart.products]


        const presentProduct = productArray.find(prod => prod.productId == product.productId);
        const restProduct = productArray.filter(prod => prod.productId != product.productId)
        presentProduct.count -= 1;

        if (presentProduct.count == 0) productArray = [...restProduct];

        else productArray = [...restProduct, presentProduct];


        // updating in the database
        const query = { $set: { products: productArray } };
        await cartCollection.updateOne({ userId }, query);
        const updatedUserCart = await cartCollection.findOne(findQuery);
        resp.send(updatedUserCart);

    } catch (e) {
        resp.status(504).send('Internal server error');
    }
    finally {
        await mongoClient.close();
    }
})

// dealing with the product section
app.post('/addproduct', async (req, resp) => {

    const product = req.body;

    try {
        await mongoClient.connect();
        const productCollection = mongoClient.db('flipkart').collection('products');
        const product = req.body;
        const exist = await productCollection.findOne({ productId: product.productId });
        if (!exist) {
            await productCollection.insertOne({ ...product })
            resp.status(201).send('product added successfully');
            return;
        }
        product.numberOfUnits = Number(product.numberOfUnits) + Number(exist.numberOfUnits);

        const query = { $set: { numberOfUnits: product.numberOfUnits, ...product } }
        await productCollection.updateOne({ productId: product.productId }, query)
        resp.status(201).send('item added successfully');
    } catch (err) {
        resp.status(500).send('Internal server error');
    } finally {
        await mongoClient.close();
    }
})


// get all products available
