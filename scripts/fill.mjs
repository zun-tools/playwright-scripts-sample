// 定型の入力: いつもの品物を一度に入れて、残りの数を読む
import { chromium } from 'playwright';
const items = ['牛乳', '卵', 'パン', 'バナナ', '豆腐'];
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:8080/');
for (const name of items) {
  await page.getByLabel('品物').fill(name);
  await page.getByRole('button', { name: '追加' }).click();
}
console.log(await page.getByRole('status').textContent());
await browser.close();
