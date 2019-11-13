// https://github.com/jamiebuilds/unstated-next
import React from "react"

export interface ContainerProviderProps<State = void> {
  initialState?: State;
  children: React.ReactNode;
}

export interface Container<Value, State = void> {
  Provider: React.ComponentType<ContainerProviderProps<State>>;
  useContainer: () => Value;
}

export function createContainer<Value, State = void>(
  useHook: (initialState?: State) => Value,
): Container<Value, State> {
  const Context = React.createContext<Value | null>(null)

  function Provider(props: ContainerProviderProps<State>) {
    const value = useHook(props.initialState)
    return <Context.Provider value={value}>{props.children}</Context.Provider>
  }

  function useContainer(): Value {
    const value = React.useContext(Context)
    if (value === null) {
      throw new Error("Component must be wrapped with <Container.Provider>")
    }
    return value
  }

  return { Provider, useContainer }
}

export function useContainer<Value, State = void>(
  container: Container<Value, State>,
): Value {
  return container.useContainer()
}

import { createFactory } from 'react'

export const nest = (Components: React.Component[]) => {
  const factories = Components.map(createFactory)
  const Nest = ({ children, ...props }) =>
    factories.reduceRight((child, factory) => factory(props, child), children)

  if (process.env.NODE_ENV !== 'production') {
    const displayNames = Components.map(comp => comp ? ((comp as any).displayName || (comp as any).name || 'Component') : 'undefined');
    Nest.displayName = `nest(${displayNames.join(', ')})`
  }

  return Nest
}
