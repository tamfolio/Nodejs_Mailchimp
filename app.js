const express = require("express");
const bodyParser = require("body-parser")
const request = require("request")
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const https = require("https")


app.use(express.static("Public"));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req,res){
        const firstName = req.body.fName
        const lastName = req.body.lName
        const email = req.body.emailInput

        var data = {
            members: [
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName
                    }
                }
            ]
        };

        const jsonData = JSON.stringify(data);

        const options = {
            method: "POST",
            auth: "Tamilore:bfca8ecd837cc5a9004bee910e27728a-us21"
        }
        const url = "https://us21.api.mailchimp.com/3.0/lists/b3ae04ce4"
        const request = https.request(url, options, function(response){
            if(response.statusCode === 200){
                res.sendFile(__dirname + '/success.html')
            } else {
                res.sendFile(__dirname + '/failure.html')
            }
            response.on("data", function(data){
                console.log(JSON.parse(data));
            })
        })

        request.write(jsonData);
        request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
})


app.listen(3400, function(){
    console.log("Server running on Port 3400");
})

//mailchip api key
// bfca8ecd837cc5a9004bee910e27728a-us21

//list id
//fb3ae04ce4