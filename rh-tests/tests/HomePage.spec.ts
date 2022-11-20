import {test} from '@playwright/test';
import {HomePage} from "../pages/HomePage";

test.describe("Add to cart tests", ()=>{
    test("I'm able to add mattress to cart", async ({page, isMobile}) => {
        const homePage = new HomePage(page, isMobile);
        await homePage.goto();
        await homePage.closeBanner();
        await homePage.waitForIt();
        await homePage.checkAllSectionsAreVisible();
        const mattressPage = await (await homePage.clickOnShopAndSaveButton())
            .waitForIt();
        const cartPage = await (await mattressPage.addMattressToCartButton())
            .waitForIt();
        await cartPage.checkMattressInCart(mattressPage.productId);
    })
})