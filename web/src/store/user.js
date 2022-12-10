import axios from "axios"
export default {
    state: {
        id: "",
        username: "",
        photo: "",
        token: "",
        is_login: false,
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.is_login = user.is_login
        },
        updateToken(state, token) {
            state.token = token;
        },
        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.is_login = false;
            state.token = "";
        }
    },
    actions: {
        login(context, data) {
            const options = {
                method: "post",
                data: {
                    "username": data.username,
                    "password": data.password,
                },
                url: "http://127.0.0.1:3000/user/account/token/"
            }

            axios(options).then((response) => {
                if (response.data.error_message === "success") {
                    context.commit("updateToken", response.data.token);
                    data.success();
                }
                else {
                    data.error();
                }
            }).catch(() => {
                data.error();

            })
        },
        getinfo(context, data) {
            const options = {
                method: "get",
                url: "http://127.0.0.1:3000/user/account/info/",
                headers: {
                    Authorization: "Bearer " + context.state.token,
                }
            }
            axios(options).then((response) => {
                if (response.data.error_message === "success") {
                    context.commit("updateUser", {
                        ...response.data,
                        is_login: true,
                    });
                    data.success(response);
                } else {
                    data.error(response);
                }

            }).catch(() => {
                data.error();
            })
        },
        logout(context) {
            console.log("1111");
            context.commit("logout");
        }
    },
    modules: {
    }
}
