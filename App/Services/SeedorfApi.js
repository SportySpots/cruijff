import API from '../Services/SeedorfApiLive'
import FixtureAPI from '../Services/SeedorfApiFixture'
import DebugConfig from '../Config/DebugConfig'

const SeedorfAPI = DebugConfig.useFixtures ? FixtureAPI : API.create()
export default SeedorfAPI
