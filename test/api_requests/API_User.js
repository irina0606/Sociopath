const axios = require('axios');
const endpoint = "https://enduring-server.herokuapp.com/v3/graphql";

async function createUser_getActivationLinkID (email, password) {
    const reqData = JSON.stringify({

        query: `mutation userCreate ($email: String!, $password: String!) {
    userCreate (email: $email, password: $password)
}`,
        variables: {"email": email,"password": password }
    });

    const config = await  axios({
        method: 'post',
        url: endpoint,
        data : reqData,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (config.data.errors) {
        return config.data.errors;
    } else {
        const activationLinkId = config.data.data.userCreate;
        return { activationLinkId };
    }
}

async function activateUser_verification (activationLinkID) {
    const reqData = JSON.stringify({
        query: `mutation userActivate ($activationLinkId: String!) {
    userActivate (activationLinkId: $activationLinkId)
}`,
        variables: {"activationLinkId": activationLinkID}
    });

    const  { data }  = await axios ({
        method: 'post',
        url: endpoint,
        data: reqData,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (data.errors) {
        return { errors: data.errors};
    } else {
        const message = data.data.userActivate;
        return  { message };
    }
}

// async function login_getUserTokenAndData (email, pasword) {
//     const reqData = JSON.stringify({
//         query: `query login ($email: String!, $password: String!) {
//     login (email: $email, password: $password) {
//         accessToken
//         user {
//             _id
//             email
//             firstName
//             lastName
//         }
//     }
// }`,
//         variables: {"email":email, "password":pasword}
//     });
//
//     const config = await axios ({
//         method: 'post',
//         url: endpoint,
//         data : reqData;
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     });
//
//     if (config.data.errors) {
//         return { errors: config.data.errors};
//     } else {
//         const token = config.data.userActivate;
//         return  { message };
//     }
// }

module.exports = {
    createUser_getActivationLinkID,
    activateUser_verification,
}
