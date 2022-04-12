async function login() {
    Credentials.loginEndpoint = "Signin/postLogin";
    await Credentials.Login("superadmin", "1234");
}

async function logout() {
    Credentials.logoutEndpoint = "Signout";
    const resp = await Credentials.Logout();
    console.log(resp);
}

logout();
