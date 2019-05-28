describe('Vue-Autowire', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080');
  });

  it('can be used on a websitesite', async () => {
    await expect(page).toMatchElement('h1', { text: 'Vue-Autowire example site' });
  });
});
