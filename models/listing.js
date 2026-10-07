const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://unsplash.com/photos/a-white-house-surrounded-by-palm-trees-on-a-sunny-day-luUA4PLq2hs",
            set: (v) =>
                v === ""
                    ? "https://unsplash.com/photos/a-white-house-surrounded-by-palm-trees-on-a-sunny-day-luUA4PLq2hs"
                    : v
        }
    },

    price: {
        type: Number
    },

    location: {
        type: String
    },

    country: {
        type: String
    }
});

const listing = mongoose.model("listing",listingSchema);
module.exports=listing;