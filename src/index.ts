import getApolloInstance from "./startGraphql";

async function initApollo() {
  const apolloInstance = getApolloInstance();
  await apolloInstance.startGraphQLServer();
}

(async () => {
  await initApollo();
})();
