const en = require('../src/locale/messages.json');
const fr = require('../src/locale/messages.fr.json');

const errors = [];
const keys = Object.keys(en.translations);
for (const key of keys) {
  if (!Object.hasOwn(fr.translations, key)) {
    errors.push(`Error: missing FR translation for "${key}" = "${en.translations[key]}"`);
  }
}

console.log('validate-i18n.js:')
console.error(errors.join('\n'));
if (errors.length > 0) {
  process.exitCode = 1;
} else {
  console.log(`Successfully validated ${keys.length} messages.`);
}

