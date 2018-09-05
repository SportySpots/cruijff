import { createStore } from 'redux';

export const store = createStore(state => state, {
  user: {
    /* the following uuid is not random, but it is in fact the uuid of the game
       organizer when the first game mock is generated (fixed random seed). This is
       so that the cancel game shows at all.
    */
    uuid: 'f0db3473-9fde-42c0-a107-d9c9758f1926',
  },
});

export const navigation = {
  state: { params: { uuid: 'cdfa268a-e809-43be-a659-bd2310737bab' } },
};
