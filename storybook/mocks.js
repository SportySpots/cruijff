const Mocks = {};

Mocks.game = {
  uuid: '6b7588e0-0c95-4797-94ea-51b03e1eedbf',
  name: "Sez's dgsldkgj lksdjgklsdjg sdg ferferf erferferf erfefrref regrtgr rtgretgrt rgtregtrtg rtgrgt game",
  start_time: '2018-05-24T16:00:00+00:00',
  end_time: '2018-05-24T04:00:00+00:00',
  is_featured: false,
  show_remaining: true,
  capacity: 8,
  description: 'The description',
  status: 'PLANNED',
  sport: {
    category: 'BEACH_VOLLEYBALL',
  },
  spot: {
    name: 'Oosterpark',
    images: [
      {
        image: 'https://s3.amazonaws.com/sportyspots-prd/spots/dea377b2-cff8-49ae-97ea-475d22a3a477/images/Paramariboplein.jpg',
      },
    ],
  },
  organizer: {
    first_name: 'Tom',
    last_name: 'Klaver',
  },
  attendees: [
    {
      status: 'ATTENDING',
      user: {
        first_name: 'Rolf',
        last_name: 'Thijsen',
      },
    },
    {
      status: 'ATTENDING',
      user: {
        uuid: '1',
        first_name: 'Rolf',
        last_name: 'Thijsen',
      },
    },
    {
      status: 'ATTENDING',
      user: {
        uuid: '2',
        first_name: 'Rolf',
        last_name: 'Thijsen',
      },
    },
    {
      status: 'OTHER_STATUS',
      user: {
        uuid: '3',
        first_name: 'Tom',
        last_name: 'Klaver',
      },
    },
  ],
};

export default Mocks;
