// Own
// Utils
import { getConfigValue } from '@app/common/util/functions';

const _apolloEndpoint = getConfigValue('APOLLO_ENDPOINT') || 'graphql';
let _introspectionEnabled =
  getConfigValue('APOLLO_INTROSPECTION_ENABLED') || false;

if (typeof _introspectionEnabled === 'string') {
  _introspectionEnabled = _introspectionEnabled === 'true' ? true : false;
}

const _playgroundEnabled = !!getConfigValue('APOLLO_PLAYGROUND_ENABLED');
const _playgroundEndpoint =
  getConfigValue('APOLLO_PLAYGROUND_ENDPOINT') || 'graphql';

// Set the constants with validated values

export const ENDPOINT = _apolloEndpoint;
export const INTROSPECTION_ENABLED: boolean = _introspectionEnabled;
export const PLAYGROUND = {
  enabled: _playgroundEnabled,
  endpoint: _playgroundEndpoint
};
