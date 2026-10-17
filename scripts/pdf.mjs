// PDF にする: 買い物メモを A5 の PDF にして印刷用に残す
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:8080/');
for (const name of ['牛乳', '卵', 'パン']) {
  await page.getByLabel('品物').fill(name);
  await page.getByRole('button', { name: '追加' }).click();
}
await page.pdf({ path: 'out/memo.pdf', format: 'A5' });
await browser.close();
console.log('out/memo.pdf');
