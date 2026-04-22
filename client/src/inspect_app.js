const fs = require('fs');
const p = 'c:/Users/HP/Downloads/Project-Verse/Project-Verse/client/src/App.js';
const t = fs.readFileSync(p, 'utf8');
const bad = '\\t\\t\\t\\t\\t</Route>\\r\\n\\r\\n\\t\\t\\t\\t<Route\\r\\n\\t\\t\\t\\t\\tpath="/register"\\r\\n\\t\\t\\t\\t\\telement={<Register />}\\r\\n\\t\\t\\t\\t/>';
console.log('searching bad');
console.log('bad index', t.indexOf(bad));
console.log('snippet', JSON.stringify(t.slice(1530, 1590)));
console.log('raw snippet', t.slice(1530, 1590));
