const scrapPage = require('./scraper');
const saveData = require('./database');


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

    await setTimeout(() => scrapDolar(), 60000);
}