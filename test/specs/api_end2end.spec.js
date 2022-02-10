const { expect: chaiExpect, assert } = require("chai");
const { apiCredentials } = require("../data/login.data");
const { createUser_getActivationLinkID, activateUser_verification, login_getUserTokenAndData } = require("../api_requests/API_User");

let activationLink1 = null;
let activationLink2 = null;

describe('end-2-end',  () =>{

    // it('should create user_1 and get activation link ID', async () => {
    //     activationLink1 = await createUser_getActivationLinkID(apiCredentials.email1, apiCredentials.pw1);
    //     console.log(activationLink1.activationLinkId + "            ++++++++++++++++++++++++++++++++++++++++++++++++++++");
    //     expect(!!activationLink1.activationLinkId).toBe(true);
    // });
    //
    // it('should get notification "Activation Successful!" for User_1', async () => {
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
    // it('should get notification "Activation Successful!" for User_2', async () => {
    //     const verification = await activateUser_verification(activationLink2.activationLinkId);
    //     console.log(verification.message + "            ++++++++++++++++++++++++++++++++++++++++++++++++++++");
    //     expect(verification.message).toEqual("Activation Successful!");
    // });

    it('should login user_1 and get user ID', async () => {
        const accessToken = await login_getUserTokenAndData(apiCredentials.email1, apiCredentials.pw1);
        const userID = await login_getUserTokenAndData(apiCredentials.email1, apiCredentials.pw1);
        const userEmail = await login_getUserTokenAndData(apiCredentials.email1, apiCredentials.pw1);
        console.log(accessToken);
        console.log(userID);
        console.log(userEmail);
        expect(!!accessToken.token).toBe(true);
        expect(!!userID.userID).toBe(true);
        expect(userEmail.email).toHaveTextContaining("White")

    });

    // it('should delete any user by the admin', async () => {
    //
    // });

});