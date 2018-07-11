import { MockList } from 'graphql-tools/dist/index';
import faker from 'faker';

const mocks = {
  Query: () => ({
    spots: () => new MockList([3, 5]),
    games: () => new MockList([20, 50]),
    sports: () => new MockList([5, 10]),
  }),
  SpotImageType: () => ({
    image: [
      'https://cdn.pixabay.com/photo/2016/04/15/20/28/football-1331838_1280.jpg',
      'https://www.maxpixel.net/static/photo/640/Sport-Bicycle-Road-Riding-Recreation-Cycling-655565.jpg',
    ][faker.random.number(1)],
  }),
  SportType: () => ({
    uuid: faker.random.uuid,
    name: () => faker.lorem.words(2),
  }),
  SpotType: () => ({
    uuid: faker.random.uuid,
    name: () => faker.lorem.words(2),
    capacity: () => faker.random.number(20),
  }),
  GameType: () => ({
    uuid: faker.random.uuid,
    attendees: () => new MockList([1, 20]),
  }),
  UserType: () => ({
    uuid: faker.random.uuid,
    name: () => faker.lorem.words(2),
  }),
  JSONString: () => ({
    lighting: true,
    size: 54,
  }),
  DateTime: () => {
    const d = new Date();
    d.setDate(d.getDate() + faker.random.number(30));
    return d;
  },
  CustomDateTime: () => {
    const d = new Date();
    d.setDate(d.getDate() + faker.random.number(30));
    return d;
  },
  UUID: faker.random.uuid,
};

export default mocks;
