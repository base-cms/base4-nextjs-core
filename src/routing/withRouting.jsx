import React from 'react';
import nextRoutes from 'next-routes';
import RoutingContext from './context';
import { componentDisplayName } from '../utils';

const { isArray } = Array;

const once = (fn) => {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
};

const createRoutes = once((definitions) => {
  const routes = nextRoutes();
  definitions.forEach(def => routes.add(def));
  return routes;
});

export default definitions => (ComposedComponent) => {
  if (!isArray(definitions)) {
    throw new Error('No route definitions were provided!');
  }
  const routes = createRoutes(definitions);

  class WithRouting extends React.Component {
    /**
     *
     * @param {object} args
     */
    static async getInitialProps(args) {
      const { Component, router } = args;

      console.log('routes', Object.keys(routes));
      console.log('router', Object.keys(router));

      let composedInitialProps = { Component, router };
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(args);
      }
      return { ...composedInitialProps };
    }

    /**
     *
     */
    render() {
      return (
        <RoutingContext.Provider value={routes}>
          <ComposedComponent {...this.props} />
        </RoutingContext.Provider>
      );
    }
  }
  WithRouting.displayName = `withRouting(${componentDisplayName(ComposedComponent)})`;
  return WithRouting;
};
