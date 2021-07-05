const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const fs = require('fs');
const { error } = require('console');

let data = JSON.parse(fs.readFileSync(`${__dirname}/data/clients.json`));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.status(200).json(data);
})

app.post('/client', (req,res) => {
   const client = req.body;
   client.id = !!data.clients.length ? data.clients[data.clients.length-1].id + 1 : 0;
   let newData = {clients: [...data.clients, client]}
   fs.writeFile(`${__dirname}/data/clients.json`, JSON.stringify(newData), (err) => {
         data = newData;
         res.status(201).json({message: 'client added'});
   })});



app.put('/client', (req, res) => {
   const updatedClient = req.body;
   const id = updatedClient.id;

   let newData = {clients: data.clients.map( client => client.id !== id ? client : updatedClient)}
   fs.writeFile(`${__dirname}/data/clients.json`, JSON.stringify(newData), (err) => {
      data = newData;
      res.status(204).json({message: 'client updated'});
   })});

   app.delete('/client', (req, res) => {
      const client = req.body;
      const id = client.id;
      let newData = {clients: data.clients.filter(client => client.id !== id)}
      fs.writeFile(`${__dirname}/data/clients.json`, JSON.stringify(newData), (err) => {
         data = newData;
         res.status(204).json({message: 'client deleted'});
      })});
  

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})