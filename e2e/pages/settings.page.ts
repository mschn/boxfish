import { Locator, Page } from "@playwright/test";

export class SettingsPage {
  readonly title: Locator;

  readonly language: Locator;
  readonly options: Locator;

  constructor(readonly page: Page) {
    this.title = this.page.getByRole("heading");
    this.language = this.page.getByRole("combobox");
    this.options = this.page.getByRole("option");
  }

  async selectLang(lang: string) {
    await this.language.click();
    await this.options.filter({ hasText: lang }).click();
  }
}
