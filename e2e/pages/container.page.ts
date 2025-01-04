import { Locator, Page } from "@playwright/test";

export class ContainerPage {
  title: Locator;
  image: Locator;

  constructor(readonly page: Page) {
    this.title = this.page.getByRole("heading");
    this.image = this.page.getByTestId("container-image");
  }
}
