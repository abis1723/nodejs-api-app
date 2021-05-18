const express = require('express');
const test1 = require('./util/test1')
const test12 = require('./util/test2')

const app = express();
const port  = 9999;

app.use(express.json())

app.listen(port,() => {
    test1.findDivisible();
    test12.submitResults();
    console.log(`app listening at http://localhost:${port}`)
})