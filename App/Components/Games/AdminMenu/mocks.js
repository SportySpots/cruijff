import { createStore } from 'redux';

export const store = createStore(state => state, {
  user: {
    /* the following uuid is not random, but it is in fact the uuid of the game
       organizer when the first game mock is generated (fixed random seed). This is
       so that the cancel game shows at all.
    */
    uuid: 'e67862f3-ccbf-4c51-b8ed-ed1d0420ea19',
  },
});

export const navigation = {
  state: { params: { uuid: 'cdfa268a-e809-43be-a659-bd2310737bab' } },
  navigate: () => {},
  popToTop: () => {},
  goBack: () => {},
  dispatch: () => {},
};

