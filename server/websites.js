var websitesRouter = require('express').Router();
var fs = require('fs');

var websites = [
    {
        id: '1',
        site: 'Google',
        domain: 'google.com',
        began: 1996,
        type: 'Internet services and products'
    },
    {
        id: '2',
        site: 'YouTube',
        domain: 'youtube.com',
        began: 2005,
        type: 'Video sharing'
    },
    {
        id: '3',
        site: 'Facebook',
        domain: 'facebook.com',
        began: 2004,
        type: 'Social network'
    }
];
var id = 3;

var updateId = function (req, res, next) {
    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }

    next();
};

websitesRouter.param('id', (req, res, next, id) => {
    var site = websites.find(site => {
        return site.id == id;
    });

    if (site) {
        req.site = site;
        next();
    } else {
        res.send();
    }
});

websitesRouter.get('/', (req, res) => {
    console.log("websites.js - 44")
    res.json(websites);
});
websitesRouter.get('/onepage', (req, res) => {
    fs.readFile("../client/onepage.html", function (error, pgres) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(pgres);
        }

        res.end();
    });
});

websitesRouter.get('/:id', (req, res) => {
    var site = req.site;

    res.json(site || {});
});

websitesRouter.post('/', updateId, (req, res) => {
    var site = req.body;

    websites.push(site);

    res.json(site);
});

websitesRouter.put('/:id', (req, res) => {
    var update = req.body;
    if (update.id) {
        delete update.id;
    }

    var site = websites.findIndex(site => site.id == req.params.id);
    if (!websites[site]) {
        res.send();
    } else {
        var updatedsite = Object.assign(websites[site], update);
        res.json(updatedsite);
    }
});

websitesRouter.delete('/:id', (req, res) => {
    var site = websites.findIndex(site => site.id == req.params.id);
    if (!websites[site]) {
        res.send();
    } else {
        var deletedsite = websites[site];
        websites.splice(site, 1);
        res.json(deletedsite);
    }
});

module.exports = websitesRouter;