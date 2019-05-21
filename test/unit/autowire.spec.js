import { when } from 'jest-when';
import VueAutowire from '../../src/autowire';

describe('the VueAutowire module', () => {
  let mockConventions;
  let mockVue;

  beforeEach(() => {
    mockConventions = {
      routes: { requireContext: null },
      components: { requireAsyncContext: null }
    };

    mockVue = {};
  });

  test('exports a plugin function', () => {
    expect(VueAutowire).toBeDefined();
  });

  test('can be installed into the Vue object', () => {
    VueAutowire(mockVue);

    expect(mockVue.autowire).toEqual({
      routes: [],
      components: [],
      asyncComponents: []
    });
  });

  describe('when route conventions are provided', () => {
    test('returns empty array of routes when no requireContext is provided in the conventions', () => {
      VueAutowire(mockVue, mockConventions);

      expect(mockVue.autowire).toMatchObject({
        routes: [],
      });
    });

    describe('when a require.context for routes is provided', () => {
      let mockRequireContext;
      let mockRouteFiles;
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
        when(mockRequireContext).calledWith(mockRouteFiles[0]).mockReturnValue({ default: { a: 'set of ES6 routes' } });
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
    });
  });

  describe('when auto-wiring of components is enabled', () => {
    beforeEach(() => {
      mockVue.component = jest.fn();
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
        when(mockRequireContext).calledWith(mockComponentFiles[0]).mockReturnValue({ default: {an: 'ES6 component' } });

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
        }).toThrow('require.context for asyn components should be created in lazy mode');
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
});
