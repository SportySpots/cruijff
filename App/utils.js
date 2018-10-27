/* eslint-disable no-param-reassign */
export const addModelState = (reactComponentInstance, modalName, isOpen = false) => {
  reactComponentInstance.modals = reactComponentInstance.modals || {};
  reactComponentInstance.state.modals = reactComponentInstance.state.modals || {};
  const setState = (state) => {
    reactComponentInstance.setState({
      modals: { ...reactComponentInstance.state.modals, [modalName]: state },
    });
  };
  reactComponentInstance.modals[modalName] = {
    show: () => setState(true),
    hide: () => setState(false),
    get isVisible() {
      return reactComponentInstance.state.modals[modalName];
    },
  };
  reactComponentInstance.state.modals[modalName] = isOpen;
};

export function makeNumGenerator() {
  let i = -1;
  return () => {
    i += 1;
    return i;
  };
}
