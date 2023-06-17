const puppeteer = require ('puppeteer')

async function start() 
{
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userdatadir: "./tmp"
    });
    const page = await browser.newPage()

    await page.goto("https://www.amazon.in/s?rh=n%3A11462463031&fs=true&ref=lp_11462463031_sar")


    const productHandles = await page.$$('div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item')
    

    

    for( let producthandle of productHandles)
    {
        try 
        {
            const productName = await page.evaluate(el => el.querySelector("h2 > a > span").textContent, producthandle)

            console.log(productName)
    
            const price = await page.evaluate(el => el.querySelector(".a-price > .a-offscreen").textContent, producthandle)
    
            console.log(price)
    
            const rating = await page.evaluate(el => el.querySelector(".a-icon.a-icon-star-small.a-star-small-4-5.aok-align-bottom > span").textContent, producthandle)
    
            console.log(rating) 

            console.log('\n')
        } 
        catch (error) {}
        
    }
    await browser.close() 
} 

start();