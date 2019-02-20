import { getAttendees } from '.';

const participants = [
  {
    uuid: 'fb98ffd9-bd20-49f8-9157-fd00d1d6794d',
    status: 'ATTENDING',
    user: {
      id: 'e77d5276-8617-4757-b785-cd1e5e12277b',
      uuid: 'c9782deb-e573-4da6-9a16-6883eff43182',
      name: 'Hello World',
      profile: {
        id: '5c8b7c10-6925-49e1-92ec-5357b3fad244',
        uuid: '853d033b-349c-4468-8650-3dc74fb0b232',
        avatar: 'Hello World',
        __typename: 'UserProfileType',
      },
      __typename: 'UserType',
    },
    __typename: 'RsvpStatusType',
  },
  {
    uuid: 'ab98ffd9-bd20-49f8-9157-fd00d1d6794d',
    status: 'DECLINED',
    user: {
      id: 'a77d5276-8617-4757-b785-cd1e5e12277b',
      uuid: 'a9782deb-e573-4da6-9a16-6883eff43182',
      name: 'Hello World',
      profile: {
        id: '4c8b7c10-6925-49e1-92ec-5357b3fad244',
        uuid: '353d033b-349c-4468-8650-3dc74fb0b232',
        avatar: 'Hello World',
        __typename: 'UserProfileType',
      },
      __typename: 'UserType',
    },
    __typename: 'RsvpStatusType',
  },

];

describe('getAttendees', () => {
  it('returns empty string if attendees.length === 0', () => {
    expect(getAttendees([])).toHaveLength(0);
  });

  it('filters attendees from participants array', () => {
    expect(getAttendees(participants)).toHaveLength(1);
    expect(getAttendees(participants)).toEqual(expect.arrayContaining([participants[0]]));
  });
});
