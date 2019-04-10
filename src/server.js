const express = require ("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use ( cors() );

const server = require ("http").Server(app);
const io = require("socket.io")(server)

io.on("connection", socket => {
    //console.log("ok socket");
    socket.on('connectionRoom', box => {
        socket.join(box);
    })
});

mongoose.connect(
    'mongodb+srv://omnistack:Atos2024@omnistack6-enc5i.mongodb.net/omnistack?retryWrites=true', 
    {
        useNewUrlParser: true
    }
);

// Teste inicnial do Express
// app.get('/teste', (req, res) => {
//     return res.send("Oi Masp")
// });

app.use( (req, res, next) => {
    req.io = io;

    return next();
});

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ));
app.use( '/files', express.static(path.resolve(__dirname, '..', 'temp') ) );

app.use(require("./routes"));

server.listen(8080);

