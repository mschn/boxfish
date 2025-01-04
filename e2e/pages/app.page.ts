import { Locator, Page } from "@playwright/test";
import { ContainersPage } from "./containers.page";
import { SettingsPage } from "./settings.page";

export class AppPage {
  containersLink: Locator;
  settingsLink: Locator;

  constructor(readonly page: Page) {
    this.containersLink = this.page.getByRole("link", { name: "Containers" });
    this.settingsLink = this.page.getByRole("link", { name: "Settings" });
  }

  async openContainers(): Promise<ContainersPage> {
    await this.containersLink.click();
    return new ContainersPage(this.page);
  }

  async openSettingsPage(): Promise<SettingsPage> {
    await this.settingsLink.click();
    return new SettingsPage(this.page);
  }
}

export async function openApp(page: Page) {
  await page.goto("http://localhost:3000/");
  return new AppPage(page);
}
