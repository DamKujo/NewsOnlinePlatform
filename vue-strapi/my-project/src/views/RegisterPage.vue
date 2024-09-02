<template>
    <form @submit.prevent="submit" class="form-signin">
      <h1 class="h3 mb-3 fw-normal">Please register</h1>
      <input v-model="data.username" type="text" class="form-control" placeholder="your name" required>
      <input v-model="data.email" type="email" class="form-control" placeholder="name@example.com" required>
      <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>
      <p class="error">{{ error }}</p>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import {useRouter} from 'vue-router';

export default{
    name: "RegisterPage",
    setup(){
        const data = reactive({
            username: '',
            email: '',
            password: ''
        });

        const router = useRouter();
        const error = ref('');

        const emailIsValid = (email: string) => {
          // eslint-disable-next-line
       return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        };

        const submit = async (e: any) => {
          if (data.username.length < 2 || !emailIsValid(data.email)) {
              error.value = 'Ошибка в имени и/или email';
              e.preventDefault();
              return false;
          } else if (data.password.length < 6) {
              error.value = 'Длина пароля должна быть больше 6 символов';
              e.preventDefault();
              return false;
          } else {
              error.value = '';
              try {
                  const response = await fetch('http://localhost:1337/api/auth/local/register', {
                      method: "POST",
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify(data)
                  });
                  if (!response.ok) {
                      throw new Error('Ошибка при регистрации');
                  }
                  await router.push('/signin');
              } catch (e) {
                const typedError = e as unknown as Error;
                error.value = typedError.message;
              }
          }
        };

        return {
            data, 
            submit,
            error
        }
    }
}
</script>

<style scoped>
.error{
  color: red;
  font-size: 18px;
  font-weight: bold;
}
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