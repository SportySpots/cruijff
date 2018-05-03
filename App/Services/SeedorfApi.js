import API from '../Services/SeedorfApiLive'
import FixtureAPI from '../Services/SeedorfApiFixture'
import config from '../config'

const SeedorfAPI = config.useFixtures ? FixtureAPI : API.create()
export default SeedorfAPI
