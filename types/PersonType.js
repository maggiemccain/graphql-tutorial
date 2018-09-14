import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

export default PersonType = new GraphQLObjectType({
    name: 'Person',
    decription: 'somebody that you used to know',
    fields: () => ({
        firstName: {
            type: GraphQLString,
            resolve: person => person.first_name,
        },
        lastName: {
            type: GraphQLString,
            resolve: person => person.last_name,
        },
        email: {type: GraphQLString},
        id: {type: GraphQLString},
        username: {type: GraphQLString},
        friends: {
            type: new GraphQLList(PersonType),
            resolve: person => person.friends.map(getPersonByUrl),
        },
    }),
});