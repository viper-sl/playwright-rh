import {Locator, Page} from '@playwright/test';
import {BasePage} from "./BasePage";
import {CartPage} from "./CartPage";

export class MattressPage extends BasePage {
    readonly page: Page;
    readonly addToCartSection: Locator;
    readonly addToCartButton: Locator;
    readonly selectedProductId: Locator;
    readonly productImages: Locator;
    productId;

    constructor(page: Page, isMobile: boolean) {
        super(page, isMobile);
        this.page = page;
        this.addToCartSection = page.getByTestId('cart-actions');
        this.addToCartButton = page.getByTestId('addtocart_btn');
        this.selectedProductId = page.locator('[type="radio"][checked]');
        this.productImages = page.getByTestId('content-bag-variation-component').first();
    }

    async addMattressToCartButton() {
        this.productId = await this.selectedProductId.getAttribute("value");
        await this.addToCartButton.click();
        return new CartPage(this.page, this.isMobile);
    }

    async waitForIt() {
        await this.checkPageURL(/\/mattress/);
        await this.checkElementsVisibility(
            [this.headerNav, this.mainContent, this.addToCartSection, this.productImages]
        );
        return this;
    }
}