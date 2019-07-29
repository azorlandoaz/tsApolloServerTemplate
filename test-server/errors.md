# Microservice errors


This document shows controlled errors that this microservice returns in GraphQL requests. The **Coverage** item shows where the error can be throw.

**For developers**: This document also has [guide](#how-to-build-and-throw-a-known-error) that tells how to build and throw known errors.

## Errors

| Code | Message | Coverage | Reason |
| - | - | - | - |
| `"1"` | **Unknown message** | Thrown by `changeApprovalFlowState` mutation. | Thrown when a unknown error happens. E.g DB error connection, RequestAPI error, etc. |
| `"2"` | `"Test record doesn't exists."` | Thrown by `getTestById` query. | The given file identifier doesn't match with any test record. |
| `"3"` | `"The user cannot see test records since it isn't repository owner."` | Thrown by `getTestById` mutation. | Session user has not the required `'repository-owner'` functional objective to perform the operation. |


## How to build and throw a known error

### Build a known error

Just place your error definition as a new field of the `errors` object in `@app/common/constants/errors` like:

```typescript
const errors = {
  // More errors here...
  // ...
  APPLES_NOT_FOUND: buildApolloError(
    '<A unique and recognizable error code here>',
    `<A short message that describes the error intended for final users>`
  )
};
```

Please note that the name of the field that is added to `errors` object must be capitalized and separated with underscores.

### Throw a known error

Once the new error is added it can be thrown in any graphql resolver like:

```typescript
import Apples from '@app/models/mongoose/apples'
import ERRORS from '@app/common/constants/errors' // Errors imported here
import getLogger from '@app/common/utils/logger'

export async function myResolver(_, args: any, ctx: any) {
  const apples = await Apples.find({
    tenantId: ctx.session.tenantId
  })
  .catch(mongoError => {
    getLogger().error(`There was an error getting the apples from DB. Details: ${mongoError}`);

    // Throw an unknown error with the structure of a known error.
    return Promise.reject(ERRORS.generateUnknownError('Internal server error connecting to DB to get apples.'));
  });

  if (!apples) {
    return Promise.reject(ERRORS.APPLES_NOT_FOUND);
  }

  return apples;
}

```
Note how the `ERRORS` object is used with `Promise.reject`. This is the way to throw errors in async resolvers, but in normal resolvers it would be a normal `throw` statement like `throw ERRORS.APPLES_NOT_FOUND`.

### The result of a query with known errors

Following the [official spec of graphql about errors](https://graphql.github.io/graphql-spec/June2018/#sec-Errors-and-Non-Nullability) and [the shape of errors by Apollo server](https://www.apollographql.com/docs/apollo-server/features/errors), a resolver that throws know errors by the way described in this document will have a result like:

```javascript
{
  "errors": [
    {
      "message": "There are none apple", // The message of the known error
      "locations": [
        // ...
      ],
      "path": [
        // ...
      ],
      "extensions": {
        "code": "3", // The code of the known error
        "exception": {
          "stacktrace": [
            // ...
          ]
        }
      }
    }
  ],
  "data": null
}
```
