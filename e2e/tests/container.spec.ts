import { expect, test } from "@playwright/test";
import { AppPage } from "../pages/app.page";

test("has a boxfish container", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByText("var/run/docker.sock")).toBeVisible();

  const app = new AppPage(page);
  const containers = await app.openContainers();
  await expect(containers.title).toHaveText("Containers");

  const row = await containers.getRow("boxfish");
  await expect(row.image).toHaveText("mschnr/boxfish:latest");

  const container = await row.open();
  await expect(container.title).toHaveText("boxfish");
  await expect(container.image).toHaveText("mschnr/boxfish:latest");
});
