/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';

import CappedList from '.';

const Comp = () => <View />;
const CapComp = () => <View id="cap" />;

describe('CappedList', () => {
  it('renders whole list when max >= data.length', () => {
    const Capped = renderer.create(<CappedList
      max={5}
      data={[1, 2, 3, 4, 5]}
      component={Comp}
      propsMap={item => ({ num: item })}
      capComponent={CapComp}
    />);

    const tree = Capped.toTree().rendered;

    expect(tree).toHaveLength(9); // components + spacers: 5 + 4
    expect(tree[0].type).toBe(Comp);
    expect(tree[0].props).toEqual({ num: 1 });
  });

  it('works without propsMap', () => {
    const data = [{ a: 1 }, { b: 2 }];
    const Capped = renderer.create(<CappedList
      max={5}
      data={data}
      component={Comp}
      capComponent={CapComp}
    />);

    const tree = Capped.toTree().rendered;

    expect(tree).toHaveLength(3); // components + spacers: 2 + 1
    expect(tree[0].props).toEqual(data[0]);
    expect(tree[2].props).toEqual(data[1]);
  });

  describe('capped (max < data.length)', () => {
    const data = [1, 2, 3, 4, 5];
    it('terminates with capComponent', () => {
      const Capped = renderer.create(<CappedList
        max={3}
        data={data}
        component={Comp}
        propsMap={item => ({ num: item })}
        capComponent={CapComp}
      />);

      const tree = Capped.toTree().rendered;

      expect(tree).toHaveLength(5); // components + spacers: 3 + 2
      expect(tree[0].type).toBe(Comp);
      expect(tree[4].type).toBe(CapComp);
      expect(tree[4].props.data).toEqual([3, 4, 5]);
/*
      expect(tree).toHaveLength(3);
      expect(tree[0].type).toBe(Comp);
      expect(tree[2].type).toBe(CapComp);
      expect(tree[2].props.data).toEqual([3, 4, 5]);
*/
    });

    it('works without capComponent', () => {
      const Capped = renderer.create(<CappedList
        max={3}
        data={data}
        component={Comp}
      />);

      const tree = Capped.toTree().rendered;

      expect(tree).toHaveLength(5);
      expect(tree[0].type).toBe(Comp);
      expect(tree[2].type).toBe(Comp);
    });
  });
});
