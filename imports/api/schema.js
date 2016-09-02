import { Random } from 'meteor/random';

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

export const schema = [`
type Email {
  address: String
  verified: Boolean
}

type User {
  emails: [Email]
  username: String
  randomString: String
  mother: Mom
}

type Query {
  user(id: String!): User
}

type Mom {
  weight: Int
}

schema {
  query: Query
}
`];

export const resolvers = {
  Query: {
    async user(root, args, context) {
      // Only return the current user, for security
      if (context.userId === args.id) {
        return await Meteor.users.findOne(context.userId);
      }
    },
  },
  User: {
    emails: ({emails}) => emails,
    randomString: () => Random.id(),
    mother: () => {weight: 100}
  }
}
