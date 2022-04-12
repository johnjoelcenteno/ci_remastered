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




class Credentials {
    static idUsernameInput = "";
    static idPasswordInput = "";
    static idConfirmPasswordInput = "";

    static loginEndpoint = "";
    static logoutEndpoint = "";

    static ValidateConfimPassword() {
        if (this.idPasswordInput == "" || this.idConfirmPasswordInput == "") {
            console.error("null static properties");
            throw "null static properties";
        }

        const passwordInput = document.getElementById(this.idPasswordInput);
        const confirmPasswordInput = document.getElementById(this.idConfirmPasswordInput);

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

    static Login() {

    }

    static Logout() {

    }
}