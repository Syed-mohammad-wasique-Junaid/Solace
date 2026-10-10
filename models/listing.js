
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
            default: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
            set: (v) =>
                v === ""
                    ? "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
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

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;
