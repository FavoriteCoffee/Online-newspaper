import { defineStore } from "pinia";
import UserDataService from "../services/UserDataService";


export const useStore = defineStore('MyStore', {
    state: () => ({
        news: [{id: 1, showText:false, data:"01.02.03", img:'./img/cat.jpg', title:"THIS IS SPARTA", text: '111bJCHjkbjhvkJhVKUYCJSB:OÏJESPOJSFo;1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', comments: [{text: "1коммент 1 новости"}, {text: "2коммент 1 новости"}, {text: "3коммент 1 новости"}]},
                 {id: 2,  showText:false, data:"01.02.03", img:'#', title:"title2", text: '2News', comments: [{text: "IF you happen to have read another book about Christopher Robin, you may remember that he once had a swan (or the swan had Christopher Robin, I don't know which) and that he used to call this swan Pooh. That was a long time ago, and when we said good-bye, we took the name with us, as we didn't think the swan would want it any more. Well, when Edward Bear said that he would like an exciting name all to himself, Christopher Robin said at once, without stopping to think, that he was Winnie-the-Pooh. And he was. So, as I have explained the Pooh part, I will now explain the rest of it."}, {text: "2коммент 2 новости"}, {text: "3коммент 2 новости"}]},
            	 {id: 3,  showText:false, data:"01.02.03", img:'./img/castle.jpeg', title:"title3", text: '3News', comments: [{text: "1коммент 3 новости"}, {text: "2коммент 3 новости"}, {text: "3коммент 3 новости"}]}],
        
        authenticationData: {
            enteredName: "",
            enteredPassword: ""
        },
        registrationData: {
            enteredName: "",
            enteredPassword: ""
        },
    
        currentDateAndTime: null, //let currentDate = new Date();
        currentUser: {
            userName: "name",
            password: "333"
        },    
        user: {
            userName: "HippoMaru",
            password: "1111"
        },
        userIn: true
    }),
    // // getters: {
    //     поиск пользователя по лог и паролю в базе
    //      
    //     добавление нового пользователя 
    //     поиск последних новостей за 24 часа
    //     поиск последних 3х комментариев
    //     поиск всех комментариев данной новости
    //     поставил пользователь лайк или нет
    //     запись постановки/снятия лайка с новости
    //     запись постановки/снятия лайка с комментария
    //     запись нового комментария
    // },


    
    actions: {
    
    // ---------- >>  GETTERS  << --------- //

    loadActualNews(){
        this.news = actions.getTodayNews();
      },
      checkUser(){
        for (let user in UserDataService.getAllUsers){
            if (user.userName === this.authenticationData.enteredName){
                if (user.password === this.authenticationData.enteredPassword){
                    this.currentUser = user
                    return true
                }
            }
        }
        return false;
    },
    getTodayNews(){
        let todayNews = []
        let today = new Date();
        for (let news in UserDataService.getAllNews){
            if (news.date < today - 86400000){
                todayNews.push(news);
            }
        }
        return todayNews;
    },
    getLatestComments(newsId){
        for (let news in UserDataService.getAllNews){
            if (news.id === newsId){
                if (news.comments.length >= 3){
                    return news.comments.slice(-3)
                }
                else if (news.comments.length > 0){
                    return news.comments
                }
                else return false
            }
        }
    },
    getComments(newsId){
        for (let news in UserDataService.getAllNews){
            if (news.id === newsId){
                if (news.comments.length > 3){
                    return news.comments
                }
                else return false
            }
        }
    },
    isNewsLiked(id){
        for (let news in UserDataService.getAllNews){
            if (news.id === id){
                for (let user in news.likedBy){
                    if (user === this.currentUser.userName){
                        return true
                    }
                }
                return false
            }
        }
    },
    isCommentLiked(newsId, commentId){
        for (let news in UserDataService.getAllNews){
            if (news.id === newsId){
                for (let comment in news.comments){
                    if (comment.id === commentId){
                        for (let user in news.likedBy){
                            if (user === this.currentUser.userName){
                                return true
                            }
                        }
                        return false
                    }
                }
            }
        }
    },
    getUser(id) {
        UserDataService.get(id)
            .then(response => {
                this.currentUser = response.data
            })
            .catch(e => {
                alert(e)
            })
      },

    // ---------- >>  MUTATIONS  << --------- //
    

    saveUser() {
        //добавить проверку на то нет ли уже такого пользователя и на адекватность значений
        this.user.userName = this.registrationData.enteredName
        this.user.userName = this.registrationData.enteredPassword
        this.userIn = true

        var data = {
            userName: this.user.userName,
            password: this.user.password
        }
        UserDataService.create(data)
            .then(response => {
                this.user.id = response.data.id
                this.submitted = true;
            })
            .catch( e => {
                alert(e)
            })
        console.log(data.userName, data.password)    
    },   
    verificationOfRegistration(){
        if (this.registrationData.enteredName !== "" && this.registrationData.enteredPassword !== ""){
            //if (!this.checkUser()) {
            this.saveUser()
            this.userIn = true
            console.log("userIn === true", this.userIn)

            window.location.href = '/main';
        }
    },
    verificationOfAuthentication(){
        if (this.authenticationData.enteredName !== "" && this.authenticationData.enteredPassword !== ""){
            //if (this.checkUser()){
                this.userIn = false
                console.log("userIn === true", this.userIn)

                window.location.href = '/main';
        }
    },
    changeVisibility(val){
        val = !val
    },
    
    changeNewsLike(id){
        for (let news in UserDataService.getAllNews){
            if (news.id === id){
                for (let user in news.likedBy){
                    if (user === this.currentUser.userName){
                        let ind = news.likedBy.indexOf(user)
                        if (news.likedBy !== -1){
                            news.likedBy.splice(ind, 1)
                        }
                        UserDataService.updateNews(id, news)
                    }
                }
                news.likedBy.push(this.currentUser.userName)
                UserDataService.updateNews(id, news)
            }
        }
    },
    changeCommentLike(id){

    },
    addComment(newsId, text){
        console.log(newsId, text)
    },
    newUser() {
        this.submitted = false
        this.user = {}
    },
    newPage(newPage){
        path = "'/" + newPage + "'"
        // this.$router.push(path)
      }
    },

    updateUser() {
        UserDataService.update(this.currentUser.id, this.currentUser)
            .then(() => {
                this.message = 'The user was updated successfully!'
            })
            .catch(e => {
                alert(e)
            })
    },
    deleteUser() {
        UserDataService.delete(this.currentUser.id)
            .then(() => {
                this.$router.push({name: 'users'})
            })
            .catch(e => {
                alert(e)
            })
    }

});