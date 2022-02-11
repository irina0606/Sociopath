const { expect: chaiExpect, assert } = require("chai");
const { apiCredentials } = require("../data/login.data");
const { createUser_getActivationLinkID,
        activateUser_verification,
        login_getUserTokenAndData,
        deleteUser,
        updateUser,
} = require("../api_requests/API_User");
const loginData = require("../data/login.data");

describe('end-2-end',  () =>{
    let activationLink1 = null;
    let activationLink2 = null;
    let firstName = "Rosy";
    let lastName = "White";
    let about = "Always ready for new opportunities";
    let image = "https://media.istockphoto.com/photos/flower-rose-petal-blossom-red-nature-beautiful-background-picture-id1091007944?k=20&m=1091007944&s=612x612&w=0&h=1qxztvVpzVbWgrgM9zhBS20_GJeO8iRuFhgz5ygpHXU=";
    let job = "Manager";
    let arrLang = ["Java", "JavaScript", "C++"];


    // it('should create user_1 and get activation link ID', async () => {
    //     activationLink1 = await createUser_getActivationLinkID(apiCredentials.email1, apiCredentials.pw1);
    //     console.log(activationLink1.activationLinkId + "            ++++++++++++++++++++++++++++++++++++++++++++++++++++");
    //     expect(!!activationLink1.activationLinkId).toBe(true);
    // });
    //
    // it('should register User_1 and get get verification message', async () => {
    //     const verification = await activateUser_verification(activationLink1.activationLinkId);
    //     console.log(verification.message + "            ++++++++++++++++++++++++++++++++++++++++++++++++++++");
    //     expect(verification.message).toEqual("Activation Successful!");
    // });
    //
    // it('should create user_2 and get activation link ID', async () => {
    //     activationLink2 = await createUser_getActivationLinkID(apiCredentials.email2, apiCredentials.pw2);
    //     console.log(activationLink2.activationLinkId + "            ++++++++++++++++++++++++++++++++++++++++++++++++++++");
    //     expect(!!activationLink2.activationLinkId).toBe(true);
    // });
    //
    // it('should register User_2 and get get verification message', async () => {
    //     const verification = await activateUser_verification(activationLink2.activationLinkId);
    //     console.log(verification.message + "            ++++++++++++++++++++++++++++++++++++++++++++++++++++");
    //     expect(verification.message).toEqual("Activation Successful!");
    // });

    it('should login user_1 and get user ID', async () => {
        const userTokenAndData = await login_getUserTokenAndData(apiCredentials.email1, apiCredentials.pw1);
        console.log(userTokenAndData);
        expect(!!userTokenAndData.token).toBe(true);
        expect(!!userTokenAndData.userID).toBe(true);
        expect(userTokenAndData.email).toHaveTextContaining("White")

    });

    it('should update user_1 and get verification message', async () => {
       const bearerTokenAndUserID = (await login_getUserTokenAndData(apiCredentials.email2, apiCredentials.pw2));
       const newData = await updateUser(bearerTokenAndUserID.token, bearerTokenAndUserID.userID, {values: {firstName, lastName, about, image,job,arrLang}});
       console.log(newData);

    });

    // it('should delete any user by the admin', async () => {
    //     const adminToken = (await login_getUserTokenAndData(loginData.adminCredentials.email, loginData.adminCredentials.password)).token;
    //     const userId = (await login_getUserTokenAndData(apiCredentials.email1, apiCredentials.pw1)).userID;
    //     const verification = await deleteUser(adminToken, userId);
    //     console.log(verification.notification);
    //     await expect(verification.notification).toEqual("User Deleted");
    // });
    //
    // it('should delete any user by himself', async () => {
    //     const bearerTokenAndUserID = (await login_getUserTokenAndData(apiCredentials.email2, apiCredentials.pw2));
    //     const verification = await deleteUser(bearerTokenAndUserID.token, bearerTokenAndUserID.userID);
    //     console.log(verification.notification);
    //     await expect(verification.notification).toEqual("User Deleted");
    // });

});