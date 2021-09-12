const puppeteer = require('puppeteer');

const scrapPage = async (url) => {

    var state = {}
    state.url = url;

    // Creates a new browser with a new page.
    const instanciatePage = async () => {        
        console.log(`Creating a new instance of a Browser and a Page`);
        state.browser = await puppeteer.launch({
            headless: true,
        });
        console.log("1");
        state.page = await state.browser.newPage();    
        console.log("2");
    }

    // Go to a page.
    const goToPage = async () => {
        console.log(`Go to ${state.url}`);
        if(!state.page) {
            await instanciatePage();
        }      
        console.log("3");
        await state.page.goto(state.url);
    }
    
    // Refresh the page.
    const refreshPage = async () => {
        console.log(`Refreshing (${state.url}) --> ${state.page}`);
        await state.page.reload();
    }
    
    // Scrap the dollar data from the page.
    const scrapPage = async () => {
        console.log(`Scraping page ${state.page} ...`);
        const dollarData = await state.page.evaluate(() => {
            return Array.from(document.getElementsByClassName('val'), element => element.textContent);
        });
        console.log(`... pageData ${dollarData}`);
        return dollarData;
    }

    await goToPage();
    return await scrapPage();
}