import FixtureAPI from './SeedorfApiFixture';
import API from './SeedorfApiLive';
import config from '../config';

const SeedorfAPI: ReturnType<typeof API.create> = config.useFixtures ? FixtureAPI as any : API.create();
export default SeedorfAPI;
