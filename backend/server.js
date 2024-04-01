const express = require('express');
const app = express();
const port = 3001;
const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend')));

/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});*/

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});