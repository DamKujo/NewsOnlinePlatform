<template>
    <form @submit.prevent="submit" class="form-signin">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      <input v-model="data.identifier" type="email" class="form-control" placeholder="name@example.com" required>
      <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>
</template>

<script lang="ts">
import {reactive} from 'vue';
import {useRouter} from 'vue-router';
import Cookies from "js-cookie";

export default{
    name: "SignIn",
    setup(){
        const data = reactive({
            identifier: '',
            password: ''
        });
        const router = useRouter();

        const submit = async () => {
            const dataRes = await fetch('http://localhost:1337/api/auth/local', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(data)
            });

            const response = await dataRes.json();
            if (dataRes.ok) {
                Cookies.set('jwt', response.jwt, {expires: 7, path: ''})
                await router.push('/');
            } else {
                console.error('Ошибка при входе:', response);
                // Здесь можно добавить пользовательское уведомление об ошибке
            }
        }

        return {
            data,
            submit
        }
    }
}
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>