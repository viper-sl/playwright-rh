import {expect, Locator, Page} from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;
    readonly isMobile: boolean;
    readonly headerNav: Locator;
    readonly mainContent: Locator;
    readonly footer: Locator;
    readonly bannerModal: Locator;
    readonly bannerModalClose: Locator;

    protected constructor(page: Page, isMobile?: boolean) {
        this.page = page;
        this.isMobile = isMobile;
        this.headerNav = page.locator('#header-nav');
        this.mainContent = page.locator('#placeholderContainerElem');
        this.footer = page.locator('#footer');
        this.bannerModal = page.locator('.dy-modal-contents');
        this.bannerModalClose = page.locator('.dy-lb-close');
    }

    abstract waitForIt(): any;

    async goto() {
        await this.page.goto('/');
    }

    async checkElementsVisibility(el: Locator[]) {
        for (const e of el) {
            await expect(e).toBeVisible();
        }
    }

    async closeBanner() {
        await expect(this.bannerModal).toBeVisible();
        await this.bannerModalClose.click();
        await expect(this.bannerModal).not.toBeVisible();
    }

    async checkPageURL(url: string | RegExp) {
        await expect(this.page).toHaveURL(url);
    }

    async scrollToPageBottom() {
        const delay = async ms => await new Promise(async resolve => setTimeout(resolve, ms));
        let height = this.page.viewportSize().height;
        let i = 0;
        while (i < height) {
            await this.page.mouse.wheel(0, i);
            await delay(this.isMobile ? 50 : 200);
            height = this.page.viewportSize().height;
            i += this.isMobile ? 100 : 200
        }
    }
}