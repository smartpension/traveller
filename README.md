# Traveller - Smart front end take-home technical test

## Goals

1.  Allow the user to search for cities using the provided input.
2.  Display the cities found on the home page.
3.  Allow the user to set the visited/wishlist state of a city to `true`/`false` via API requests.
4.  Cities that have visited/wishlist set to `true` should then appear on their respective pages.

## Install and run

```
npx lerna bootstrap
yarn start:all
```

## Info

### API

We have provided both a REST and a GraphQL API, you are free to use whichever you are most comfortable with in your solution. You can find documention for these at the following URLS:

- REST - [http://localhost:4000/rest](http://localhost:4000/rest)
- GraphQL - [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Client

After running the client you will find a home page with an input field that is currently non-functional as well an empty wish list and visited pages.

We have provided a few packages that will help you in your solution:

- If you choose to use GraphQL we have added [Apollo Client](https://www.apollographql.com/docs/react).
- For testing, we have provided [Jest](https://jestjs.io)/[React Testing Libary](https://testing-library.com/docs/react-testing-library/intro).
- For styling, you will find the component library [Chakra UI](https://chakra-ui.com).

## What we're looking for

- Use of abstractions where they make sense (DRY).
- Sensible choices regarding performance.
- Functionality tested.
- An accessible solution.
- We use TypeScript and would be happy to see a well typed solution, however if you're not comfortable with this feel free to use JavaScript.
