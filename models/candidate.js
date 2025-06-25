const mongo = require("mongoose");

const candidateSchema = new mongo.Schema({
    name:{
        type: String,
        required: true
    },
    party:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    votes:[
        {
            user:{
                type: mongo.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            votedAt:{
                type: Date,
                required: true,
                default: Date.now()
            }
        }
    ],
    voteCount:{
        type: Number,
        default: 0
    }
});

const Candidate  = new mongo.model('candidate', candidateSchema);
module.exports = Candidate;