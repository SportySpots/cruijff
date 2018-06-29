const wd = require('wd');
jest.setTimeout(50000);

class Helper {
  setup() {
    const capabilities = {
      platformName: 'Android',
      deviceName: 'Nexus 5 API 27',
      // platformVersion: '10.2',
      app: './android/app/build/outputs/apk/release/app-release-unsigned.apk',
      autoGrantPermissions: true,
  };
    this.driver = wd.promiseChainRemote('0.0.0.0', 4723);
    return this.driver.init(capabilities);
  }
  teardown() {
    return this.driver.quit();
  }
}

const helper = new Helper();
describe('simple test', () => {
  beforeEach(() => helper.setup());
  afterEach(() => helper.teardown());
  test('tap get started', async () => {
    const driver = helper.driver;

    await driver.sleep(2000);
    await driver.elementByAccessibilityId('Start Discovering').tap();
    await driver.sleep(500);
    for (let i = 0; i < 3; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await driver.elementByAccessibilityId('next').tap().sleep(500);
    }
    driver.sleep(5000);

    console.log('done');
  });
});
