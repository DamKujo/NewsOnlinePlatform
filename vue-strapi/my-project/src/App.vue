<template>
  <NavBar/>
  <main class="form-signin w-100 m-auto">
    <router-view/>
  </main>
</template>

<script>
import NavBar from "@/components/NavBar.vue"

export default{
  components: {NavBar}
}
</script>

<style>

</style>
