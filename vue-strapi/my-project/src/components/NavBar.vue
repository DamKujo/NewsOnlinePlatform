<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">News</router-link>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
          <li class="nav-item">
            <router-link to="/signin" class="nav-link">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>

        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="auth">
          <li class="nav-item">
            <router-link to="/signin" class="nav-link" @click="logout">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Cookies from 'js-cookie';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default{
    name: "NavBar",
    setup(){
      const store = useStore();

      const auth = computed(() => store.state.authenticated)

      const logout = () => {
        Cookies.remove('jwt', { path: '' }); 
        store.commit('SET_AUTH', false);
      }

      return{
        auth,
        logout
      }
    }
}
</script>
