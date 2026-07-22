const fs = require('fs');
const path = require('path');
const webp = fs.readdirSync(path.join('public','works')).filter(f => f.toLowerCase().endsWith('.webp')).sort();
const data = fs.readFileSync(path.join('src','data','works.ts'), 'utf8');
const included = webp.filter(f => data.includes('/works/' + f));
const duplicates = [];
for (const f of webp) {
  const regex = new RegExp('/works/' + f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const count = (data.match(regex) || []).length;
  if (count > 1) duplicates.push(f);
}
console.log(JSON.stringify({ totalWebp: webp.length, includedCount: included.length, missing: webp.filter(f => !included.includes(f)), duplicates, duplicateCount: duplicates.length }, null, 2));
