import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const URL = 'file://' + join(__dirname, '..', 'index.html');
const OUT = join(__dirname, 'shots');
import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive:true });
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

(async()=>{
  const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
  const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
  const page=await ctx.newPage();
  await page.goto(URL,{waitUntil:'load'});
  await page.evaluate(()=>window.__CORLEONE__.forceStart());
  await sleep(400);
  const shot=(n)=>page.locator('#game').screenshot({path:join(OUT,n+'.png')});
  await shot('1-intro');
  await page.evaluate(()=>{const A=window.__CORLEONE__;A.simTap(135,360);}); await sleep(60);
  await page.evaluate(()=>window.__CORLEONE__.simRelease()); await sleep(300);
  await shot('2-hub');
  // each game story + play
  const ids=['wedding','horse','restaurant','oranges','tollbooth','baptism'];
  for(const id of ids){
    await page.evaluate(g=>window.__CORLEONE__.launchGame(g),id); await sleep(300);
    await shot('g-'+id+'-story');
    // start
    await page.evaluate(()=>{window.__CORLEONE__.simTap(135,420);}); await sleep(80);
    await page.evaluate(()=>window.__CORLEONE__.simRelease()); await sleep(700);
    // a little interaction
    for(let k=0;k<10;k++){await page.evaluate(([x,y])=>{window.__CORLEONE__.simTap(x,y);},[80+k*20,150+k*15]);await sleep(40);await page.evaluate(()=>window.__CORLEONE__.simRelease());await sleep(40);}
    await sleep(400);
    await shot('g-'+id+'-play');
    await page.evaluate(()=>window.__CORLEONE__.setScene(window.__CORLEONE__.scene));
    await page.evaluate(()=>window.__CORLEONE__.launchGame('wedding'));
    await page.evaluate(g=>window.__CORLEONE__.setScene(window.__CORLEONE__.scene));
  }
  await browser.close();
  console.log('shots written to',OUT);
})();
