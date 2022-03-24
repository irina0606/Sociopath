const {expect: chaiExpect, assert} = require("chai");
const {apiCredentials, resetPW, userCredentials} = require("../data/login.data");
const {
    createUser_getActivationLinkID,
    activateUser_verification,
    login_getUserTokenAndData,
    deleteUser,
    updateUser,
    passwordResetRequest,
    getUser,
    getUsers,
    userLogout,
} = require("../api_requests/API_User");
const loginData = require("../data/login.data");

describe('end-2-end', () => {
    let activationLink1 = null;
    let activationLink2 = null;
    let accessToken = null;
    let userID = null;
    let email = null;
    let firstName = "Rosy";
    let lastName = "White";
    let about = "Always ready for new opportunities";
    let image = "https://media.istockphoto.com/photos/flower-rose-petal-blossom-red-nature-beautiful-background-picture-id1091007944?k=20&m=1091007944&s=612x612&w=0&h=1qxztvVpzVbWgrgM9zhBS20_GJeO8iRuFhgz5ygpHXU=";
    let job = "QA Engineer";
    let arrLang = ["Java", "JavaScript", "C++"];
    let userPW_Request_verification = `Password reset email sent to ${apiCredentials.email1}, if such user exists`;
    let particularName = "Maria";

    it('should login user_1 and get user ID', async () => {
        accessToken = (await login_getUserTokenAndData(userCredentials.email, userCredentials.pw)).token;
        userID = (await login_getUserTokenAndData(userCredentials.email, userCredentials.pw)).userID;
        email = (await login_getUserTokenAndData(userCredentials.email, userCredentials.pw)).email;
        expect(!!accessToken).toBe(true);
        expect(!!userID).toBe(true);
        expect(email).toHaveTextContaining("Manya");
    });

    it('should update user_1 and get verification message', async () => {
        const newData = await updateUser(accessToken, userID, {
            values: {
                firstName,
                lastName,
                about,
                image,
                job,
                arrLang
            }
        });
        console.log(newData);
        expect(firstName).toEqual("Rosy");
        chaiExpect(arrLang).not.be.empty;
    });

    it('should reset pw and get verification message', async () => {
        const verification = await passwordResetRequest(accessToken, email)
        console.log(verification.notification);
        expect(verification.notification).toHaveTextContaining("Password reset email sent")
    });

    it('should get the user`s data', async () => {
        const userInfo = await getUser(accessToken, userID);
        expect(userInfo.userData).toHaveValueContaining(job);
    });

    it('should get the info of all users  and verify the quantity of users', async () => {
        const usersInfo = await getUsers(accessToken, 0, Infinity);
        console.log(usersInfo.usersData.length);
        expect(usersInfo.usersData.length > 100).toEqual(true);
    });

    it('should get the first name, last name and job of the users within the boundaries', async () => {
        const usersInfo = await getUsers(accessToken, 0, 5);
        let particularData = [];
        for (let i = 0; i < usersInfo.usersData.length; i++) {
            particularData.push(usersInfo.usersData[i].firstName + " " + usersInfo.usersData[i].lastName + " is: " + usersInfo.usersData[i].jobTitle);
        }
        console.log(particularData);
        //expect(particularData).toExist();
    });

    it('should get the info of user 3', async () => {
        const usersInfo = await getUsers(accessToken, 0, 3);
        const particularUserData = await (usersInfo.usersData[2]);
        console.log("*******************************")
        console.log(particularUserData);
        console.log("*******************************")
        expect(usersInfo.usersData[2]).toBeTruthy();
    });

    it('should filter all users with the particular attr', async () => {
        const usersInfo = await getUsers(accessToken, 0, Infinity);
        let count = 0;
        for (let i = 0; i < usersInfo.usersData.length; i++) {
            if (usersInfo.usersData[i].jobTitle === job) {
                count++;
            }
        }
        console.log(count);
    });

    it('should logout and go back to login page', async () => {
        const logOut = await userLogout(accessToken);
        expect (logOut.backToLogin).toBe(true);
        //expect (browser).toHaveUrl("https://enduring.netlify.app/login");
    });

});
