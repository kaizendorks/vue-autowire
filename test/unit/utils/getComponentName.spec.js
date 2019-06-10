import { getAssetName } from '../../../src/utils';

describe('the getAssetName utility', () => {
  [
    { filePath: '/foo/bar/my-component.vue', expectedFileName: 'my-component', ext: 'vue' },
    { filePath: '/foo/bar/my-component.js', expectedFileName: 'my-component', ext: 'js' },
    { filePath: '/foo/bar/my-component.async.vue', expectedFileName: 'my-component', ext: 'async.vue' }
  ].forEach(spec => {
    test(`returns the file name without ${spec.ext} extension from the full file path`, () => {
      expect(getAssetName(spec.filePath)).toBe(spec.expectedFileName);
    });
  });
});
