import ApolloClient, { gql } from 'apollo-boost';
import fetch from 'cross-fetch';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    fetch: fetch
});


// Gets the authentication token for a user
const getUserToken = async (id: number): Promise<string> => {
  const authQuery = gql`
    query {
        authenticate(userId:"${id}") {
            jwt
        }
    }
    `;
  try {
    const result = await client.query({ query: authQuery });
    const token: string = result.data.authenticate.jwt;
    return token;
  } catch {
    return "";
  }
};

// Gets the vault content as a user
const getVaultAsUser = async (id: number): Promise<string> => {
  // Get the token for user and use it as Authorization token for vault query
  const token = await getUserToken(id);
  const vaultQuery = gql`
    query {
      vault {
        treasures
      }
    }
  `;

  try {
    // Vault query, use token
    const result = await client.query({
      query: vaultQuery,
      context: { headers: { Authorization: token } },
      fetchPolicy: "no-cache",
    });
    return result.data.vault.treasures;
  } catch (e) {
    return e.message;
  }
};


// Hero 1 should get access denied when trying to fetch treasures, hero 2 should get the treasures
(async () => {
  const treasure1 = await getVaultAsUser(1);
  const treasure2 = await getVaultAsUser(2);
  console.log(`Hero 1 fetching treasure: ${treasure1}`);
  console.log(`Hero 2 fetching treasure: ${treasure2}`);
})();

