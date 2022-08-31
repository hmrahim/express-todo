const express = require("express")
const cors = require("cors")
require("dotenv").config()
const app = express()
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');




app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.trq2z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    const run = async ()=> {
        
        try {
          const database = await  client.connect()

          if(database){
            console.log("database connected")
          }

        //   collections =========
        const todoCollection = client.db("todos").collection("todocollection")
        






       app.post("/todo",async(req,res)=> {
        const data = req.body
        const result = await todoCollection.insertOne(data)
        res.send(result)

       })

       app.get("/todo",async(req,res)=> {
        const data = await todoCollection.find().toArray()
        res.send(data)

       })

       app.get("/todo/:id",async(req,res)=> {
        const id = req.params.id
        const data = await todoCollection.findOne({_id:ObjectId(id)})
        res.send(data)

       })


    //    app.get("/test",(req,res)=> {
    //     res.send("working")
    //    })

          

            
        } finally{

        }
    }


    run().catch(console.dir)



app.get("/",(req,res)=> {
res.send("hello im from hom page")
})


app.listen(5000,()=> {
    console.log("server is running on port 5000");
})