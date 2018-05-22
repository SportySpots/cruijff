import FixtureAPI from '../Services/SeedorfApiFixture';
import API from '../Services/SeedorfApiLive';
import config from '../config';

const SeedorfAPI = config.useFixtures ? FixtureAPI : API.create();
export default SeedorfAPI;
