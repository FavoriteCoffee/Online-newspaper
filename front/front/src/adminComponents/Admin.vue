<template>
    <Header></Header>

    <v-card
    v-if="!myStore.isUserAnAdmin()"
    width="72%"
        style="
        margin: 10px;
        margin-left: 14%;
        padding: 0px;
        padding-left: 10px;
        padding-right: 15px;
        border: solid;
        border-color: #b4c987;
        background-color: #fff;">
        
        <div style="padding: 30px; padding-top: 0;">
        <v-conteiner>
            <v-row>
                <router-link to="/admin/add_news" class="nav-link">
                    <v-btn
                    class="adminbtn"
                    color="#8674AF"
                    variant="text"
                    @click="show=true"
                    style="float: right;">
                        Добавить новость
                    </v-btn> 
                </router-link>
            </v-row>
                
            <v-divider style="margin-top: 22px;"></v-divider>

            <v-row>
                <router-link to="/admin/delete_news" class="nav-link">
                    <v-btn
                    class="adminbtn"
                    color="#8674AF"
                    variant="text"
                    @click="show=true"
                    style="float: right;">
                        Удалить новость    
                    </v-btn> 
                </router-link>
            </v-row>

            <v-divider style="margin-top: 22px;"></v-divider>

            <v-row>
                <router-link to="/admin/delete_comment" class="nav-link">
                    <v-btn
                    class="adminbtn"
                    color="#8674AF"
                    variant="text">
                        Скрыть комментарий
                    </v-btn>
                </router-link>
            </v-row>

            <v-divider style="margin-top: 22px;"></v-divider>

            <v-row>
                <router-link to="/admin/delete_user" class="nav-link">
                    <v-btn
                    class="adminbtn"
                    color="#8674AF"
                    variant="text">
                        Заблокировать пользователя
                    </v-btn> 
                </router-link>
            </v-row>

            <v-divider style="margin-top: 22px;"></v-divider>

            <v-row>
                <router-link to="/admin/add_tag" class="nav-link">
                    <v-btn
                    class="adminbtn"
                    color="#8674AF"
                    variant="text"
                    @click="show=true"
                    style="float: right;">
                        Создать категорию
                    </v-btn> 
                </router-link>
            </v-row>

            <v-divider style="margin-top: 22px;"></v-divider>

            <v-row>
                <router-link to="/admin/delete_tag" class="nav-link">
                    <v-btn
                    class="adminbtn"
                    color="#8674AF"
                    variant="text">
                        Удалить ктегорию
                    </v-btn> 
                </router-link>
            </v-row>
        </v-conteiner>
    </div>
    </v-card>

    <v-card
    v-else
    width="72%"
        style="
        margin: 10px;
        margin-left: 14%;
        padding: 0px;
        padding-left: 10px;
        padding-right: 15px;
        border: solid;
        border-color: #b4c987;
        background-color: #fff;">
    <p>У вас недостаточно прав</p>
    </v-card>
</template>

<style> 
    .adminbtn{
        margin-top:30px;
        margin-left:30px;
        float: center;
    }

</style>

<script setup>
    import Header from "../Header.vue";
    import { ref, computed } from 'vue';
    import { useStore } from "../store/app.js";
    const myStore = useStore();
</script>