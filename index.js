import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from "./schema";
import DataLoader from "dataloader";

function getPersonByURL(relativeURL) {
    return fetch(`${BASE_URL}${relativeURL}`)
        .then(res => res.json())
        .then(json => json.person);
};

const app = express();

app.use(graphQLHTTP(req => {
    const personLoader = new DataLoader(
        keys => Promise.all(keys.map(getPersonByURL))
    );
    const loaders = {
        person: personLoader,
    };

    return {
        context: {loaders},
        schema,
        graphiql: true, // browse teh schema
    };
}));

app.listen(5000);