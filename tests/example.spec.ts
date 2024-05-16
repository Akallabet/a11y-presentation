import { test, expect, Page } from "@playwright/test";

const url = "http://localhost:3000";

async function goToExample(page: Page) {
  await page.goto(`${url}/example.html`);
}

test.describe("buttons", () => {
  test("nope", async ({ page }) => {
    await goToExample(page);
    const button = page
      .getByTestId("buttons")
      .locator(page.getByText("New York"));
    await expect(button).toBeVisible();

    const button1 = page.getByTestId("buttons").locator(page.getByText("Oslo"));
    await expect(button1).toBeVisible();
  });

  test("get by role", async ({ page }) => {
    await goToExample(page);
    const button = page.getByRole("button", { name: "New York" });
    await expect(button).toBeVisible();

    await goToExample(page);
    const button1 = page.getByRole("button", { name: "Oslo" });
    await expect(button1).toBeVisible();
  });
});

test.describe("list", () => {
  test("nope", async ({ page }) => {
    await goToExample(page);
    const listItem = page
      .getByTestId("list 1")
      .locator(page.getByText("New York"));
    await expect(listItem).toBeVisible();
  });
  test("get by role", async ({ page }) => {
    await goToExample(page);
    const listItems = page.getByRole("listitem");
    const items = await listItems.all();
    items.forEach(async (item) => {
      item.nth;
      // await expect(item).toBeVisible();
    });
    const listItem = page.getByRole("listitem", { name: "Berlin" });
    await expect(listItem).toBeVisible();

    const listItem2 = page.getByRole("listitem", { name: "London" });
    await expect(listItem2).toBeVisible();
  });
});
test.describe("table", () => {
  test("nope", async ({ page }) => {
    await goToExample(page);
    const table = page.getByTestId("table");
    await expect(table).toBeVisible();

    expect(table.locator(page.getByText("Rome"))).toBeVisible();
  });
  test("get by role", async ({ page }) => {
    await goToExample(page);
    const table = page.getByRole("table", { name: "accessible-table" });
    await expect(table).toBeVisible();
    await expect(
      table.locator(
        page.getByRole("row").nth(0).locator(page.getByRole("cell").nth(3))
      )
    ).toHaveText("Ankara");
    await expect(
      page
        .getByRole("table", { name: "table1" })
        .locator(
          page.getByRole("row").nth(0).locator(page.getByRole("cell").nth(3))
        )
    ).toHaveText("Ankara");
  });
});

test.describe("dialog", () => {
  test("nope", async ({ page }) => {
    await goToExample(page);
    await page.getByRole("button", { name: "Click me", exact: true }).click();
    const dialog = page.getByTestId("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.locator(
        page.getByText(
          "This is an HTML dialog that opens when you click the button above."
        )
      )
    ).toBeVisible();
  });
  test("accessible", async ({ page }) => {
    await goToExample(page);
    await page.getByRole("button", { name: "Click me also" }).click();
    const dialog = page.getByRole("dialog", { name: "fake-dialog" });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.locator(
        page.getByText(
          "This is an HTML dialog that opens when you click the button above."
        )
      )
    ).toBeVisible();
  });
});
