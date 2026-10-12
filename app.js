const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");

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
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());

app.get("/", (req,res) => {
    res.send("hi i am root !");
});

const validateListing = (req,res,next) => {
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}
//index route
app.get("/listings",wrapAsync(async (req,res) => {
    const allListings= await listing.find({});
    res.render("listings/index.ejs",{allListings});
    })
);


//New route
app.get("/listings/new" ,wrapAsync(async (req,res) => {
    res.render("listings/new.ejs");
    })
);

//show route
app.get("/listings/:id" ,wrapAsync(async (req,res) => {
    let {id} = req.params;
    let onelisting  = await listing.findById(id);
    res.render("listings/show.ejs",{onelisting});
    })
);

//create route
app.post("/listings", validateListing, wrapAsync(async (req,res,next) => {
        const newlisting = new listing(req.body.listing);
        await newlisting.save();
        res.redirect("/listings");
    })
);


//edit route
app.get("/listings/:id/edit" ,wrapAsync(async (req,res) => {
    let {id} = req.params;
    let editlisting  = await listing.findById(id);
    res.render("listings/edit.ejs",{editlisting});
    })
);

//update route
app.put("/listings/:id", validateListing ,wrapAsync(async (req,res) => {
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
    })
);

//delete route
app.delete("/listings/:id" ,wrapAsync(async (req,res) => {
    let {id} = req.params;
    let deletedList=await listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listings");
    })
);
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

/*this below middleware is for any unknown page request handling 
with earlier syntax was -> "*" and now it is -> "/{*splat}" */
app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

//error handling middleware
app.use((err,req,res,next) => {
    let {statusCode=500,message="Something went Wrong!"} = err;
    res.status(statusCode).render("error.ejs" ,{message});
    // res.status(statusCode).send(message);
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});