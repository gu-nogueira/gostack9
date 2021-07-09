const path = require('path');
const express = require('express');

const app = express();

const publicSitePath = path.join(__dirname, '../../Onmai/sites/onmai.com.br/Public');

app.use(express.static(publicSitePath, {extensions: ['html']}));

app.use(function (req, res) {
  res.status(404).sendFile(publicSitePath + '/404.html')
})

app.listen(2500, () => {
  console.log('Listening in: http://localhost:2500'); 
})


