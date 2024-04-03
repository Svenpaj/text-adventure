const express = require('express');
const app = express();
const port = 3001;
const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend')));

/*app.get('/', (req, res) => {
   res.send('Hello this the backend telling you that the server is running. And I have a secret to tell you.. I am hiding a an adventure game in the backend.');
});*/

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});