import express from 'express';
import { join } from 'path';

const app = express();
const port = 3001;


app.use(express.static('public'));

/*app.get('/', (req, res) => {
   res.send('Hello this the backend telling you that the server is running. And I have a secret to tell you.. I am hiding a an adventure game in the backend.');
});*/

app.listen(port, () => {
    console.log(`Game server listening at http://localhost:${port}`);
});