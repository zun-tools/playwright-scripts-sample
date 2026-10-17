// 買い物メモの定型確認（テストランナーを使わない Playwright ライブラリのスクリプト）
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:8080/');
for (const name of ['牛乳', '卵']) {
  await page.getByLabel('品物').fill(name);
  await page.getByRole('button', { name: '追加' }).click();
}
await page.getByRole('checkbox', { name: '牛乳' }).check();
console.log(await page.getByRole('status').textContent());
await browser.close();
