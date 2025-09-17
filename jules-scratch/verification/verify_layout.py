from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5175/")

    # Wait for the heading to be visible to ensure the page has loaded
    heading = page.get_by_role("heading", name="Portfolio")
    expect(heading).to_be_visible(timeout=10000)

    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
