const scrapPage = require('./scraper');
const saveData = require('./database');
const serverless = require('serverless-http');
const express = require("express");

// Create the express app
const app = express();

const router = express.Router();

module.exports.handler = serverless(app);

const scrapDolar = async () => {
    const date = new Date(Date.now());
    const day = date.getDate();
    const hour = date.getHours();
    console.log(`ScrapDollar between 0-23 - ${date}`);

    if(day == 12 && hour >= 0 && hour < 23)
    {
        console.log(`Scraping ! (${date})`);

        // Scrap dolarhoy data
        let pageData = await scrapPage('https://dolarhoy.com/');

        // Save data
        await saveData(pageData);
    }

    console.log("waiting");

    await setTimeout(() => scrapDolar(), 1000); //60000
}

const gaga = async () => {
    console.log("A");
    await setTimeout(() => gaga(), 1000); //60000
}

router.get("/", async (req, res) => {

    scrapDolar();

    //gaga();

    res.json({
        "message": "Started 1"
    });
});

app.use('/.netlify/functions/api', router);

/*app.listen(1337, async (req,res) => {
    console.log("running on 1337");
    //scrapDolar();

    //res.send('Started !');
});*/