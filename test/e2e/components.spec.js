describe('Vue-Autowire component registration', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/#/components-test');
  });

  it('autowired the navbar component', async () => {
    await expect(page).toMatchElement('nav#nav');
  });

  it('autowired a regular sync component', async () => {
    await expect(page).toMatchElement('#sync-component', { text: 'HelloWorld sync component' });
  });

  it('autowired an async component', async () => {
    await expect(page).toMatchElement('#async-component', { text: 'an async component' });
  });

  it('autowired a complex async component', async () => {
    await expect(page).toMatchElement('#async-complex-component', { text: 'BlogPreview async component' });
    await expect(page).toMatchElement('#async-complex-component', { text: 'local subcomponent of the BlogPreview' });
  });
});
