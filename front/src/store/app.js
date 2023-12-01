import { defineStore } from "pinia";
import UserDataService from "../services/UserDataService";


export const useStore = defineStore('MyStore', {
    state: () => ({
        // news: [{id: 1, likedBy: ["name"], showText:false, date:"01.02.03", img:'./img/cat.jpg', title:"THIS IS SPARTA", text: '111bJCHjkbjhvkJhVKUYCJSB:OÏJESPOJSFo;1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', comments: [{text: "1коммент 1 новости", id:'1111'}, {text: "2коммент 1 новости", id:'1111'}, {text: "3коммент 1 новости", id:'1111'}]},
        //          {id: 2, likedBy: ["name"],  showText:false, date:"01.02.03", img:'#', title:"title2", text: '2News', comments: [{likedBy: ["name"], text: "IF you happen to have read another book about Christopher Robin, you may remember that he once had a swan (or the swan had Christopher Robin, I don't know which) and that he used to call this swan Pooh. That was a long time ago, and when we said good-bye, we took the name with us, as we didn't think the swan would want it any more. Well, when Edward Bear said that he would like an exciting name all to himself, Christopher Robin said at once, without stopping to think, that he was Winnie-the-Pooh. And he was. So, as I have explained the Pooh part, I will now explain the rest of it.", id:'1111'}, {text: "2коммент 2 новости", id:'1111'}, {text: "3коммент 2 новости", id:'1111'}]},
        //     	 {id: 3,  likedBy: [], showText:false, date:"01.02.03", img:'./img/castle.jpeg', title:"title3", text: '3News', comments: [{text: "1коммент 3 новости", id:'1111'}, {text: "2коммент 3 новости", id:'1112'}, {text: "3коммент 3 новости", id:'1113'}]}],
        
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
        users: [{userName: "HippoMaru1", password: "1111"},
                {userName: "HippoMaru2", password: "1111"},
                {userName: "HippoMaru3", password: "3333"},],


        userIn: true
    }),

    // НОВЫЕ ПРАВИЛА 
    //     в сторе храним только текущего пользователя 
    //     все данные получаем из базы

    // // getters: {
    //       функция для обновления:

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

    // 

    // 1.  Записываем в бд 3 новости (как определять сгенерированные айдишники?)
    // 2.х Читаем их от туда в стор с проверкой на свежесть
    // 3.х Строим страницы на основе стора
    // 4.х При каких-то мелких изменениях синхронизируем стор и бд внесением одинаковых изменений
    // 5.  Каждый час обновляемся

    // },


    
    actions: {

       // в основном работаем со стором, при пост запросах изменяем оба хранилища
    
    // ---------- >>  GETTERS  << --------- // можно переписать через обращение к стору, но оставить код обращения к бд чтобы склеить функцию большой загрузки

    loadActualNews(){ //каждый час + при обновлении
        this.news = getTodayNews();
    },
    checkUser(){
        users = UserDataService.getAllUsers
        for (let i = 0; i < users.length; i++){
            if (users[i].userName === this.authenticationData.enteredName){
                if (users[i].password === this.authenticationData.enteredPassword){
                    this.currentUser = user
                    return true
                }
            }
        }
        return false;
    },
    getTodayNews(){

        //let recentNews = UserDataService.getRecentNews
        UserDataService.getRecentNews().then(response => {
            console.log(response.data)
            return response.data})

        // allNews = UserDataService.getAllNews
        // allComments = UserDataService.getAllComments
        // for (let i = 0; i < allNews.length; i++){
        //     if (allNews[i].date < today - 86400000){
        //         let tempNews = {
        //             id: allNews[i].id,
        //             date: allNews[i].date,
        //             img: allNews[i].img,
        //             title: allNews[i].title,
        //             text: allNews[i].text,
        //             comments: []
        //         }

        //         for (let j = 0; j < allComments.length; j++){
        //             if (allComments[j].newsId === news.id){
        //                 tempNews.comments.push(allComments[j])
        //             }
        //         }
        //         todayNews.push(tempNews);
        //     }
        // }
    },
    getLatestComments(newsId){
        let recentComments = UserDataService.getRecentComments(newsId)
        return recentComments
        // for (let news of this.news){
        //     if (news.id === newsId){
        //         if (news.comments.length >= 3){
        //             return news.comments.slice(-3)
        //         }
        //         else if (news.comments.length > 0){
        //             return news.comments
        //         }
        //         else return false
        //     }
        // }
        // for (let news in UserDataService.getAllNews){
        //     if (news.id === newsId){
        //         if (news.comments.length >= 3){
        //             return news.comments.slice(-3)
        //         }
        //         else if (news.comments.length > 0){
        //             return news.comments
        //         }
        //         else return false
        //     }
        // }
    },
    getComments(newsId){
        let comments = UserDataService.getAllComments(newsId)
        return comments
        // for (let news of this.news){
        //     if (news.id === newsId){
        //         if (news.comments.length > 3){
        //             return news.comments
        //         }
        //         else return false
        //     }
        // }  
        // for (let news in UserDataService.getAllNews){
        //     if (news.id === newsId){
        //         if (news.comments.length > 3){
        //             return news.comments
        //         }
        //         else return false
        //     }
        // }
    },
    isNewsLiked(newsId){
        for (let like of UserDataService.getNewsLikes(newsId, this.currentUser.id)) {
            if (like.author === this.currentUser.userName) {
                return true
            }
        }
        return false
        // console.log("LIKE ", id)
        // for (let i = 0; i < this.news.length; i++){
        //     console.log(this.news[i].id)
        //     if (this.news[i].id === id){
        //         console.log(i)
        //         for (let j = 0; j < this.news[i].likedBy.length; j++){
        //             console.log(j)
        //             if (this.news[i].likedBy[j] === this.currentUser.userName){
        //                 console.log("TRUE")
        //                 return true
        //             }
        //         }
        //         console.log("FALSE")
        //         return false
        //     }
        // }
    },
    isCommentLiked(newsId, commentId){
        for (let like of UserDataService.getCommentsLikes(newsId, commentId)) {
            if (like.author === this.currentUser.userName) {
                return true
            }
        }
        return false
        // for (let news of this.news){
        //     if (news.id === newsId){
        //         for (let comment of news.comments){
        //             if (comment.id === commentId){
        //                 for (let user of news.likedBy){
        //                     if (user === this.currentUser.userName){
        //                         return true
        //                     }
        //                 }
        //                 return false
        //             }
        //         }
        //     }
        // }
        // for (let news in UserDataService.getAllNews){
        //     if (news.id === newsId){
        //         for (let comment in news.comments){
        //             if (comment.id === commentId){
        //                 for (let user in news.likedBy){
        //                     if (user === this.currentUser.userName){
        //                         return true
        //                     }
        //                 }
        //                 return false
        //             }
        //         }
        //     }
        // }
    },
    getUser(id) {
        let user = UserDataService.get(id)
            .then(response => {
                this.currentUser = response.data
            })
            .catch(e => {
                alert(e)
            })

        return user
      },


    // ---------- >>  MUTATIONS  << --------- //

    exit(){
        this.currentUser.password = null
        this.currentUser.userName = null
        this.userIn = false
    },
    
    pushTestDataToDB(){
        var now = new Date()
        var data = {
            text: "text 1",
            title: "title 1",
            
           // img: './img/cat.jpg',
           // date: now
        }
        UserDataService.createNews(data)
            .then(response => {
                //this.news.id = response.data.id
                this.submitted = true;
            })
            .catch( e => {
                alert(e)
            })

        
        var data = {
            text: "text 2",
            title: "title 2",
          
        }
        UserDataService.createNews(data)
        .then(response => {
            //this.news.id = response.data.id
            this.submitted = true;
        })
        .catch( e => {
            alert(e)
        })

                
        var data = {
            text: "text 3",
            title: "title 3",
          
        }
        UserDataService.createNews(data)
        .then(response => {
            //this.news.id = response.data.id
            this.submitted = true;
        })
        .catch( e => {
            alert(e)
        })
        

        // как получить айдишник только что созданной новости и внести его в коммент
        // var data = {
        //     text: "text" + String(i),
        //     title: "title" + String(i),
        //     likedBy: [i],
        //     img: './img/cat.jpg',
        //     date: now
        // }
        // UserDataService.createNews(data)
        //     .then(response => {
        //         this.news.id = response.data.id
        //         this.submitted = true;
        //     })
        //     .catch( e => {
        //         alert(e)
        //     })
    },


    saveUser() {
        //добавить проверку на то нет ли уже такого пользователя и на адекватность значений
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
        
    }, 
    addComment(newsId, commentText){
        console.log(newsId, commentText)
        var data = {
            text: commentText
        }
        UserDataService.createComment(data)
            .then(response => {
                this.comment.id = response.data.id
                this.submitted = true
            })
            .catch( e => {
                alert(e)
            })


        // for (let news of this.news){
        //     if (news.id === newsId){
        //         news.comments.push(data)// на самом деле дата + айдишник
        //     }
        // }
    },
    addNews(title, text, img){
        let now = new Date()
        var data = {
            date: now,
            title: title,
            text: text,
            img: img
        }
        UserDataService.createNews(data)
        .then(response => {
            //this.news.id = response.data.id
            this.submitted = true
        })
        .catch( e => {
            alert(e)
        })

        // this.news.push(data)// на самом деле дата + айдишник
    },
    verificationOfRegistration(){
        UserDataService.getAllUsers().then(response => {
            for (let user of response.data) {
                console.log(user)
                if (user.userName === this.registrationData.enteredName) {
                    return false
                }
            }
            if (this.registrationData.enteredName !== "" && this.registrationData.enteredPassword !== "" ){
                //if (!this.checkUser()) {
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
        if (this.authenticationData.enteredName !== "" && this.authenticationData.enteredPassword !== "" && UserDataService.getUser(this.authenticationData.enteredName) !== false){
            //if (this.checkUser()){
                this.userIn = true
                console.log("userIn === true", this.userIn)

                window.location.href = '/main';
        }
    },
    changeVisibility(val){
        val = !val
    },
    
    changeNewsLike(post_id){
        for (let like of UserDataService.getNewsLikes(post_id)) {
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

        // for (let news of this.news){
        //     if (news.id === id){
        //         for (let user of news.likedBy){
        //             if (user === this.currentUser.userName){
        //                 let ind = news.likedBy.indexOf(user)
        //                 if (news.likedBy !== -1){
        //                     news.likedBy.splice(ind, 1)
        //                 }
        //                 var data = {
        //                     likedBy: news.likedBy //нужна ли тут целиковая data?
        //                 }
        //                 UserDataService.updateNews(id, data)
        //                 return false
        //             }
        //         }
        //         news.likedBy.push(this.currentUser.userName)
        //         var data = {
        //             likedBy: news.likedBy //нужна ли тут целиковая data?
        //         }
        //         UserDataService.updateNews(id, data)
        //         return true
        //     }
        // }
        // for (let news in UserDataService.getAllNews){
        //     if (news.id === id){
        //         for (let user in news.likedBy){
        //             if (user === this.currentUser.userName){
        //                 let ind = news.likedBy.indexOf(user)
        //                 if (news.likedBy !== -1){
        //                     news.likedBy.splice(ind, 1)
        //                 }
        //                 UserDataService.updateNews(id, news)
        //             }
        //         }
        //         news.likedBy.push(this.currentUser.userName)
        //         UserDataService.updateNews(id, news)
        //     }
        // }
    },
    changeCommentLike(post_id, comment_id){
        for (let like of UserDataService.getCommentsLikes(post_id, comment_id)) {
            if (like.author === this.currentUser.userName) {
                var isLiked = true
                var like_id = like.id
            }
        }
       
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