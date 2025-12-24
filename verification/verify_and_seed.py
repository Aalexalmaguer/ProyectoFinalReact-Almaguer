from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Seed the database
        print("Navigating to home to seed...")
        page.goto("http://localhost:5173/")
        page.wait_for_timeout(2000)

        # Click the seed button
        try:
            page.click("#seed-btn")
            print("Seed button clicked.")
            page.wait_for_timeout(5000) # Wait for Firestore to populate
        except:
            print("Seed button not found!")

        # Refresh to see products
        page.reload()
        page.wait_for_timeout(3000)
        page.screenshot(path="verification/1_home_after_seed.png")
        print("Home after seed screenshot taken.")

        # Verify products are present
        products = page.locator("text=Ver Detalle")
        count = products.count()
        print(f"Found {count} products on home page.")

        if count == 0:
            print("No products found! Seeding might have failed or products are not loading.")
            browser.close()
            return

        # 2. Click details of first product
        print("Navigating to detail...")
        products.first.click()
        page.wait_for_timeout(3000)
        page.screenshot(path="verification/2_detail.png")
        print("Detail screenshot taken.")

        # 3. Add to cart
        print("Adding to cart...")
        try:
            # Maybe increase quantity first
            page.click("text=+")
            page.click("text=Agregar al Carrito")
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/3_added_to_cart.png")
            print("Added to cart.")
        except Exception as e:
            print(f"Error adding to cart: {e}")

        # 4. Go to cart
        print("Going to cart...")
        page.goto("http://localhost:5173/cart")
        page.wait_for_timeout(2000)
        page.screenshot(path="verification/4_cart.png")
        print("Cart screenshot taken.")

        # 5. Go to checkout
        print("Going to checkout...")
        page.click("text=Terminar Compra")
        page.wait_for_timeout(2000)
        page.screenshot(path="verification/5_checkout.png")

        # 6. Fill checkout form
        print("Filling checkout...")
        page.fill("input[type='text']:nth-of-type(1)", "Juan Perez") # Name (assuming order based on code)
        # Actually my Checkout.jsx uses labels, so I should target by label logic or order
        # Name
        page.locator("label:has-text('Nombre') input").fill("Juan Perez")
        # Phone
        page.locator("label:has-text('Teléfono') input").fill("123456789")
        # Email
        page.locator("label:has-text('Email:') input").fill("juan@example.com")
        # Confirm Email
        page.locator("label:has-text('Confirmar Email') input").fill("juan@example.com")

        page.screenshot(path="verification/6_checkout_filled.png")

        # Submit
        print("Submitting order...")
        page.click("text=Generar Orden")
        page.wait_for_timeout(5000) # Wait for Firestore
        page.screenshot(path="verification/7_order_confirmed.png")
        print("Order confirmed screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_app()
