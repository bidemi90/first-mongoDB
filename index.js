const express = require("express")
const app = express()
const ejs = require("ejs")
const mongoose = require("mongoose")
const bodypaser = require("body-parser")
app.set("view engine", "ejs")
app.use(bodypaser.json())
app.use(bodypaser.urlencoded({ extends: true }))





const uri = "mongodb+srv://sodiqabdullahi431:sodiq&678@abdullahi.jjszk98.mongodb.net/firstmogoDBclass?retryWrites=true&w=majority"




const connect = async () => {

    try {

        mongoose.set("strictQuery", false)
        await mongoose.connect(uri).then((result) => {
            console.log("first mongodb ass been connect");
        })

    } catch (error) {
        console.log(error);
    }
}
connect()



let usertablestyle = mongoose.Schema({
    name: String,
    email: String,
    phone_number: String,
    password: String

})
let todoSchema = mongoose.Schema({
    tododoc: String

})

let userModel = mongoose.model.usertable || mongoose.model("usertable", usertablestyle)
let todomodel = mongoose.model.todotable || mongoose.model("todotable", todoSchema)

app.get("/signup", (req, res) => {
    res.render("signup", { message: "" })
})

app.post("/signup", async (req, res) => {
    console.log(req.body);
    let data = req.body
    let filledform = new userModel(data)
    filledform.save().then((result) => {
        console.log(result);
        // res.render("signup", { message: "successful" })
        res.redirect("/login")
    }).catch((error) => {
        console.log(error);
    })

})

app.get("/login", (req, res, next) => {
    res.render("login", { message: "" })
})


app.post("/login", async (req, res, next) => {
    console.log(req.body);
    let data = req.body
    let email = data.email
    let password = data.password
    await userModel.findOne({ email: email }).then((result) => {
        if (result.password == password) {
           
            res.render("dashbord", { message: "login successful" ,result:""})
        } else {
            res.render("login", { message: "invalid password" })
        }
    }).catch((error) => {
        console.log(error);
        res.render("login", { message: "user not found" })
    })

})

app.get("/dashbord", (req, res, next) => {
    res.render("dashbord", { message: "" })
})

app.post("/dashbord", async (req, res) => {

    try {
        let data = req.body
        console.log(data);
        let filledform = new todomodel(data)
        await filledform.save().then((result) => {
            console.log(result);
            todomodel.find().then((result2)=>{
                res.render("dashbord", { message: "successful" ,result:result2})
            })

        }).catch((error) => {
            console.log(error);

            res.render("dashbord", { message: error ,tododo:''})
        })
    } catch (err) {
        res.render("dashbord", { message: err ,tododo:''})
        next()

    }

})



app.listen("5005", () => {
    console.log("first mogoDB server is no fire");
})