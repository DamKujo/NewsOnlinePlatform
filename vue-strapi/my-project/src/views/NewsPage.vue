<template>
    <div>
       <h1>{{message}}</h1>
       <div v-if="!store.state.authenticated"></div>
       <div v-else class="main">
            <h1 v-if="loading">Loading...</h1>
            <div v-if="articles.length">
                <div v-for="article in articles" :key="article.id" class="card plus">
                    <router-link :to="{ name: 'item-detail', params: { id: article.id } }" class="link">
                        <div class="card-body">
                            <img :src="`http://localhost:1337${article.attributes.image.data.attributes.url}`" alt="img" class="img">
                            <h2>{{ article.attributes.title }}</h2>
                            <p>{{ article.attributes.content }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
       </div>
     </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import Cookies from 'js-cookie';
import { useStore } from 'vuex';
export default{
    name: "NewsPage",
    setup(){
        const message = ref("You are not signed in");
        const articles = ref([]);
        const store = useStore();
        const loading = ref(true);

        const token = Cookies.get('jwt');

        onMounted(async() => {
            try{
                if(token){
                    message.value = "Today's news";
                    await store.dispatch('setAuth', true);
                    await fetchArticles();
                }
            } catch(e){
                await store.dispatch('setAuth', false)
                loading.value = true;
            }
            
        })

        const fetchArticles = async () => {
            const data = await fetch('http://localhost:1337/api/news?populate=*', {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            });
            if (!data.ok) {
                throw new Error('Сеть ответила с ошибкой ' + data.status);
            }
            const response = await data.json();
            console.log(response.data)
            articles.value = response.data;
            loading.value = false;
        };

        return {
            message,
            articles,
            loading,
            store
        }
    }
}
</script>

<style scoped>
h1{
    text-align: center;
    margin-bottom: 20px;
}
.main{
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px 40px;
}
.plus{
    margin: 0 auto;
    width: 90%;
    margin-bottom: 20px;
}
.plus h2{
    font-size: 35px;
    font-weight: bold;
}
.card-body p{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.link{
    text-decoration: none;
    color: black;
}
.img{
    width: 90px;
    height: 80px;
}
</style>