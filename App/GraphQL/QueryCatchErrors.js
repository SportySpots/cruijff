import React from 'react';
import { Query } from 'react-apollo';
import Analytics from 'appcenter-analytics';
import PropTypes from 'prop-types';
import I18n from '../I18n';
import NothingFound from '../Components/Common/NothingFound';

// TODO: solve eslint errors, test and implement across all queries
// use default export
export const QueryCatchErrors = (props) => {
  const {
    children, logErrors, errorComponent, crashApp, ...queryProps
  } = props;

  const ErrorComponent = errorComponent;

  return (
    <Query {...queryProps}>
      { (queryResultProps) => {
        try {
          if (queryResultProps.error) {
            const queryText = queryProps.query.loc && queryProps.query.loc.source.body.replace(/\n|\r/g, '');
            console.log(
              queryResultProps.error,
              queryText,
            );
            if (logErrors) {
              Analytics.trackEvent('GraphQL error', {
                error: JSON.stringify(queryResultProps.error),
                query: queryText,
              });
            }
            return <ErrorComponent {...queryResultProps} />;
          }
          return children(queryResultProps);
        } catch (e) {
          if (crashApp) {
            throw new Error(`GraphQL Error ${JSON.stringify(queryResultProps.error)}`);
          }
          // console.error(e);
          return null;
        }
      } }
    </Query>
  );
};

QueryCatchErrors.propTypes = {
  children: PropTypes.func.isRequired,
  logErrors: PropTypes.bool,
  errorComponent: PropTypes.func,
  crashApp: PropTypes.bool,
};

QueryCatchErrors.defaultProps = {
  logErrors: true,
  crashApp: false,
  errorComponent: () => (
    <NothingFound
      iconSet="MaterialCommunityIcons"
      iconName="alert"
      text={I18n.t('queryCatchErrors.errorMsg')}
    />
  ),
};
