class Guid {
    static NewGuid() {
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}


class Request {
    endpoint = baseUrl;

    constructor(endpoint, toBeSentObj = {}) {
        this.endpoint += endpoint;
        this.toBeSentObj = toBeSentObj;
    }

    SendPost() {
        return new Promise(resolve => $.post(this.endpoint, this.toBeSentObj, resp => resolve(resp)));
    }

    Get() {
        return new Promise(resolve => $.get(this.endpoint, resp => resolve(resp)));
    }

}

class Credentials {
    static usernameSelector = "";
    static passwordSelector = "";
    static confirmPasswordSelector = "";

    static loginEndpoint = "";
    static logoutEndpoint = "";

    static ValidateConfimPassword() {
        if (this.passwordSelector == "" || this.confirmPasswordSelector == "") {
            console.error("null static properties");
            throw "null static properties";
        }

        const passwordInput = document.getElementById(this.passwordSelector);
        const confirmPasswordInput = document.getElementById(this.confirmPasswordSelector);

        const passwordValue = passwordInput.value;
        const confirmPasswordValue = confirmPasswordInput.value;

        if (passwordValue == "" || confirmPasswordValue == "") {
            throw "empty fields";
        }

        if (passwordValue != confirmPasswordValue) {
            passwordInput.style.border = "solid 1px red";
            confirmPasswordInput.style.border = 'solid 1px red';

            return false;
        }

        passwordInput.style.border = "solid 1px green";
        confirmPasswordInput.style.border = 'solid 1px green';
        return true;
    }

    static async Login(username, password) {
        if (this.loginEndpoint == "") throw "Invalid login endpoint";
        if (username == "" | username == null | password == "" | password == null) throw "Username Password should not be null";
        const request = new Request(this.loginEndpoint, { username, password });
        return await request.SendPost();
    }

    static async Logout() {
        const request = new Request(this.logoutEndpoint);
        const resp = await request.Get();
        if (resp == "success") window.location.replace(this.loginEndpoint);
    }
}