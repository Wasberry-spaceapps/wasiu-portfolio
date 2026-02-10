const express = require('express');
const app = express();
app.use(express.json());

const customers = [];

app.post('/api/customers', (req, res) => {
  customers.push(req.body);
  res.json({success: true, id: customers.length});
});

app.listen(3000, ()=>console.log('API on 3001'));