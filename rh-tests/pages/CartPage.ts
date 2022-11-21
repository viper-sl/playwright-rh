import {expect, Locator, Page} from '@playwright/test';
import {BasePage} from "./BasePage";

export class CartPage extends BasePage {
    readonly page: Page;
    readonly shippingInfo: Locator;
    readonly cartItems: Locator;
    readonly continueButton: Locator;
    addedCartItem: Locator;

    constructor(page: Page, isMobile: boolean) {
        super(page, isMobile);
        this.page = page;
        this.shippingInfo = page.locator('#checkout_shipping_step');
        this.cartItems = page.getByTestId('cart_items_area');
        this.continueButton = this.isMobile ? page.getByTestId('checkout_place_order_btn') :
            page.locator('#checkout_shipping_continue_btn');
    }

    async checkMattressInCart(productId) {
        this.addedCartItem = this.page.getByTestId(productId);
        await expect(this.addedCartItem).toBeVisible();
    }

    async waitForIt() {
        await this.checkPageURL(/\/checkout\/shipping/);
        await this.checkElementsVisibility(
            [this.shippingInfo, this.cartItems, this.continueButton]
        );
        return this;
    }
}