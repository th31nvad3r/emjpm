import { ApolloClient, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";

import { isBrowser } from "~/util";
import { authCredentials } from "~/util/auth";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser()) {
  global.fetch = fetch;
}

const getToken = () => {
  const { token } = authCredentials;
  if (!token) {
    return null;
  }
  return "Bearer " + token;
};

const {
  publicRuntimeConfig: { GRAPHQL_SERVER_URI, GRAPHQL_SERVER_URI_DOCKER },
} = getConfig();

function create(initialState) {
  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    if (token) {
      return {
        headers: {
          ...headers,
          Authorization: token ? token : null,
        },
      };
    }
    return {
      headers: {
        ...headers,
        "X-Hasura-Role": "anonymous",
      },
    };
  });

  const adjustedUri =
    isBrowser() && process.env.NODE_ENV === `development`
      ? GRAPHQL_SERVER_URI
      : GRAPHQL_SERVER_URI_DOCKER;

  const httpLink = createHttpLink({
    credentials: "same-origin",
    uri: adjustedUri,
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: isBrowser(),
    link: authLink.concat(httpLink),
    resolvers: {},
    ssrMode: typeof window === "undefined",
  });
}

export default function initApolloClient(initialState, context) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, context);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
