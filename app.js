const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const mongo_url = "mongodb://127.0.0.1:27017/solace";

main().then( () => {
    console.log("connected to DB");
}).catch( (err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

app.get("/", (req,res) => {
    res.send("hi i am root !");
});

//index route
app.get("/listings",async (req,res) => {
    const allListings= await listing.find({});
    res.render("listings/index.ejs",{allListings});
});


//New route
app.get("/listings/new" ,async (req,res) => {
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id" ,async (req,res) => {
    let {id} = req.params;
    let onelisting  = await listing.findById(id);
    res.render("listings/show.ejs",{onelisting});
});

//create route
app.post("/listings",async (req,res) => {
    // let {title ,description ,price  ,image ,country ,location} =req.body;
    const newlisting = new listing(req.body.listing);
    await newlisting.save().then( res => {
        console.log(res);
    }).catch( err => {
        console.log(err);
    });
    res.redirect("/listings");
});


//edit route
app.get("/listings/:id/edit" ,async (req,res) => {
    let {id} = req.params;
    let editlisting  = await listing.findById(id);
    res.render("listings/edit.ejs",{editlisting});
});

//update route
app.put("/listings/:id",async (req,res) => {
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id" ,async (req,res) => {
    let {id} = req.params;
    let deletedList=await listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listings");
});
// app.get("/testlisting", async (req,res)=> {
//     let samplelisting = new listing({
//         title : "la vi ville",
//         description : "experience this stay at the highest of your escape",
//         price : 6000,
//         location : "honnavar",
//         country : "india"
//     });
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("successfull testing");
// });

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});