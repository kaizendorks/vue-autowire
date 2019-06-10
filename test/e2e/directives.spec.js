describe('Vue-Autowire directive registration', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/#/directives-test');
  });

  it('our directive is autowired and present on the page', async () => {
    await expect(page).toMatchElement('#bars-directive');
  });
});
