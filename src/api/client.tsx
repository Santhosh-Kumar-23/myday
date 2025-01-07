import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  fromPromise,
  split,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {getMainDefinition} from '@apollo/client/utilities';
import {createClient} from 'graphql-ws';
import * as localStorage from '../constants/localStorage';
import {onlogout} from '../navigation/stackNavigation/navigationUtils';
import {reFreshTokeApi} from './mutation';

// Define URLs
const url = {
  dev: 'https://dev-apimdpd.colanapps.in/graphql',
  local: 'http://192.168.7.49:4000/graphql',
  wsLocal: 'ws://192.168.7.49:4000/graphql', // WebSocket endpoint
  wsDev: 'wss://dev-apimdpd.colanapps.in/graphql',
  staging: 'https://apimdpd.colanapps.in/graphql',
  wsStaging: 'wss://apimdpd.colanapps.in/graphql',
  production: 'https://api.mdpd.in/graphql',
  wsProduction: 'wss://api.mdpd.in/graphql',
};

// Create an HTTP link for queries and mutations
const httpLink = createHttpLink({
  uri: url.production,
});
let refreshingPromise: Promise<any> | null = null;

const getNewToken = async () => {
  if (!refreshingPromise) {
    refreshingPromise = (async () => {
      try {
        const tokenData = await localStorage.getUserInformation();
        const refreshToken = tokenData?.refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token available::::::::::::::::');
        }

        const response = await client.mutate({
          mutation: reFreshTokeApi,
          variables: {refreshToken},
        });

        const data = response?.data?.refreshTokenGenerate;
        if (!data || !data.accessToken || !data.refreshToken) {
          throw new Error(
            'Invalid response from refresh token API:::::::::::::::::::::',
          );
        }

        const updatedTokenData = {
          ...tokenData,
          token: data.accessToken,
          refreshToken: data.refreshToken,
        };

        await localStorage.setUserInformation(updatedTokenData);
        console.log(
          'Refreshed token updatedTokenData::::::::::::::::::::::::::',
          updatedTokenData,
        );
        return data.accessToken;
      } catch (error) {
        console.error('Error refreshing token:::::::::::::::::::::', error);
        // onlogout(); // Log out on refresh failure
        return null;
      } finally {
        refreshingPromise = null;
      }
    })();
  }
  return refreshingPromise;
};

// Set up authentication link
const authLink = setContext(async (_, {headers}) => {
  try {
    ``;
    const tokenData = await localStorage.getUserInformation();
    return {
      headers: {
        ...headers,
        Authorization: tokenData ? `${tokenData.token}` : '',
      },
    };
  } catch (error) {
    return {
      headers: {
        ...headers,
      },
    };
  }
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: url.wsProduction, // Change this based on your environment
    connectionParams: async () => {
      try {
        const tokenData = await localStorage.getUserInformation();
        // console.log('AAAAAAAAAAAAAAAAA::::::TOKANE DATA:::::::::', tokenData);

        return {
          authToken: tokenData ? `Bearer ${tokenData.token}` : '',
        };
      } catch (error) {
        console.error('Error fetching connection params:', error);
        return {}; // Return empty object or handle as needed
      }
    },
    on: {
      opened: () => console.log('WebSocket connection opened'),
      closed: () => console.log('WebSocket connection closed'),
      connected: () => console.log('WebSocket connection connected'),
      connecting: () => console.log('WebSocket connection connecting'),
      message: msg => console.log('WebSocket message:', msg),
      error: err => console.error('WebSocket error:', err),
    },
  }),
);

wsLink.setOnError(error => {
  console.error('WebSocket error:', error);
});

const errorLink = onError(
  ({graphQLErrors, networkError, operation, forward}) => {
    // console.log('graphQLErrors::::::::::::', graphQLErrors);
    // console.log('networkError:::::::::::', networkError);

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        const {message, extensions} = err;

        console.error(
          `[GraphQL error]: Message::::::::::::::::::::::::::::::::::::::::::: ${message}`,
        );

        if (message.includes('TokenExpiredError')) {
          return fromPromise(
            getNewToken().catch(() => {
              // onlogout(); // Log out if refresh fails
              return null;
            }),
          )
            .filter(Boolean)
            .flatMap(accessToken => {
              const oldHeaders = operation.getContext().headers;
              // console.log('oldHeaders', accessToken);
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              });
              // Retry the request with the new token
              return forward(operation);
            });
        } else if (message.includes('Invalid Token')) {
          onlogout();
        } else {
          (global as any).ErrorMessage = message;
        }
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError.message}`);
    }
  },
);

// Split link to determine the transport (HTTP or WebSocket) based on the operation type
const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink, // Use WebSocket for subscriptions
  httpLink, // Use HTTP for queries and mutations
);

// Combine all links (auth, error handling, and transport selection)
const link = from([authLink, errorLink, splitLink]);

// Create the Apollo Client instance
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
