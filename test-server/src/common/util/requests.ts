// Own
import { RequestAPI, gql, SERVERS_NAMES } from 'mdk-services-interface';
// Constants
import { API_GATEWAY_URL } from '@app/common/constants/general';
import getLogger from '@app/common/util/logger';
import { MDKSession } from 'mdk-services-interface/dist/common/types/mdk-session';

/**
 * make a request to test-02-server, its redirected by the api-server to test-02-server
 * with the getTest operation name
 * @param  {string} id
 * @param  {MDKSession} session
 * @returns Promise
 */
export async function requestTest2ByIdToAPI(
  id: string,
  session: MDKSession
): Promise<any> {
  const test_02 = await new Promise(resolve => {
    new RequestAPI()
      .GQLRequest({
        APIGatewayURL: API_GATEWAY_URL,
        targetServer: SERVERS_NAMES.USERS_SERVER,
        session: session,
        operationName: 'getTest',
        query: gql`
          query {
            myField {
              id
            }
          }
        `,
        variables: {
          id: id
        }
      })
      .subscribe(
        (response: any) => resolve(response.data.getUserById),
        error =>
          getLogger().error(
            `there was an error requesting the test-02-server to api: ${error}`
          )
      );
  });
  return test_02;
}
