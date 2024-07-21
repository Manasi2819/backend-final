const mongoose = require('mongoose')


const empc = mongoose.model('product',

    {
        _id: String,
        title: String,
        category: String,
        image: String,
        price: String
        
    }
)
module.exports = empc

