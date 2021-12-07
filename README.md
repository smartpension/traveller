## Traveller - Smart Take-Home Technical Test

## Goals

1.  Update the client to allow a user to use the provided input to search for cities and set their visited/wishlist state via API requests.
2.  Cities that have visited/wishlist set to true should then appear on their respective pages.

## Install

We have provided you with the beginnings of an app that is not yet fully functional.
Within packages, you will find a `client` and an `api` folder, which you can run with the commands below.

To run the API:

```
yarn install
yarn dev
```

To run the client:

```
yarn install
yarn start
```

## Info

### API

We have provided both a REST API, scoped under `/rest`, as well as a GraphQL API located at `/graphql` . You can find the REST API routes in `packages/api/src/cities/routes.ts` and the GraphQL resolvers in `packages/api/src/graphql/resolvers.ts`. You are free to use whichever API you're comfortable with in your solution.

With either API you will be able to query cities with the following params:

- id
- name
- country
- visited
- wishlist
- offset
- limit

### Client

After running the client you will find a home page with an input field that is currently non-functional as well an empty wish list and visited pages.

We have provided a few packages that will help you in your solution:

- If you choose to use GraphQL we have added Apollo Client.
- For testing, we have provided Jest/React Testing Libary.
- For styling, you will find the component library Chakra UI.

## What we're looking for

- Use of abstractions where they make sense (DRY).
- Sensible choices regarding performance.
- Functionality tested.
- An accessible solution.
