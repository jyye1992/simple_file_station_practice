<template>
    <div class="wrapper">
        <div class="container">
            <div class="input">
                <div>
                    <span>Email: </span>
                </div>
                <div>
                    <input type="text"
                           v-model="user"
                    >
                </div>
            </div>
            <div class="input">
                <span>Password: </span>
                <input type="password"
                       v-model="pwd"
                >
            </div>
            <div @click="onSubmit"
                 class="btn"
                 @keypress.enter="onSubmit"
            ><p>submit</p></div>
        </div>
    </div>
</template>

<script>
    import {apiLogin} from "../api";

    export default {
        name: "Login",
        data() {
            return {
                user: '',
                pwd: '',
                ezEncodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                ezDecodeChars: [
                    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
                    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
                    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
                    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
                ],
            }
        },
        computed: {
            ezEncodePwd() {
                return this.ezEncode(this.utf16to8(this.pwd))
            }
        },
        methods: {
            utf16to8(str) {
                let out, i, len, c;
                out = "";
                len = str.length;
                for (i = 0; i < len; i++) {
                    c = str.charCodeAt(i);
                    if ((c >= 0x0001) && (c <= 0x007F)) {
                        out += str.charAt(i);
                    } else if (c > 0x07FF) {
                        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));

                    } else {
                        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    }
                }
                return out;
            },

            ezEncode(str) {
                let out, i, len;
                let c1, c2, c3;

                len = str.length;
                i = 0;
                out = "";
                while (i < len) {
                    c1 = str.charCodeAt(i++) & 0xff;
                    if (i == len) {
                        out += this.ezEncodeChars.charAt(c1 >> 2);
                        out += this.ezEncodeChars.charAt((c1 & 0x3) << 4);
                        out += "==";
                        break;
                    }
                    c2 = str.charCodeAt(i++);
                    if (i == len) {
                        out += this.ezEncodeChars.charAt(c1 >> 2);
                        out += this.ezEncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        out += this.ezEncodeChars.charAt((c2 & 0xF) << 2);
                        out += "=";
                        break;
                    }
                    c3 = str.charCodeAt(i++);
                    out += this.ezEncodeChars.charAt(c1 >> 2);
                    out += this.ezEncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += this.ezEncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                    out += this.ezEncodeChars.charAt(c3 & 0x3F);
                }
                return out;
            },

            onSubmit() {
                console.log('email: ', this.user)
                console.log('ezEncodePwd: ', this.ezEncodePwd)

                apiLogin({
                    params: {
                        user: this.user,
                        pwd: this.ezEncodePwd,
                    }
                })
                    .then(res => {

                        if (res.data.status === 1) {
                            this.$emit('sid', res.data.sid)
                            localStorage.setItem('sid', res.data.sid)
                        }
                    })
            },
        },
    }
</script>

<style scoped>
    .wrapper {
        height: 100vh;


        display: grid;
        place-items: center;
    }

    .container {
        height: 150px;
        width: 25vw;

        display: grid;
        grid-template-rows: repeat(2, 1fr) 0.5fr;
        place-items: center;
    }

    .input {
        display: grid;
        grid-template-columns: minmax(100px, 20%) 1fr;
    }

    .btn {
        background-color: gray;
        width: 300px;
    }

    .btn p {
        text-align: center;
    }

    .btn:hover {
        background-color: black;
        color: white;
    }
</style>