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
  });
  test("get by role", async ({ page }) => {
    await goToExample(page);
    const table = page.getByRole("table", { name: "accessible-table" });
    await expect(table).toBeVisible();
    await expect(page.getByRole("cell", { name: "Rome" })).toBeVisible();
  });
});
