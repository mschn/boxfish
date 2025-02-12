import { expect, test } from "@playwright/test";
import { openApp } from "../pages/app.page";
import { readFileSync } from "fs";
import path from "path";

test("has a boxfish container", async ({ page }) => {
  const version = readFileSync(path.join(__dirname, "../../version.txt"));

  const app = await openApp(page);
  await expect(page.getByText("var/run/docker.sock")).toBeVisible();

  const containers = await app.openContainers();
  await expect(containers.title).toHaveText("Containers");

  const row = await containers.getRow("boxfish");
  await expect(row.image).toHaveText(`mschnr/boxfish:${version}`);

  const container = await row.open();
  await expect(container.title).toHaveText("boxfish");
  await expect(container.image).toHaveText(`mschnr/boxfish:${version}`);
});
