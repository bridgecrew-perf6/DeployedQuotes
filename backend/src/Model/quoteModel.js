import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    name : {type:String, required :true},
    by : {type : mongoose.Schema.Types.ObjectId, ref : "user", required : true}

},{
    timestamps :true
})

const QuoteModel = mongoose.model("quote",quoteSchema)
export {QuoteModel}