import { defineStore } from "pinia";
import UserDataService from "../services/UserDataService";
import axios from "axios";


export const useStore = defineStore('MyStore', {
    state: () => ({
        news: [{id: 1, likedBy: ["name"], showText:false, date:"01.02.03", img:'./img/cat.jpg', title:"THIS IS SPARTA", text: '111bJCHjkbjhvkJhVKUYCJSB:OÏJESPOJSFo;1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', comments: [{text: "1коммент 1 новости", id:'1111'}, {text: "2коммент 1 новости", id:'1111'}, {text: "3коммент 1 новости", id:'1111'}]},
                 {id: 2, likedBy: ["name"],  showText:false, date:"01.02.03", img:'#', title:"title2", text: '2News', comments: [{likedBy: ["name"], text: "IF you happen to have read another book about Christopher Robin, you may remember that he once had a swan (or the swan had Christopher Robin, I don't know which) and that he used to call this swan Pooh. That was a long time ago, and when we said good-bye, we took the name with us, as we didn't think the swan would want it any more. Well, when Edward Bear said that he would like an exciting name all to himself, Christopher Robin said at once, without stopping to think, that he was Winnie-the-Pooh. And he was. So, as I have explained the Pooh part, I will now explain the rest of it.", id:'1111'}, {text: "2коммент 2 новости", id:'1111'}, {text: "3коммент 2 новости", id:'1111'}]},
            	 {id: 3,  likedBy: [], showText:false, date:"01.02.03", img:'./img/castle.jpeg', title:"title3", text: '3News', comments:[{text: "com11", id: 11}, {text: "com12", id: 12}]}],
        comments: [[{text: "com11", id: 11}, {text: "com12", id: 12}],
                   {text: "com2", id: 1},
                   {text: "com3", id: 1}],
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
            password: "333",
            id: 0
        },    
        users: [{userName: "HippoMaru1", password: "1111"},
                {userName: "HippoMaru2", password: "1111"},
                {userName: "HippoMaru3", password: "3333"},],


        userIn: true
    }),

    // // getters: {
    //     функция для обновления:

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
    //каждый час + при обновлении загружать свежие новости



    // loadActualNews(){
    //     this.news = getTodayNews();
    // },
    // checkNewUser(){
    //     if (this.authenticationData.enteredName === "") {
    //         return false
    //     }
    //     let users = UserDataService.getAllUsers
    //     for (let user of users){
    //         if (user.userName === this.authenticationData.enteredName){
    //             return false
    //         }
    //     }
    //     return true;
    // },
    async saveTodayNews(){
        UserDataService.getRecentNews().then(response => {
            this.news = response.data.slice(0)
        }) 
    },

    async saveComments(news){
        // UserDataService.getAllComments(news.id).then(response => {
        //     news.comments = response.data.slice(0)
        //     console.log("новость: ", news)
        //     // console.log("ее комментарии: ", response.data) функция не изменяет поля новости, комменты не появляются глобально, как будто по значению передаем
        // })   
        UserDataService.getAllComments(news.id).then(response => {
            for (let n of this.news){
                if (n.id === news.id) {
                    n.comments = response.data.slice(0)
                    console.log("новость: ", n)
                }
            } // почему-то это нужно запустить дважды чтобы заработало, возможно оно выполняется раньше чем переопределение основного массива
        })
    },

    async showTodayNews(){
        console.log("today news array: ", this.news)
    },

    async getTodayNews(){
        await this.saveTodayNews()

        for (let news of this.news){
            await this.saveComments(news)   
        }
    
        await this.showTodayNews()
        
    },

    getLatestComments(newsId){
        for (let news of this.news){
            if (news.id === newsId){
                console.log("то что получает компонент News: ", news)
                return news.comments
                
            }
        }
        // UserDataService.getRecentComments(newsId).then(response => {
        //     console.log("comments of news number", newsId, " ", response.data)
        //     return response.data
        // })
        return false
    },

    // загрузочная функция загружает только данные новости, необходимо отдельно подгружать лайки и комментарии в местный массив
    // (вернулись к началу (?))

    getComments(newsId){
        // UserDataService.getAllComments(newsId).then(response => {
        //     return response.data
        // }) 
        return console.log(this.news[2]) 
    },

    isNewsLiked(newsId){
        var likes
        UserDataService.getNewsLikes(newsId).then(response => {
            likes = response.data
            console.log(likes)
       
        if (likes !== undefined || likes.length !== 0){
            for (let like of likes) {
                if (like.author === this.currentUser.userName) {
                    return true
                }
            }
            return false
        }
        else return false
     })
    },

    isCommentLiked(newsId, commentId){
        UserDataService.getCommentsLikes(newsId, commentId).then(response => {
            for (let like of response.data) {
                if (like.author === this.currentUser.userName) {
                    return true
                }
            }
        })
    
        return false
    },

    // ---------- >>  MUTATIONS  << --------- //

    exit(){
        this.currentUser.password = null
        this.currentUser.userName = null
        this.currentUser.id = null
        this.userIn = false
    },

    // async pushDataToDBs(){

    //     let mypromise = new Promise((resolve) => {
    //         setTimeout(() => resolve("готово"), 1000)
    //     });

    //     let result = avait mypromise;

    //     //alert(result);
    // },
    
    async createTestNews(text, title){
        var data = {
            text: text,
            title: title
        }
        const res = await UserDataService.createNews(data)
        console.log(res)
        return res.data.id

    },

    async createTestUser(name, pass){
        var data = {
            userName: name,
            password: pass
        }
        const res = await UserDataService.createUser(data)
        console.log(res)
        return res.data.id

    },
    
    async createTestComment(newsid, user_id, text){
        var data = {
            text: text,

        }

        const res = await UserDataService.createComment(newsid, user_id, data)
        console.log(res)
        return res.data.id
    },

    async pushTestDataToDB(){
        var newsid1
        var newsid2
        var newsid3

        var userid

        var commentid1

        var commentsid1 = new Array(3).fill(null)
        var commentsid2 = new Array(3).fill(null)
        var commentsid3 = new Array(3).fill(null)

        newsid1 = await this.createTestNews("text 1", "title 1")
        console.log("news 1 id = ", newsid1)
        newsid2 = await this.createTestNews("text 2", "title 2")
        console.log("news 2 id = ", newsid2)
        newsid3 = await this.createTestNews("text 3", "title 3")
        console.log("news 3 id = ", newsid3)

        userid = await this.createTestUser("Anna", "Olaf")

        commentid1 = await this.createTestComment(newsid1, userid,  "first comment news1")

        for (let i = 0; i < commentsid1.length; ++i){
            commentsid1[i] = await this.createTestComment(newsid1, userid, "comment news1")
        }
 
        for (let i = 0; i < commentsid2.length; ++i){
            commentsid1[i] = await this.createTestComment(newsid2, userid, "comment news2")
        }

        for (let i = 0; i < commentsid3.length; ++i){
            commentsid1[i] = await this.createTestComment(newsid3, userid, "comment news3")
        }

    },

    // async pushTestDataToDB(){
    //     var newsid1
    //     var newsid2
    //     var newsid3

    //     var userid

    //     var commentsid1 = new Array(3).fill(null)
    //     var commentsid2 = new Array(3).fill(null)
    //     var commentsid3 = new Array(3).fill(null)

    //     var now = new Date()

    //     var data = {
    //         text: "text 1",
    //         title: "title 1",
    //     }
    //     await UserDataService.createNews(data).then(response => {
    //         //setTimeout(() => resolve("создаетсяновость"), 3000);
    //         console.log(response.data.id)
    //         newsid1 = response.data.id
    //         console.log(newsid1)
    //         })
    //         .catch( e => {
    //             alert(e)
    //         })

        

    //     console.log(newsid1)

    //     var data = {
    //         text: "text 2",
    //         title: "title 2",
    //     }
    //     UserDataService.createNews(data).then(response => {
    //         newsid2 = response.data.id
    //         })
    //         .catch( e => {
    //             alert(e)
    //         })

                
    //     var data = {
    //         text: "text 3",
    //         title: "title 3",
    //     }
    //     UserDataService.createNews(data).then(response => {
    //         newsid3 = response.data.id
    //         })
    //         .catch( e => {
    //             alert(e)
    //         })
            

    //     var data = {
    //         userName: "Anna",
    //         password: "Elsa"
    //     }
    //     UserDataService.createUser(data).then(response => {
    //         userid = response.data.id
    //         })
    //         .catch( e => {
    //             alert(e)
    //         })


    //     var data = {
    //         taxt: "comment 1"
    //     }
    //     for (let i = 0; i < commentsid1.length ; ++i){
    //         //console.log(newsid1)
    //         UserDataService.createComment(newsid1, data).then(response => {
                
    //             commentsid1[i] = response.data.id
    //             })
    //             .catch( e => {
    //                 alert(e)
    //             })
    //     }

    //     var data = {
    //         taxt: "comment 2"
    //     }
    //     for (let i = 0; i < commentsid2.length; ++i){
    //         UserDataService.createComment(newsid1, data).then(response => {
    //             commentsid2[i] = response.data.id
    //             })
    //             .catch( e => {
    //                 alert(e)
    //             })
    //     }

    //     var data = {
    //         taxt: "comment 3"
    //     }
    //     for (let i = 0; i < commentsid3.length; ++i){
    //         UserDataService.createComment(newsid1, data).then(response => {
    //             commentsid3[i] = response.data.id
    //             })
    //             .catch( e => {
    //                 alert(e)
    //             })
    //     }

    //     UserDataService.likeNews(newsid1)
    //     UserDataService.likeComment(newsid2, commentsid2[2])

    // },

    saveUser() {
        this.currentUser.userName = this.registrationData.enteredName
        this.currentUser.password = this.registrationData.enteredPassword
        this.userIn = true

        var data = {
            userName: this.currentUser.userName,
            password: this.currentUser.password
        }
        console.log(data)
        UserDataService.createUser(data)
            .then(response => {
                this.currentUser.id = response.data.id
                this.submitted = true;
            })
            .catch( e => {
                alert(e)
            })
        console.log(data.userName, data.password)
        return true
        
    }, 

    addComment(newsId, commentText){
        console.log(newsId, commentText)
        var data = {
            text: commentText
        }
        UserDataService.createComment(newsId, data)
            .catch( e => {
                alert(e)
            })
    },

    // addNews(title, text){
    //     var data = {
    //         title: title,
    //         text: text,
    //         // img: img
    //     }
    //     UserDataService.createNews(data)
    //     .catch( e => {
    //         alert(e)
    //     })
    // },

    verificationOfRegistration(){
        UserDataService.getAllUsers().then(response => {
            for (let user of response.data) {
                console.log(user)
                if (user.userName === this.registrationData.enteredName) {
                    return false
                }
            }
            console.log(this.registrationData.enteredName, ' ', this.registrationData.enteredPassword)
            if (this.registrationData.enteredName !== "" && this.registrationData.enteredPassword !== "" ){
                this.saveUser()
                this.userIn = true
                console.log("userIn === true", this.userIn)
    
                window.location.href = '/main';
            }
            return true
        }
        )
    },

    verificationOfAuthentication(){
        if (this.authenticationData.enteredName !== "" &&
            this.authenticationData.enteredPassword !== "" && 
            UserDataService.getUser(this.authenticationData.enteredName).then(response => {
                var id = response.data.id
            }) !== false){

                this.userIn = true
                console.log("userIn === true", this.userIn)

                this.currentUser.userName = this.authenticationData.enteredName
                this.currentUser.password = this.authenticationData.enteredPassword
                this.currentUser.id = id
                
                window.location.href = '/main';
                
        }
    },

    changeVisibility(val){
        val = !val
    },
    
    changeNewsLike(post_id){
        UserDataService.getNewsLikes(post_id).then(response => {
            for (let like of response.data) {
            if (like.author === this.currentUser.userName) {
                var isLiked = true
                var like_id = like.id
            }
        }
       
        if (isLiked) {
            UserDataService.unlikeNews(post_id, like_id)
            .catch( e => {
                alert(e)
            })
        } else {
            UserDataService.likeNews(post_id)
            .catch( e => {
                alert(e)
            })
        }
        })
        
    },

    changeCommentLike(post_id, comment_id){
        var isLiked
        var like_id

        UserDataService.getCommentsLikes(post_id, comment_id).then(response => {
            for (let like of response.data) {
            if (like.author === this.currentUser.userName) {
                isLiked = true
                like_id = like.id
            }
            } 
        })
       
        if (isLiked) {
            UserDataService.unlikeComment(post_id, comment_id, like_id)
            .catch( e => {
                alert(e)
            })
        } else {
            UserDataService.likeComment(post_id, comment_id)
            .catch( e => {
                alert(e)
            })
        }
       
        
    },

    newUser() {
        this.submitted = false
        this.currentUser = {}
    },

    newPage(newPage){
        path = "'/" + newPage + "'"
        // this.$router.push(path)
      
    },

    updateUser() {
        let data = {
            userName:this.currentUser.userName,
            password: this.currentUser.password
        }
        UserDataService.update(this.currentUser.id, data)
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
    }
});