const express = require ("express") ;
const http = require("http") ;
const cors = require("cors") ;
const app = express() ;
const { Server } = require("socket.io") 


app.use( cors() )

const server = http.createServer( app ) ;

const io = new Server( server  , {
    cors : {
        origin: "http://localhost:5173" ,
        methods: ["GET" , "POST"]
    }
}) ; 

io.on('connection' ,  ( socket ) => {
    console.log(` Usuario Actual : ${socket.id}`)
   
    socket.on("join_room" , ( data ) => {
        socket.join( data )
        console.log(`Usuario con ID : ( ${socket.id} ) se unio a la sala : ( ${ data } )`)
    })

    socket.on("send_message", (data) => {
        console.log("Mensaje recibido");
        console.log(data);
    });


    socket.on("disconnect" , () => {
        console.log( `Usuario con ID : ( ${socket.id} ) se ha desconectado`)
    })
} )

server.listen( 3001 , () => {
    console.log( " Servidor corriendo en Puerto 3001 ")
})