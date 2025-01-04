import { expect, Locator, Page } from "@playwright/test";
import { ContainersRow } from "./containers-row";

export class ContainersPage {
  readonly title: Locator;
  readonly rows: Locator;

  constructor(readonly page: Page) {
    this.title = page.getByRole("heading");
    this.rows = page.getByTestId("containers-row");
  }

  async getRow(hasText: string): Promise<ContainersRow> {
    const row = this.rows.filter({ hasText });
    await expect(row).toHaveCount(1);
    return new ContainersRow(this.page, row);
  }
}
