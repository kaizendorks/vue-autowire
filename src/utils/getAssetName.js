'use strict';

export default filePath => {
  const fileName = filePath.split('/').pop();
  return fileName
    .replace(/\.js$|\.vue$/, '')
    .replace(/\.async$/, '');
};
