describe('Vue-Autowire filter registration', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/#/filters-test');
  });

  it('our value without a filter is unmodified', async () => {
    await expect(page).toMatchElement('#value-before-filter', { text: 'foo' });
  });

  it('autowired the filters test component and applies it correctly', async () => {
    await expect(page).toMatchElement('#value-after-filter', { text: 'FOO' });
  });
});
