const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const TodoRoute = require('./routes/TodoRoutes.js')

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(TodoRoute)

app.listen(port, () => {
    console.log("App is running on port "+port) 
});