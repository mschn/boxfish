import { Locator, Page } from "@playwright/test";
import { ContainerPage } from "./container.page";

export class ContainersRow {
  name: Locator;
  image: Locator;

  constructor(readonly page: Page, readonly base: Locator) {
    this.name = this.base.getByTestId("containers-name").getByRole("link");
    this.image = this.base.getByTestId("containers-image");
  }

  async open(): Promise<ContainerPage> {
    await this.name.click();
    return new ContainerPage(this.page);
  }
}
