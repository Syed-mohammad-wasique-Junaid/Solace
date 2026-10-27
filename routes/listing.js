const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");

const validateListing = (req,res,next) => {
    console.log(req.body.listing);
    let { error } = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//index route
router.get("/",wrapAsync(async (req,res) => {
    const allListings= await listing.find({});
    res.render("listings/index.ejs",{allListings});
    })
);


//New route
router.get("/new" ,wrapAsync(async (req,res) => {
    res.render("listings/new.ejs");
    })
);

//show route
router.get("/:id" ,wrapAsync(async (req,res) => {
    let {id} = req.params;
    let onelisting  = await listing.findById(id).populate("reviews");
    if(!onelisting){
        req.flash("error","listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{onelisting});
    })
);

//create route
router.post("/", validateListing, wrapAsync(async (req,res,next) => {
        const newlisting = new listing(req.body.listing);
        await newlisting.save();
        req.flash("success","New Listing Created!");
        res.redirect("/listings");
    })
);


//edit route
router.get("/:id/edit" ,wrapAsync(async (req,res) => {
    let {id} = req.params;
    let editlisting  = await listing.findById(id);
    if(!editlisting){
        req.flash("error","listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{editlisting});
    })
);

//update route
router.put("/:id", validateListing ,wrapAsync(async (req,res) => {
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success","Listing updated!");
    res.redirect(`/listings/${id}`);
    })
);

//delete route
router.delete("/:id" ,wrapAsync(async (req,res) => {
    let {id} = req.params;
    let deletedList=await listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success"," Listing Deleted");
    res.redirect("/listings");
    })
);

module.exports = router ;