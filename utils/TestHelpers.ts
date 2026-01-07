export class TestHelpers {
    static async waitWithValidation(page: any, actionName: string, timeout: number) {
        try {
            await page.waitForLoadState('networkidle', { timeout });
            console.log(`✓ ${actionName} completed successfully`);
        } catch (error) {
            console.error(`✗ ${actionName} failed:`, error);
            throw error;
        }
    }

    static async setViewportSize(page: any) {
        await page.setViewportSize({ width: 1920, height: 1080 });
    }
}
