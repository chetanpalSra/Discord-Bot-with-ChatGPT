const shortid = require('shortid');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Url = require('./modal/url');

// Define the port and set it dynamically or as needed
const PORT = 7009;

mongoose.connect('mongodb://127.0.0.1:27017/Bot').then(()=>{
    console.log('Connected to MongoDb.');
}).catch((error)=>{
    console.log('An error occurred:',error);  
});

// Create a function that generates a short ID.
async function createShortId(url) {
    
    if (!url) {
        return console.log('No url found!');
    }

    const shortID = shortid(8);  // Fix the shortid method to generate an ID

    await Url.create({
        shortId: shortID,
        redirectUrl: url
    })

    return shortID;
}
 
app.get('/:id',async(req,res)=>{
    const id = req.params.id;
    
    const document = await Url.findOne({shortId: id}); // returns object.

    const redirectUrl = document.redirectUrl;

   if (redirectUrl) {
    res.redirect(redirectUrl);  // Redirect to the actual URL, not back to the short URL
   } else {
    res.status(404).send("Not found");
    }
})

// Export the function without starting the server immediately
module.exports = { createShortId };

// If you need to start the server separately, create a function to start it
function startServer() {
    app.listen(PORT, () => {
        console.log(`Server started at PORT: ${PORT}`);
    });
}

 

// Export the startServer function separately, in case needed
module.exports.startServer = startServer;


// urlEmitter.on('urlUpdated',(newUrl)=>{
//     new_Url = newUrl;
//     console.log('The new url is:',new_Url);
    
// });

