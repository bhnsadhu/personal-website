import { chromium } from 'playwright'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const tag = process.argv[3] || 'a'
for (const [w,h] of [[1440,900],[390,844]]) for (const path of ['/', '/list']) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })
  const p = await ctx.newPage()
  await p.goto('http://localhost:4173'+path); await p.waitForTimeout(600)
  const el = p.locator('.flop__extras')
  await el.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, 200)); await p.waitForTimeout(700)
  const info = await p.evaluate(() => {
    const e = document.querySelector('.flop__extras'); const r = e.getBoundingClientRect()
    const prev = e.previousElementSibling.getBoundingClientRect()
    const cards = [...document.querySelectorAll('#flop .card, #flop .list__row, #flop [class*="row"]')].map(c=>c.getBoundingClientRect()).filter(r=>r.height>0)
    const lastBottom = Math.max(...cards.map(c=>c.bottom))
    const cont = e.parentElement.getBoundingClientRect()
    return { extras: [r.left, r.right, r.top, r.height].map(Math.round), prevBottom: Math.round(prev.bottom), lastItemBottom: Math.round(lastBottom), gap: Math.round(r.top - lastBottom), parent: [cont.left, cont.right].map(Math.round), text: e.innerText }
  })
  console.log(w, path, JSON.stringify(info))
  await p.screenshot({ path: `${process.argv[2]}/x-${tag}-${w}-${path==='/'?'card':'list'}.png` })
  await ctx.close()
}
await b.close()
