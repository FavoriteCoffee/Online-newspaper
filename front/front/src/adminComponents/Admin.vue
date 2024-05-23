<template>
    <v-card>
        <v-conteiner>
            <v-row>
                <router-link to="/admin/add_news" class="nav-link">
                    <v-btn>
                        Добавить новость
                    </v-btn> 
                </router-link>
            </v-row>
                
            <v-row>
                <router-link to="/admin/delete_news" class="nav-link">
                    <v-btn>
                        Удалить новость    
                    </v-btn> 
                </router-link>
            </v-row>

            <v-row>
                <router-link to="/admin/delete_comment" class="nav-link">
                    <v-btn>
                        Скрыть комментарий
                    </v-btn>
                </router-link>
            </v-row>
            <v-row>
                <router-link to="/admin/delete_user" class="nav-link">
                    <v-btn>
                        Заблокировать пользователя
                    </v-btn> 
                </router-link>
            </v-row>

            <v-row>
                <router-link to="/admin/add_tag" class="nav-link">
                    <v-btn>
                        Создать категорию
                    </v-btn> 
                </router-link>
            </v-row>

            <v-row>
                <router-link to="/admin/delete_tag" class="nav-link">
                    <v-btn>
                        Удалить ктегорию
                    </v-btn> 
                </router-link>
            </v-row>
        </v-conteiner>
    </v-card>



    <!-- <v-btn v-model="add_post" @click="add_post = !add_post">Добавить новость</v-btn> 
     разворачивается форма: -->

    <!-- поле для картинки -->
    <!-- поле заголовка -->
    <!-- поле для текста -->
    <!-- <div v-if="add_post">
        <v-textarea>
            заголовок
        </v-textarea>
        <v-textarea>
            сам текст
        </v-textarea>
        <p>типа картинка</p>
        <v-btn>Сохранить</v-btn>
    </div> -->

    <!-- <v-btn v-model="del_post" @click="del_post = !del_post">Удалить новость</v-btn> -->
    <!-- разворачивается список заголовков сегодняшних статей с крестиками -->
    <!-- <Comments 
                                v-for="comment of myStore.getComments(this.news.id)" 
                                :key="comment" 
                                :comment="comment" 
                                :newsId="this.news.id"/> -->
    <!-- <div v-if="del_post"> 
        <AdminDeleteNews
                                v-for="news of myStore.news"
                                :key="news"
                                :news="news"/>
    </div>

    <v-btn v-model="del_user" @click="del_user = !del_user">Удалить пользователя</v-btn> -->
    <!-- разворачивается список пользователей с крестиками -->
    <!-- <div v-if="del_user">
        <AdminDeleteUser 
                            v-for="user of myStore.users"
                            :key="user"
                            :user="user"/>
    </div>


    <v-btn v-model="del_comment" @click="del_comment = !del_comment">удалить комментарий</v-btn> -->
    <!-- рвзворачивается список заголовков новостей -->
    <!-- разворачиваются комментарии с крестиками -->
    <!-- в бд текст коммента меняется на "комментарий удален" -->
    <!-- <div v-if="del_comment">
        <AdminDeleteCommentsList 
                            v-for="news of myStore.news"
                            :key="news"
                            :news="news"/>
    </div> -->


</template>


<script setup>
    import { ref, computed } from 'vue';
    import { useStore } from "../store/app.js";
    import AdminDeleteNews from './AdminDeleteNews.vue';
    import AdminDeleteUser from './AdminDeleteUser.vue';
    import AdminDeleteCommentsList from './AdminDeleteCommentsList.vue';
    const myStore = useStore();

</script>