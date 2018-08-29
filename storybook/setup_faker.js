/* eslint-disable import/no-extraneous-dependencies */
import Random from 'faker/lib/random';
import faker from 'faker';

function bindAll(obj) {
  Object.keys(obj).forEach(function(meth) {
    if (typeof obj[meth] === 'function') {
      obj[meth] = obj[meth].bind(obj);
    }
  });
  return obj;
}
const seed = 1;
faker.random = bindAll(new Random(faker, seed));
