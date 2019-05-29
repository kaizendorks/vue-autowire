describe('Vue-Autowire views registration', () => {
  it('autowired the home view', async () => {
    await page.goto('http://localhost:8080');
    await expect(page).toMatchElement('h1', { text: 'Vue-Autowire example site' });
  });

  it('autowired the components test view', async () => {
    await page.goto('http://localhost:8080/#/components-test');
    await expect(page).toMatchElement('h1', { text: 'This is a test page to ensure components' });
  });

  it('autowired the async test view with local subcomponents', async () => {
    await page.goto('http://localhost:8080/#/async-page-test');
    await expect(page).toMatchElement('h1', { text: 'page automatically registered as an async vue component' });
    await expect(page).toMatchElement('p', { text: 'subcomponent of the async page' });
  });
});
