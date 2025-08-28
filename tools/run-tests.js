const path = require('path');
const httpServer = require('http-server');
const puppeteer = require('puppeteer');

async function run() {
  const root = path.resolve(__dirname, '..');
  const server = httpServer.createServer({ root });
  const port = 8080;

  server.listen(port);
  console.log(`Server started at http://localhost:${port}`);

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);

  try {
    await page.goto(`http://localhost:${port}/test.html`, { waitUntil: 'networkidle2' });

    // Wait for status box to appear or timeout
    await page.waitForSelector('#status', { visible: true, timeout: 7000 });
    const text = await page.$eval('#status', el => el.textContent.trim());

    console.log('Test page status:', text);

    await browser.close();
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Headless test failed:', err.message);
    await browser.close();
    server.close();
    process.exit(2);
  }
}

run();
