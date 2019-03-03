import FixtureAPI from './SeedorfApiFixture';
import API from './SeedorfApiLive';
import config from '../config';

const SeedorfAPI = config.useFixtures ? FixtureAPI : API.create();
export default SeedorfAPI;
