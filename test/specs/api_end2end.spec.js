const api_Irina = require("../../helpers/apiMethods_Irina");
const loginData = require("../../data/login.data");

describe('end-2-end', async () =>{
    it('should create user via API', async () => {
        await api_Irina.createUser(loginData.fakeCredentialsUser4.email, loginData.fakeCredentialsUser4.password);
    });
});