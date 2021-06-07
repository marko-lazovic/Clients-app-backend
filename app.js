const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`${__dirname}/data/clients.json`));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.status(200).json(data);
})

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})