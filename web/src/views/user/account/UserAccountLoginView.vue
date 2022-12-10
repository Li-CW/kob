<template>
    <ContentField>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <div class="mb-3">
                    <label for="username" class="form-label">用户名</label>
                    <input v-model="username" type="text" class="form-control" id="username" placeholder="用户名">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">用户名</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="密码">
                </div>
                <div class="error-message">
                    {{error_message}}
                </div>
                <button @click="login" type="button" class="btn btn-primary">提交</button>
            </div>
        </div>

    </ContentField>
</template>

<script>
import ContentField from "../../../components/ContentField";
import { ref } from "vue";
import { useStore } from "vuex";
import router from "@/router/index";
export default {
    components: {
        ContentField,
    },
    setup() {
        const store = useStore();
        let username = ref("");
        let password = ref("");
        let error_message = ref("");
        const login = () => {
            error_message.value = "";
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                    store.dispatch("getinfo", {
                        success() {
                            router.push({
                                name: "home",
                            })
                            console.log(store.state.user);
                        },
                        error() {
                            
                        }
                    });
 
                },
                error() {
                    error_message.value = "用户名或密码错误";
                }
            });    
        }
        return {
            username,
            password,
            error_message,
            login,
        }

    }
}
</script>

<style scoped>
button {
    width: 100%;
}

.error-message {
    color: red
}
</style>