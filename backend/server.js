const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require("./Database/customer")
const Driver = require("./Database/driver")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const admin = require('./Database/admin');
const Dustbin = require("./Database/dustbin")
require('dotenv').config();

/* const add = async () => {

    const saltRounds = 10
    let hashedPassword = await bcrypt.hashSync("0000", saltRounds);

    const newDriver = new Driver({
        name: "Ramesh",
        cellNo: 623673786832,
        pan: "EKhdsf4578C",
        license: "7843g5ghhg",
        region: "Mumbai Suburban",
        regionCode: "002M",
        emailId: "R@gmail.com",
        password: hashedPassword,
    })

    await newDriver.save()
}

add() */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'exp://192.168.1.40:8081',
    optionsSuccessStatus: 200,
};

app.use(cors());

const authToken = (userId) => {
    const payload = { userId }
    const accessToken = jwt.sign(payload, `${process.env.SECRET}`)
    return accessToken
}

app.post("/api/login", async (req, res) => {
    const { email, password, userType } = req.body

    let user, dbPassword;

    if (userType === "customer") {
        user = await User.findOne({ emailId: email });
    } else if (userType === "Driver") {
        user = await Driver.findOne({ emailId: email });
    } else {
        user = await Driver.findOne({ emailId: email });
    }

    if (!user) {
        return res.send({ Message: "Invalid username" });
    }

    dbPassword = user.password;

    const match = await bcrypt.compare(password, dbPassword);

    if (match) {
        const userID = user._id;
        const token = authToken(userID);
        res.send({ Message: "Login Successfull", token: token });
    } else {
        res.send({
            Message: "Invalid Credentials"
        });
    }


})

app.post("/api/register", async (req, res) => {
    const { email, password, address, location: { latitude, longitude }, region } = req.body

    const saltRounds = 10
    let hashedPassword = await bcrypt.hashSync(password, saltRounds);

    const newUser = new User({
        emailId: email,
        password: hashedPassword,
        address,
        location: {
            lat: latitude,
            lng: longitude
        },
        region
    });
    return await newUser.save();
})

app.post("/api/addBin", async (req, res) => {
    const { name, location: { latitude, longitude }, id } = req.body
    try {
        const user = await User.findOne({ _id: id.userId })
        const newBin = new Dustbin({
            name,
            location: {
                lat: latitude,
                lng: longitude
            },
            region: user.region,
            status: false,
            address: user.address
        })
        await newBin.save()

        res.send({
            Message: "Created"
        })
    } catch (error) {
        console.log(error)
    }
})

app.post("/api/getBin", async (req, res) => {
    const { id } = req.body
    const usr = await User.findOne({ _id: id.userId })
    const Bin = await Dustbin.find({ address: usr.address })
    console.log(Bin)
    res.send(Bin)
})

app.delete("/api/dropBin", async (req, res) => {
    const { name } = req.body

    await Dustbin.findOneAndDelete({ name })

    res.send({
        Mesages: "Deleted successfully"
    })
})

app.post("/api/editStatus", async (req, res) => {

    const { name, status } = req.body

    const updateResult = await Dustbin.updateOne(
        { name: name },
        {
            $set: {
                status
            }
        },
        { upsert: false }
    )

    if (updateResult.nModified === 1) {
        return {
            Message: "Dustbin Updated Successfully"
        }
    }
})

app.post("/api/allBins", async (req, res) => {

    const Bins = await Dustbin.find()
    res.send(Bins)
})

async function startServer() {
    app.listen(5000, () => {
        console.log('Server started on port 5000');
    });
}

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connection successful")
        return startServer()
    })
    .catch((error) => {
        console.log(error)
    })