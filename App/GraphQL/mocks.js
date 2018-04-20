import { MockList } from 'graphql-tools/dist/index'
import faker from 'faker'

const mocks = {
  Query: () => ({
    spots: () => new MockList([3, 5])
  }),
  SpotType: () => ({
    name: () => faker.lorem.words(2)
  }),
  UUID: faker.random.uuid
}

export default mocks
