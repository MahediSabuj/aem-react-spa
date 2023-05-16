const path = require('path');

const SCREENSHOTTYPES = {
    BASE: 'base',
    CURR: 'current',
    DIFF: 'diff'
};

class PathUtils {
  constructor(baseDirectory) {
    this.baseDirectory = baseDirectory || './assets';
  }
    
  getScreenshotDirectory(context, baseDir) {
    return path.join(baseDir ? baseDir : this.baseDirectory, context.test.title, browser.capabilities.platformName, browser.capabilities.browserName);
  }

  getScreenshotPath(viewportSize, screenshotName, type, baseDir) {
    return path.join(baseDir, `${screenshotName} ${viewportSize.width}x${viewportSize.height}-${type}.png`);
  }
}
module.exports = { PathUtils, SCREENSHOTTYPES };
