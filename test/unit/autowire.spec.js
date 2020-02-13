import { when } from 'jest-when';
import VueAutowire from '../../src/autowire';

describe('the VueAutowire module', () => {
  let mockConventions;
  let mockVue;

  beforeEach(() => {
    mockConventions = {
      routes: { requireContext: null },
      filters: { requireContext: null },
      directives: { requireContext: null },
      components: { requireContext: null, requireAsyncContext: null },
      views: { requireContext: null, requireAsyncContext: null }
    };

    mockVue = {};
  });

  test('exports a plugin function', () => {
    expect(VueAutowire).toBeDefined();
  });

  test('can be installed into the Vue object', () => {
    VueAutowire(mockVue);

    expect(mockVue.autowire).toMatchObject({
      routes: [],
      filters: [],
      directives: [],
      components: [],
      asyncComponents: [],
      views: [],
      asyncViews: []
    });
    expect(mockVue.autowire.registerComponents).toBeDefined();
    expect(mockVue.autowire.registerAsyncComponents).toBeDefined();
    expect(mockVue.autowire.registerViews).toBeDefined();
    expect(mockVue.autowire.registerAsyncViews).toBeDefined();
    expect(mockVue.autowire.registerDirectives).toBeDefined();
    expect(mockVue.autowire.registerFilters).toBeDefined();
    expect(mockVue.autowire.registerRoutes).toBeDefined();
  });

  describe('when route conventions are provided', () => {
    test('returns empty array of routes when there is no routes property in the conventions', () => {
      VueAutowire(mockVue, {});

      expect(mockVue.autowire).toMatchObject({
        routes: [],
      });
    });

    test('returns empty array of routes when no requireContext is provided in the conventions', () => {
      VueAutowire(mockVue, mockConventions);

      expect(mockVue.autowire).toMatchObject({
        routes: [],
      });
    });

    describe('when a require.context for routes is provided', () => {
      let mockRequireContext;
      let mockRouteFiles;
      let mockRequireContextNew;
      let mockRouteFilesNew;

      beforeEach(() => {
        mockRouteFiles = [
          'some/path/my-router.js',
          'some/other/path/another-router.js'
        ];
        mockRequireContext = jest.fn();
        mockRequireContext.keys = jest.fn().mockReturnValue(mockRouteFiles);
      });
      test('returns an array with the result of loading all the routes', () => {
        when(mockRequireContext).calledWith(mockRouteFiles[0]).mockReturnValue({ a: 'set of routes' });
        when(mockRequireContext).calledWith(mockRouteFiles[1]).mockReturnValue({ another: 'set of routes' });

        VueAutowire(mockVue, Object.assign(mockConventions, {
          routes: { requireContext: mockRequireContext }
        }));

        expect(mockVue.autowire).toMatchObject({
          routes: [
            { a: 'set of routes' },
            { another: 'set of routes' }
          ],
        });
      });
      test('can unwrap the default export of ES6 files', () => {
        when(mockRequireContext).calledWith(mockRouteFiles[0]).mockReturnValue({ default: { a: 'set of ES6 routes' }});
        when(mockRequireContext).calledWith(mockRouteFiles[1]).mockReturnValue({ another: 'set of routes' });

        VueAutowire(mockVue, Object.assign(mockConventions, {
          routes: { requireContext: mockRequireContext }
        }));

        expect(mockVue.autowire).toMatchObject({
          routes: [
            { a: 'set of ES6 routes' },
            { another: 'set of routes' }
          ],
        });
      });
      test('can add routes in different places', () => {
        when(mockRequireContext).calledWith(mockRouteFiles[0]).mockReturnValue({ a: 'set of routes' });
        when(mockRequireContext).calledWith(mockRouteFiles[1]).mockReturnValue({ another: 'set of routes' });

        mockRouteFilesNew = [
          'other/path/my-router.js',
          'other/other/path/another-router.js'
        ];
        mockRequireContextNew = jest.fn();
        mockRequireContextNew.keys = jest.fn().mockReturnValue(mockRouteFilesNew);

        when(mockRequireContextNew).calledWith(mockRouteFilesNew[0]).mockReturnValue({ a: 'new set of routes' });
        when(mockRequireContextNew).calledWith(mockRouteFilesNew[1]).mockReturnValue({ another: 'new set of routes' });

        VueAutowire(mockVue, Object.assign(mockConventions, {
          routes: { requireContext: mockRequireContext }
        }));

        console.log(mockVue.autowire);
        mockVue.autowire.registerRoutes(mockRequireContextNew);

        expect(mockVue.autowire).toMatchObject({
          routes: [
            { a: 'set of routes' },
            { another: 'set of routes' },
            { a: 'new set of routes' },
            { another: 'new set of routes' }
          ],
        });
      });
    });
  });

  describe('when auto-wiring of filters is enabled', () => {
    beforeEach(() => {
      mockVue.filter = jest.fn();
    });

    test('does nothing without a filters property in the conventions', () => {
      VueAutowire(mockVue, {});

      expect(mockVue.autowire).toMatchObject({
        filters: [],
      });
      expect(mockVue.filter).not.toHaveBeenCalled();
    });

    test('does nothing without a provided requireContext', () => {
      VueAutowire(mockVue, mockConventions);

      expect(mockVue.autowire).toMatchObject({
        filters: [],
      });
      expect(mockVue.filter).not.toHaveBeenCalled();
    });

    describe('when a require.context is provided', () => {
      let mockRequireContext;
      let mockFilterFiles;

      beforeEach(() => {
        mockFilterFiles = [
          'some/path/my-filter.js',
          'some/other/path/another-filter.js'
        ];
        mockRequireContext = jest.fn();
        mockRequireContext.keys = jest.fn().mockReturnValue(mockFilterFiles);

        when(mockRequireContext).calledWith(mockFilterFiles[0]).mockReturnValue({ a: 'filter' });
        when(mockRequireContext).calledWith(mockFilterFiles[1]).mockReturnValue({ another: 'filter' });
      });

      test('registers all the filters within Vue', () => {
        VueAutowire(mockVue, Object.assign(mockConventions, {
          filters: { requireContext: mockRequireContext }
        }));

        expect(mockVue.filter).toBeCalledWith('my-filter', { a: 'filter' });
        expect(mockVue.filter).toBeCalledWith('another-filter', { another: 'filter' });
      });

      test('returns an array with all the filters that have been registered in Vue', () => {
        when(mockVue.filter).calledWith('my-filter').mockReturnValue({ a: 'filter' });
        when(mockVue.filter).calledWith('another-filter').mockReturnValue({ another: 'filter' });

        VueAutowire(mockVue, Object.assign(mockConventions, {
          filters: { requireContext: mockRequireContext }
        }));

        expect(mockVue.autowire).toMatchObject({
          filters: [
            { name: 'my-filter', filter: { a: 'filter' }},
            { name: 'another-filter', filter: { another: 'filter' }},
          ],
        });
      });

      test('can unwrap the default export of ES6 files', () => {
        when(mockRequireContext).calledWith(mockFilterFiles[0]).mockReturnValue({ default: { an: 'ES6 filter' }});

        VueAutowire(mockVue, Object.assign(mockConventions, {
          filters: { requireContext: mockRequireContext }
        }));

        expect(mockVue.filter).toBeCalledWith('my-filter', { an: 'ES6 filter' });
      });
    });
  });

  describe('when auto-wiring of directives is enabled', () => {
    beforeEach(() => {
      mockVue.directive = jest.fn();
    });

    test('does nothing without a directives property in the conventions', () => {
      VueAutowire(mockVue, {});

      expect(mockVue.autowire).toMatchObject({
        directives: [],
      });
      expect(mockVue.directive).not.toHaveBeenCalled();
    });

    test('does nothing without a provided requireContext', () => {
      VueAutowire(mockVue, mockConventions);

      expect(mockVue.autowire).toMatchObject({
        directives: [],
      });
      expect(mockVue.directive).not.toHaveBeenCalled();
    });

    describe('when a require.context is provided', () => {
      let mockRequireContext;
      let mockDirectiveFiles;

      beforeEach(() => {
        mockDirectiveFiles = [
          'some/path/my-directive.js',
          'some/other/path/another-directive.js'
        ];
        mockRequireContext = jest.fn();
        mockRequireContext.keys = jest.fn().mockReturnValue(mockDirectiveFiles);

        when(mockRequireContext).calledWith(mockDirectiveFiles[0]).mockReturnValue({ a: 'directive' });
        when(mockRequireContext).calledWith(mockDirectiveFiles[1]).mockReturnValue({ another: 'directive' });
      });

      test('registers all the directives within Vue', () => {
        VueAutowire(mockVue, Object.assign(mockConventions, {
          directives: { requireContext: mockRequireContext }
        }));

        expect(mockVue.directive).toBeCalledWith('my-directive', { a: 'directive' });
        expect(mockVue.directive).toBeCalledWith('another-directive', { another: 'directive' });
      });

      test('returns an array with all the directives that have been registered in Vue', () => {
        when(mockVue.directive).calledWith('my-directive').mockReturnValue({ a: 'directive' });
        when(mockVue.directive).calledWith('another-directive').mockReturnValue({ another: 'directive' });

        VueAutowire(mockVue, Object.assign(mockConventions, {
          directives: { requireContext: mockRequireContext }
        }));

        expect(mockVue.autowire).toMatchObject({
          directives: [
            { name: 'my-directive', directive: { a: 'directive' }},
            { name: 'another-directive', directive: { another: 'directive' }},
          ],
        });
      });

      test('can unwrap the default export of ES6 files', () => {
        when(mockRequireContext).calledWith(mockDirectiveFiles[0]).mockReturnValue({ default: { an: 'ES6 directive' }});

        VueAutowire(mockVue, Object.assign(mockConventions, {
          directives: { requireContext: mockRequireContext }
        }));

        expect(mockVue.directive).toBeCalledWith('my-directive', { an: 'ES6 directive' });
      });
    });
  });

  describe('when auto-wiring of components is enabled', () => {
    beforeEach(() => {
      mockVue.component = jest.fn();
    });

    test('does nothing without a components property in the conventions', () => {
      VueAutowire(mockVue, {});

      expect(mockVue.autowire).toMatchObject({
        components: [],
        asyncComponents: [],
      });
      expect(mockVue.component).not.toHaveBeenCalled();
    });

    test('does nothing without requireContext or requireAsyncContext provided', () => {
      VueAutowire(mockVue, mockConventions);

      expect(mockVue.autowire).toMatchObject({
        components: [],
        asyncComponents: [],
      });
      expect(mockVue.component).not.toHaveBeenCalled();
    });

    describe('when a require.context for synchronous components is provided', () => {
      let mockRequireContext;
      let mockComponentFiles;
      beforeEach(() => {
        mockComponentFiles = [
          'some/path/my-component.vue',
          'some/other/path/another-component.js'
        ];
        mockRequireContext = jest.fn();
        mockRequireContext.keys = jest.fn().mockReturnValue(mockComponentFiles);

        when(mockRequireContext).calledWith(mockComponentFiles[0]).mockReturnValue({ a: 'component' });
        when(mockRequireContext).calledWith(mockComponentFiles[1]).mockReturnValue({ another: 'component' });
      });
      test('registers all the components within Vue', () => {
        VueAutowire(mockVue, Object.assign(mockConventions, {
          components: { requireContext: mockRequireContext }
        }));

        expect(mockVue.component).toBeCalledWith('my-component', { a: 'component' });
        expect(mockVue.component).toBeCalledWith('another-component', { another: 'component' });
      });
      test('returns an array with all the components that have been registered in Vue', () => {
        when(mockVue.component).calledWith('my-component').mockReturnValue({ a: 'component' });
        when(mockVue.component).calledWith('another-component').mockReturnValue({ another: 'component' });

        VueAutowire(mockVue, Object.assign(mockConventions, {
          components: { requireContext: mockRequireContext }
        }));

        expect(mockVue.autowire).toMatchObject({
          components: [
            { name: 'my-component', component: { a: 'component' }},
            { name: 'another-component', component: { another: 'component' }},
          ],
        });
      });
      test('can unwrap the default export of ES6 files', () => {
        when(mockRequireContext).calledWith(mockComponentFiles[0]).mockReturnValue({ default: { an: 'ES6 component' }});

        VueAutowire(mockVue, Object.assign(mockConventions, {
          components: { requireContext: mockRequireContext }
        }));

        expect(mockVue.component).toBeCalledWith('my-component', { an: 'ES6 component' });
      });
    });
    describe('when a require.context for asynchronous components is provided', () => {
      let mockRequireAsyncContext;
      let mockComponentFiles;
      beforeEach(() => {
        mockComponentFiles = [
          'some/path/my-component.vue',
          'some/other/path/another-component.js'
        ];
        mockRequireAsyncContext = jest.fn();
        mockRequireAsyncContext.id = './src/components lazy recursive async.vue$'; // simulate require.context id
        mockRequireAsyncContext.keys = jest.fn().mockReturnValue(mockComponentFiles);
      });
      test('throws an error if require.context isnt initialized in lazy mode', () => {
        mockRequireAsyncContext.id = './src/components sync recursive async.vue$';

        expect(() => {
          VueAutowire(mockVue, Object.assign(mockConventions, {
            components: { requireAsyncContext: mockRequireAsyncContext }
          }));
        }).toThrow('require.context for async components should be created in lazy mode');
      });
      test('registers all the components within Vue as async components', () => {
        VueAutowire(mockVue, Object.assign(mockConventions, {
          components: { requireAsyncContext: mockRequireAsyncContext }
        }));

        // Each file should be registed in Vue using a function rather than the component itself
        expect(mockVue.component).toBeCalledWith('my-component', expect.any(Function));
        expect(mockVue.component).toBeCalledWith('another-component', expect.any(Function));

        // The registered function simply tell the require.context to load the file
        // as per https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
        mockComponentFiles.forEach((mockFile, idx) => {
          // For each file, we call Vue.component twice. One to register and another to return the registered component
          const componentFunction = mockVue.component.mock.calls[idx * 2][1];
          componentFunction();
          expect(mockRequireAsyncContext).toBeCalledWith(mockFile);
        });
      });
      test('returns an array with all the async components that have been registered in Vue', () => {
        when(mockVue.component).calledWith('my-component').mockReturnValue({ a: 'component' });
        when(mockVue.component).calledWith('another-component').mockReturnValue({ another: 'component' });

        VueAutowire(mockVue, Object.assign(mockConventions, {
          components: { requireAsyncContext: mockRequireAsyncContext }
        }));

        expect(mockVue.autowire).toMatchObject({
          asyncComponents: [
            { name: 'my-component', component: { a: 'component' }},
            { name: 'another-component', component: { another: 'component' }},
          ],
        });
      });
    });
  });

  describe('when auto-wiring of views is enabled', () => {
    beforeEach(() => {
      mockVue.component = jest.fn();
    });

    test('does nothing without a views property in the conventions', () => {
      VueAutowire(mockVue, {});

      expect(mockVue.autowire).toMatchObject({
        views: [],
        asyncViews: [],
      });
      expect(mockVue.component).not.toHaveBeenCalled();
    });

    test('does nothing without requireContext or requireAsyncContext provided', () => {
      VueAutowire(mockVue, mockConventions);

      expect(mockVue.autowire).toMatchObject({
        views: [],
        asyncViews: [],
      });
      expect(mockVue.component).not.toHaveBeenCalled();
    });

    describe('when a require.context for synchronous views is provided', () => {
      let mockRequireContext;
      let mockViewFiles;
      beforeEach(() => {
        mockViewFiles = [
          'some/path/my-view.vue',
          'some/other/path/another-view.js'
        ];
        mockRequireContext = jest.fn();
        mockRequireContext.keys = jest.fn().mockReturnValue(mockViewFiles);

        when(mockRequireContext).calledWith(mockViewFiles[0]).mockReturnValue({ a: 'view' });
        when(mockRequireContext).calledWith(mockViewFiles[1]).mockReturnValue({ another: 'view' });
      });
      test('registers all the views within Vue', () => {
        VueAutowire(mockVue, Object.assign(mockConventions, {
          views: { requireContext: mockRequireContext }
        }));

        expect(mockVue.component).toBeCalledWith('my-view', { a: 'view' });
        expect(mockVue.component).toBeCalledWith('another-view', { another: 'view' });
      });
      test('returns an array with all the views that have been registered in Vue', () => {
        when(mockVue.component).calledWith('my-view').mockReturnValue({ a: 'view' });
        when(mockVue.component).calledWith('another-view').mockReturnValue({ another: 'view' });

        VueAutowire(mockVue, Object.assign(mockConventions, {
          views: { requireContext: mockRequireContext }
        }));

        expect(mockVue.autowire).toMatchObject({
          views: [
            { name: 'my-view', component: { a: 'view' }},
            { name: 'another-view', component: { another: 'view' }},
          ],
        });
      });
      test('can unwrap the default export of ES6 files', () => {
        when(mockRequireContext).calledWith(mockViewFiles[0]).mockReturnValue({ default: { an: 'ES6 view' }});

        VueAutowire(mockVue, Object.assign(mockConventions, {
          views: { requireContext: mockRequireContext }
        }));

        expect(mockVue.component).toBeCalledWith('my-view', { an: 'ES6 view' });
      });
    });

    describe('when a require.context for asynchronous views is provided', () => {
      let mockRequireAsyncContext;
      let mockViewFiles;
      beforeEach(() => {
        mockViewFiles = [
          'some/path/my-view.vue',
          'some/other/path/another-view.js'
        ];
        mockRequireAsyncContext = jest.fn();
        mockRequireAsyncContext.id = './src/views lazy recursive async.vue$'; // simulate require.context id
        mockRequireAsyncContext.keys = jest.fn().mockReturnValue(mockViewFiles);
      });
      test('throws an error if require.context isnt initialized in lazy mode', () => {
        mockRequireAsyncContext.id = './src/views sync recursive async.vue$';

        expect(() => {
          VueAutowire(mockVue, Object.assign(mockConventions, {
            views: { requireAsyncContext: mockRequireAsyncContext }
          }));
        }).toThrow('require.context for async components should be created in lazy mode');
      });
      test('registers all the views within Vue as async components', () => {
        VueAutowire(mockVue, Object.assign(mockConventions, {
          views: { requireAsyncContext: mockRequireAsyncContext }
        }));

        // Each file should be registed in Vue using a function rather than the view itself
        expect(mockVue.component).toBeCalledWith('my-view', expect.any(Function));
        expect(mockVue.component).toBeCalledWith('another-view', expect.any(Function));

        // The registered function simply tell the require.context to load the file
        // as per https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
        mockViewFiles.forEach((mockFile, idx) => {
          // For each file, we call Vue.component twice. One to register and another to return the registered component
          const componentFunction = mockVue.component.mock.calls[idx * 2][1];
          componentFunction();
          expect(mockRequireAsyncContext).toBeCalledWith(mockFile);
        });
      });
      test('returns an array with all the async views that have been registered in Vue', () => {
        when(mockVue.component).calledWith('my-view').mockReturnValue({ a: 'view' });
        when(mockVue.component).calledWith('another-view').mockReturnValue({ another: 'view' });

        VueAutowire(mockVue, Object.assign(mockConventions, {
          views: { requireAsyncContext: mockRequireAsyncContext }
        }));

        expect(mockVue.autowire).toMatchObject({
          asyncViews: [
            { name: 'my-view', component: { a: 'view' }},
            { name: 'another-view', component: { another: 'view' }},
          ],
        });
      });
    });
  });
});
