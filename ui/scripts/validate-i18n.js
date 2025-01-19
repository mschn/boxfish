const { writeFileSync } = require("fs");
const en = require("../src/locale/messages.json");
const path = require("path");

const langs = ["fr"];
const keys = Object.keys(en.translations);
const allErrors = [];

for (const lang of langs) {
  const messagesPath = path.resolve(
    __dirname,
    `../src/locale/messages.${lang}.json`,
  );
  const messages = require(messagesPath);
  const updatedTranslations = {};
  const errors = [];

  for (const key of keys) {
    if (
      !Object.hasOwn(messages.translations, key) ||
      messages.translations[key] === null
    ) {
      errors.push(
        `Error: missing ${lang} translation for "${key}" = "${en.translations[key]}"`,
      );
      updatedTranslations[key] = null;
    } else {
      updatedTranslations[key] = messages.translations[key];
    }
  }

  if (errors.length > 0) {
    messages.translations = updatedTranslations;
    writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
    allErrors.push(...errors);
  }
}

console.log("validate-i18n.js:");
console.error(allErrors.join("\n"));
if (allErrors.length > 0) {
  process.exitCode = 1;
} else {
  console.log(`Successfully validated ${keys.length} messages.`);
}
