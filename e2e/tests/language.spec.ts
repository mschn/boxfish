import { expect, test } from "@playwright/test";
import { openApp } from "../pages/app.page";

test("sets the lang in french", async ({ page }) => {
  const app = await openApp(page);
  const settings = await app.openSettingsPage();
  await settings.selectLang("French");

  await expect(settings.title).not.toHaveText("Settings");
  await expect(settings.title).toHaveText("Réglages");

  await page.getByRole("link", { name: "Conteneurs" }).click();
  await expect(page.getByRole("heading")).toHaveText("Conteneurs");
});
