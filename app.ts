//require all necessary modules here:
let express=require("express");
let app=express();
let bodyParser=require("body-parser");


//middlewares
app.use(express.json({  extended: true }));
app.use(express.urlencoded({  extended: true }));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));


//Database Connect
const mongoose = require('mongoose');
const uri = "mongodb+srv://ahmedkhandelhi123:mJz7y3TOhsGZkbzd@cluster0.um4f2ys.mongodb.net/TodoNotes";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);


let TodoSchema={
    name:String
}

let Note=mongoose.model("Note",TodoSchema);

let item1=new Note({
    name:"Demo"
});

let d=[item1];
let i:any;
app.get("/",async(_req:any,_res:any)=>{

try{
 const item= await Note.find({});
  // res.status(200).json(item);
if(item.length===0)
{
  Note.insertMany(d)
.then(function () {
  console.log("Successfully saved defult items to DB");
})
.catch(function (_err:any) {
  console.log(_err);
});

_res.redirect("/")
  
}
else{
  _res.render("list",{Items:item});
}

 
}
catch(_err)
{
  _res.status(500);
  console.log(_err)

}
    // res.render("list",{Items:i1});

});

app.post("/",function (_req:any,_res:any){

   
 i=_req.body.n;
 
//  i1.push(i)
//     console.log(i1);

const item=new Note({
  name:i
})
item.save();
    _res.redirect("/");
});



app.post("/delete",async(_req:any,_res:any)=>{

  let check=_req.body.checkbox;
  
 try{

  let findUser=await Note.findByIdAndDelete(check);
  console.log("deleted sucessfully");
 }

 catch(_err)
 {

 }
 _res.redirect("/");
  });

//Listining Server at PortNo:3000
app.listen(3000,function()
{
    console.log("Server is running");
})