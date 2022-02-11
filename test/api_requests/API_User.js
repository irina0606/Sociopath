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

async function login_getUserTokenAndData (email, password) {
    const reqData = JSON.stringify({
        query: `query login ($email: String!, $password: String!) {
    login (email: $email, password: $password) {
        accessToken
        user {
            _id
            email
        }
    }
}`,
        variables: {"email":email, "password":password}
    });

    const { data } = await axios ({
        method: 'post',
        url: endpoint,
        data : reqData,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (data.errors) {
        return { errors: data.errors };
    } else {
        const token = data.data.login.accessToken;
        const userID = data.data.login.user._id;
        const email = data.data.login.user.email;
        return  { token, userID, email };
    }
}

async function updateUser (accessToken,userId, {values: { firstName, lastName, about, image, job, arrLang}}) {
    const reqData = JSON.stringify({
        query: `mutation userUpdate ($userId: ID!, $values: UserInput) {
    userUpdate (userId: $userId, values: $values) {
        _id
        email
        firstName
        lastName
        about
        image
        jobTitle
        level
        languages
    }
}`,
        variables: {"userId":userId,"values":{"firstName":firstName,"lastName":lastName, "about": about, "image":image,"jobTitle":job,"languages": [arrLang]}}
    });

    const {data} = await axios ({
        method: 'post',
        url: endpoint,
        data : reqData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
    });
    if (data.errors) {
        return {errors: data.errors};
    } else {
        const notification = data.data.userUpdate;
        return {notification};
    }
}

async function deleteUser (accessToken, userId) {
    const reqData = JSON.stringify({
        query: `mutation userDelete ($userId: ID!) {
    userDelete (userId: $userId)
}`,
        variables: {"userId": userId}
    });

    const {data} = await axios({
        method: 'post',
        url: endpoint,
        data: reqData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
    });
    if (data.errors) {
        return {errors: data.errors};
    } else {
        const notification = data.data.userDelete;
        return {notification};
    }
}

module.exports = {
    createUser_getActivationLinkID,
    activateUser_verification,
    login_getUserTokenAndData,
    deleteUser,
    updateUser,
}
