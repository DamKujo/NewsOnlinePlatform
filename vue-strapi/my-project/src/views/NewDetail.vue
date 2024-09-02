<template>
    <div class="mainPage">
      <h1>{{ item.attributes?.title }}</h1>
      <img :src="`http://localhost:1337${item.attributes?.image.data.attributes.url}`" alt="img" class="image">
      <p>{{ item.attributes?.content }}</p>
      <h4>{{ item.attributes?.author }}</h4>
    </div>
  </template>
  
  <script>
  import Cookies from 'js-cookie';
  export default {
    data() {
      return {
        item: {}
      };
    },
    created() {
      const id = this.$route.params.id;
      this.fetchItem(id);
    },
    methods: {
      async fetchItem(id) {
        const token = Cookies.get('jwt');
        const data = await fetch(`http://localhost:1337/api/news/${id}?populate=*`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            });
            if (!data.ok) {
                throw new Error('Сеть ответила с ошибкой ' + data.status);
            }
        const response = await data.json();
        this.item = response.data;
      }
    }
  };
  </script>

<style scoped>
.image{
  width: 50%;
}
.mainPage{
    padding: 20px 40px;
}
.mainPage h1{
    font-weight: bold;
    transition: .3s ease-in-out;
}
.mainPage h1:hover{
    color: #777777;
}
.mainPage p{
    width: 70%;
    font-size: 20px;
    margin-top: 40px;
}
.mainPage h4{
    font-style: italic;
    margin-top: 30px;
}
</style>