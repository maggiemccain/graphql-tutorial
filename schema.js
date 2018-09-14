import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} from 'graphql';
import fetch from 'node-fetch';

const BASE_URL = 'localhost:8080';

const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: '...',
    fields: () => ({
        firstName: {
            type: GraphQLString,
            resolve: () => person.first_name,
        },
        lastName: {
            type: GraphQLString,
            resolve: () => person.last_name,
        },
        email: {type: GraphQLString},
        id: {type: GraphQLString},
        username: {type: GraphQLString},
        friends: {
            type: new GraphQLList(PersonType),
            resolve: (person, args, {loaders}) => loaders.person.loadMany(person.friends)

        },


    })
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
        person: {
            type: PersonType,
            args: {
                id: {type: GraphQLString},
            },
            response: (root, args, {loaders} ) => loaders.person.load(`/people/${args.id}/`)
        }
    })
});

export default new GraphQLSchema({
    query: QueryType,

})