const en = require('../src/locale/messages.json');
const fr = require('../src/locale/messages.fr.json');

const errors = [];
const keys = Object.keys(en.translations);
for (const key of keys) {
  if (!Object.hasOwn(fr.translations, key)) {
    errors.push(`Missing key ${key} for lang FR`);
  }
}

console.error(errors.join('\n'));
if (errors.length > 0) {
  process.exit(1);
}

console.log(`Validated ${keys.length} messages!`);
