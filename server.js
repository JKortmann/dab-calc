const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/', express.static('public'));
app.use(bodyParser.json());

app.get('/:operants', (req, res) => {
    switch (req.params.operants) {
        case 'calculator': {
            res.render('calculator');
            break;
        }
    }
});

app.post('/:operants', (req, res) => {
    switch (req.params.operants) {
        case 'mathAPI': {
            let mathString = req.body[0]["string"];
            res.send(JSON.stringify([{"result": eval(mathString).toString()}]));
            break;
        }
    }
});

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, function () {
    console.log(`Online calculator listening on port ${port}`);
});
