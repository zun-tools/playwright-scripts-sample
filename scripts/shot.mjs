// スクショを撮る: 品物を2つ入れた買い物メモを PNG に残す
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 480, height: 360 } });
await page.goto('http://localhost:8080/');
for (const name of ['牛乳', '卵']) {
  await page.getByLabel('品物').fill(name);
  await page.getByRole('button', { name: '追加' }).click();
}
await page.screenshot({ path: 'out/memo.png' });
await browser.close();
console.log('out/memo.png');
