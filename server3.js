import {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
 } from "graphql";
 import PersonType from "./types/PersonType";

 const BASE_URL = 'httpL//myapp.com/';

 function fetchResponseByUrl(relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`).then( res => res.json());
 };

 function fetchPeople() {
  return fetchResponseByUrl('/people').then(json => json.people);
 };

 function fetchPersonByURL(relativeURL) {
  return fetchResponseByUrl(relativeURL).then(json.json.person);
 };

 const PersonType = new GraphQLObjectType({
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

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "the root of all...queries",
  fields: () => ({
    allPeople: {
      type: new GraphQLList(PersonType),
      resolve: fetchPeople(),
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => fetchPersonByURL(`/people/${args.id}/`),
    }
  })
});


export default new GraphQLSchema({
  query: queryType,
});