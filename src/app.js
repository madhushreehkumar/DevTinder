const express=require('express');

const app=express();



app.use("/test",(req,res)=>{
    res.send('Welcome Home!');
});

app.use("/namaste", (req, res) => {
 res.send("namaste!!");
});

app.use('/',(req,res)=>{
        res.send("Hello server")
});


app.listen(3000,()=>{
    console.log("Server started to listen");
});

