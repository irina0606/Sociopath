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

// it('should create user_2 and get activation link ID', async () => {
//     activationLink2 = await createUser_getActivationLinkID(apiCredentials.email2, apiCredentials.pw2);
//     console.log(activationLink2.activationLinkId + "            ++++++++++++++++++++++++++++++++++++++++++++++++++++");
//     expect(!!activationLink2.activationLinkId).toBe(true);
// });
//
// it('should register User_2 and get verification message', async () => {
//     const verification = await activateUser_verification(activationLink2.activationLinkId);
//     console.log(verification.message + "            ++++++++++++++++++++++++++++++++++++++++++++++++++++");
//     expect(verification.message).toEqual("Activation Successful!");
// });

// it('should login user_1 and get user ID', async () => {
//     accessToken = (await login_getUserTokenAndData(apiCredentials.email1, apiCredentials.pw1)).token;
//     userID = (await login_getUserTokenAndData(apiCredentials.email1, apiCredentials.pw1)).userID;
//     email = (await login_getUserTokenAndData(apiCredentials.email1, apiCredentials.pw1)).email;
//     expect(!!accessToken).toBe(true);
//     expect(!!userID).toBe(true);
//     expect(email).toHaveTextContaining("White");
// });




//
// it('should delete any user by the admin', async () => {
//     const adminToken = (await login_getUserTokenAndData(loginData.adminCredentials.email, loginData.adminCredentials.password)).token;
//     const verification = await deleteUser(adminToken, userID);
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