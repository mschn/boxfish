import { Locator, Page } from "@playwright/test";
import { ContainersPage } from "./containers.page";

export class AppPage {
  containersLink: Locator;

  constructor(readonly page: Page) {
    this.containersLink = this.page.getByRole("link", { name: "Containers" });
  }

  async openContainers(): Promise<ContainersPage> {
    await this.containersLink.click();
    return new ContainersPage(this.page);
  }
}
