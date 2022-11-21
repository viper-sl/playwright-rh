import {Locator, Page} from '@playwright/test';
import {BasePage} from "./BasePage";
import {MattressPage} from "./MattressPage";

export class HomePage extends BasePage {
    readonly page: Page;
    readonly benefits: Locator;
    readonly reviews: Locator;
    readonly layers: Locator;
    readonly awards: Locator;
    readonly materials: Locator;
    readonly values: Locator;
    readonly natureCare: Locator;
    readonly shopBest: Locator;
    readonly newsletter: Locator;
    readonly paymentOptions: Locator;
    readonly shopSaveButton: Locator;

    constructor(page: Page, isMobile: boolean) {
        super(page, isMobile);
        this.page = page;
        this.benefits = page.getByTestId('home_value_props_section').first();
        this.reviews = page.getByTestId('home_customer_reviews_section').first();
        this.layers = page.locator('#mattress_layers_section');
        this.awards = page.getByTestId('awards_section');
        this.materials = page.getByTestId('home_info_materials_section').first();
        this.values = page.getByTestId('home_value_props_section').last();
        this.natureCare = page.getByTestId('home_nature_care_section').first();
        this.shopBest = page.getByTestId('home_nature_care_section').last();
        this.newsletter = page.getByTestId('newsletter_section');
        this.paymentOptions = page.getByTestId('payments_option_section');
        this.shopSaveButton = isMobile ? page.locator('#hero_shop_mattress').first() :
            page.locator('#hero_shop_mattress');
    }

    async clickOnShopAndSaveButton() {
        await this.shopSaveButton.click();
        return new MattressPage(this.page, this.isMobile);
    }

    async waitForIt() {
        await this.scrollToPageBottom();
        await this.checkElementsVisibility([this.headerNav, this.mainContent,
            this.footer
        ]);
        return this;
    }

    async checkAllSectionsAreVisible() {
        await this.checkElementsVisibility(
            [
                this.benefits, this.reviews, this.layers,
                this.awards, this.materials, this.values,
                this.natureCare, this.shopBest, this.newsletter, this.paymentOptions
            ]
        );
        return this;
    }
}