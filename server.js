/********************************************************************************* * WEB422 – Assignment 1 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. * No part of this assignment has been copied manually or electronically from any other source * (including web sites) or distributed to other students. 
 * * * Name:Krish Harshadkumar Patel Student ID: 123898215 Date: 2023-01-17* Cyclic Link: _______________________________________________________________ * ********************************************************************************/
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

const HTTP_PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json({ message: "API Listening" });
    //res.json({message:process.env.MESSAGE})
})

//add new movie
app.post("/api/movies", (req, res) => {
    db.addNewMovie(req.body).then(data => {
        res.json(data); console.log("post")
    }).catch(err => {
        res.status(404).json({ message: "failed to add movie" });
    })
});

//get specific movies that is This route must accept the numeric query parameters "page" and "perPage" as well as the (optional) string
//parameter "title", ie: /api/movies?page=1&perPage=5&title=The Avengers
app.get("/api/movies", (req, res) => {
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
        .then(movies => {
            res.status(200).json(movies);
        }).catch(err => {
            res.status(400).json({ message: err });
        })
});

//get movie by id that is This route must accept a route parameter that represents the _id of the desired movie object, ie:
// /api/movies/573a1391f29313caabcd956e.
app.get("/api/movies/:id", (req, res) => {
    db.getMovieById(req.params.id).then(movie => {
        res.status(200).json(movie);
        console.log("run");
    }).catch(err => {
        res.status(400).json({ message: err });
    })
});

//update movie by id that is This route must accept a route parameter that represents the _id of the desired movie object, ie:
// /api/movies/573a1391f29313caabcd956e
app.put("/api/movies/:id", (req, res) => {
    db.updateMovieById(req.body).then(() => {
        console.log("put run");
        res.status(200).json({ message: "successfully updated" });
    }).catch(err => {
        res.status(400).json({ message: "failed to update" })
    })
});

//delete movies that is This route must accept a route parameter that represents the _id of the desired movie object, ie:
// /api/movies/573a1391f29313caabcd956e
app.delete("/api/movies/:id", (req, res) => {
    db.deleteMovieById(req.params.id).then(() => {
        res.status(200).json({ message: "successful delete" });
    }).catch(err => {
        res.status(400).json({ message: err }); console.log("error in delete");

    });
});

db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});

// app.listen(HTTP_PORT,()=>{
//     console.log('server listening on:'+HTTP_PORT);
// })