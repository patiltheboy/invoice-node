const express = require('express')
const path = require('path')
const dotenv = require('dotenv');
var bodyParser = require('body-parser')
const cors = require('cors');

const app = express()

app.use(cors());

dotenv.config({ path: './config/config.env' });
dotenv.config({ path: __dirname + './config/config.env'  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/style.css',function (req, res) {
//     res.sendFile(__dirname + "/public/css/style.css");
// });

app.get('/', (req, res)=>{
    return res.send('You are hacked!')
})
app.use("/invoice", require("./src/routes/routes"))


const port = process.env.PORT || 3500
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
