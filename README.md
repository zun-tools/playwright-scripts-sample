# 買い物メモ（Playwright 再入門 4 のサンプル）

YouTube「ずんだもんの実験道具箱」の動画「Playwright 再入門 4」で使ったサンプルです。動画と同じ中身を保つため、公開後は書き換えません。

同じ確認「牛乳と卵を足して、牛乳にチェックすると『残り 1 品』になるか」を、4通りで試せます。

| やり方 | 何を使うか | このリポの物 |
|---|---|---|
| テストとして残す | `@playwright/test` | `tests/shopping.spec.js` |
| スクリプト | `playwright`（ライブラリ） | `scripts/check.mjs`（同じ確認）・`shot.mjs`・`pdf.mjs`・`fill.mjs` |
| AI にその場で見させる（MCP） | Playwright に同梱の MCP サーバ | 足し方は下 |
| AI にその場で見させる（CLI） | Playwright に同梱の `playwright-cli` | `.playwright/cli.config.json` |

画面は2つあります。`index.html`（買い物メモ）と `big.html`（開いたときに品物が 100 件入っている版）。

## ブラウザについて

MCP と CLI は、**既定では手元の Chrome を使います**。このサンプルは、`npx playwright install chromium` で入れた Chromium を使う設定を同梱しています（`.playwright/cli.config.json`・CLI が自動で読みます）。MCP は設定ファイルを読まないので、足すときに旗で渡します（下）。

## 準備

```bash
npm install
npx playwright install chromium
npm run serve                  # http://localhost:8080/ で配る（別の端末で開いたままにする）
```

## テストとして残す・スクリプト

```bash
npx playwright test            # 1 passed（テストはページを自分で配るので、npm run serve が無くても動く）
node scripts/check.mjs         # 「残り 1 品」と出る（同じ確認のスクリプト）
node scripts/shot.mjs          # out/memo.png（品物を2つ入れた画面）
node scripts/pdf.mjs           # out/memo.pdf（品物を3つ入れた A5 の PDF）
node scripts/fill.mjs          # 「残り 5 品」と出る
```

## 今夜の一手（CLI）

```bash
npx playwright cli install --skills     # .claude/skills/playwright-cli/ に CLI のスキルが入る
claude                                   # このフォルダで Claude Code を開き、次の文を頼む
```

```text
http://localhost:8080/ の買い物メモで、品物「牛乳」と「卵」を追加してから「牛乳」にチェックを入れると、画面の表示が「残り 1 品」になるか確かめてください。最後に「はい／いいえ」と根拠を1行で答えてください。ブラウザの操作には playwright-cli（このフォルダでは `npx playwright cli`）を使うこと。
```

MCP で頼むときは、最後の1文を「ブラウザの操作には playwright MCP のツールを使うこと。」にします。`big.html` で試すときは URL を `http://localhost:8080/big.html`、期待を「残り 101 品」にします。

## MCP の足し方（うちが足した形）

公式ページの形は単体のパッケージ `claude mcp add playwright npx @playwright/mcp@latest` です。このサンプルは Playwright 本体に同梱の `npx playwright mcp` を使い、**プロジェクトの設定にだけ**足します（`--scope project`）。

```bash
claude mcp add --scope project playwright -- npx playwright mcp --headless --executable-path <Playwright が入れた Chromium の場所>
```

`<…の場所>` は `npx playwright install --dry-run chromium` の「Install location」の下の `chrome-linux*/chrome`（Mac は `chrome-mac*/…`）です。Chrome の入っている端末では、旗なしでも動くはずです（このサンプルでは未確認）。外すときは `claude mcp remove playwright --scope project` です。

## 手で CLI を叩いて同じ確認をする

```bash
npx playwright cli open http://localhost:8080/
npx playwright cli fill "getByLabel('品物')" 牛乳
npx playwright cli click "getByRole('button', { name: '追加' })"
npx playwright cli fill "getByLabel('品物')" 卵
npx playwright cli click "getByRole('button', { name: '追加' })"
npx playwright cli check "getByRole('checkbox', { name: '牛乳' })"
npx playwright cli find 残り                          # 「残り 1 品」
npx playwright cli close
```

## AI を動かしたあとに残る物

MCP は `.playwright-mcp/`、CLI は `.playwright-cli/` に作業ファイルを作ります（どちらも `.gitignore` に入れてあります）。

## 試した環境

Linux（aarch64・Chrome の入っていない・画面のない端末）・Node.js 22・Playwright 1.64.0・Claude Code 2.1 で確かめました（2026-10）。Mac と Windows は確かめていません。

## ライセンス

MIT
