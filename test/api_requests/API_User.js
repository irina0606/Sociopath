var axios = require('axios');
const endpoint = "https://enduring-server.herokuapp.com/v3/graphql";

async function createUser (email, password) {
    var graphQL_data = JSON.stringify({

        query: `mutation userCreate ($email: String!, $password: String!) {
    userCreate (email: $email, password: $password)
}`,
        variables: {"email": email,"password": password}
    });

    const config = await  axios({
        method: 'post',
        url: endpoint,
        data : graphQL_data,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (config.errors) {
        return {errors: config.errors}
    } else {
        const activationLinkId = config.data.userCreate;
        console.log(activationLinkId);
        return { activationLinkId };
    }
}

module.exports = { createUser }