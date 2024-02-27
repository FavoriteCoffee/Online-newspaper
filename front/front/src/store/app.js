import { defineStore } from "pinia";
import UserDataService from "../services/UserDataService";
import axios from "axios";


export const useStore = defineStore('MyStore', {
    state: () => ({
        news: [{id: 1, likedBy: ["name"], showText:false, date:"01.02.03", img:'./img/cat.jpg', title:"THIS IS SPARTA", text: ' ', comments: [{text: "1коммент 1 новости", id:'1111'}, {text: "2коммент 1 новости", id:'1111'}, {text: "3коммент 1 новости", id:'1111'}]},
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
            userName: null,
            password: null,
            id: null
        },    
        users: [{userName: "HippoMaru1", password: "1111"},
                {userName: "HippoMaru2", password: "1111"},
                {userName: "HippoMaru3", password: "3333"},],


        userIn: true
    }),

    // готово - храним пользователя в локалсторадже
    // готово - проблемы с асинхронностью: комментарии к новостям приходится добавлять на страницу в ручную иначе они создаются раньше самих овостей
    // готово - функция загрузки данных из бд в локальное хранилище запускается автоматически при обновлении страницы (saveAllDataFromDB)
    // готово - функция загркузки тестовых данных в бд запускается при нажатии на лого 
    // готово - при аутентификации не передается id (возможно причина в том что ответ от сервера bad request но мы это не фиксируем)
    // готово - запрос для лайка новости не включает пользователя, так и должно быть? В любом случае там бэд реквест на пост запросе 
    // готово - счетчик комментов
    // готово - тоже самое с самими новостями но это на GeneralMainPage
    // готово - картинки не понятно как хранить и передавать
    // готово - когда написал новый комментарий нужно обновить страницу чтобы его увидеть
    // готово - тоже самое с лайком
    // лайки:
    // готово - нет возможности отмены лайка
    // готово - счетчик комментов


    // готово - счетчик лайков (лайкается несколько раз) (сплит вроде как работает раньше чем надо и запрос не получает нужного индекса лаайка, но я хз на  ифе-то это не отражается)
    // готово - счетчик лайков комментов
    // готово - авторство и время комментария (править бэк)
    // возможности незареганого пользователя (лайки комменты)
    // ? - аутентификация не работает

    // готово - дата и время создания комментария распарсить нормально

    // сделать чтобы на лого можно было не нажимать
     //каждый час + при обновлении загружать свежие новости 
     // всплывашка с ошибками


    // готово - лайки комментов не работают пост запросы (а делит запросы почему-то не падают)
    // готово - сделать комменты реактивными
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


    
    actions: {
    
    // ---------- >>  GETTERS  << --------- //
   
 
    async saveTodayNews(){
        await UserDataService.getRecentNews()
        .then(response => {
            this.news = response.data.slice(0)
           // console.log("то что присылает сервер:", response.data, "то что записано в tis.news:", this.news)
        }) 
    },

    async saveComments(){
        for (let news of this.news){
            await UserDataService.getAllComments(news.id)
            .then(response => {
                for (let n of this.news){
                    if (n.id === news.id) {
                        n.comments = response.data.slice(0)
                        //console.log("из сохранения комментариев, новости номер ", n)
                    }
                } 
            })
        }

        console.log(this.currentUser.userName, this.currentUser.id)
        await this.showTodayNews()
    },

    async saveNewsLikes(){
        for (let news of this.news) {
            news.likes = []
        }

        for (let news of this.news){
            await UserDataService.getNewsLikes(news.id)
            .then(response => {
                for (let n of this.news){
                    if (n.id === news.id) {
                        n.likes = response.data.slice(0)
                        //console.log("Лайки новостей: ", response.data.slice(0))
                    }
                } 
            })
        }
    },

    async saveCommentsLikes(){        
        for (let news of this.news) {
            for (let comment of news.comments){
                comment.likes = []
            }
        }

        for (var news of this.news){
            for (var comment of news.comments) {
                await UserDataService.getCommentsLikes(news.id, comment.id)
                .then(response => {
                    comment.likes = response.data.slice(0)
                    //console.log("Лайки комментов: ", response.data.slice(0))
                })
            }  
        }
    },

    async saveCurrentUser(){
        let user = JSON.parse(localStorage.getItem('user'))
        if (user !== null){
            let name = user.userName 
            await UserDataService.getUser(name)
            .then( response => {
                this.currentUser.userName = response.data.userName
                this.currentUser.password = response.data.password
                this.currentUser.id = response.data.id
                //console.log("СОХРАНЕНИЕ ЮЗЕРА", this.currentUser.userName, this.currentUser.id)
            })
        }
    },

    async showTodayNews(){
        console.log("today news array: ", this.news)
    },

    async saveAllDataFromDB(){
        await this.saveCurrentUser()
        await this.saveTodayNews()        
        await this.saveComments()        
        await this.saveNewsLikes()        
        await this.saveCommentsLikes()
        await this.showTodayNews()
    },

    getLatestComments(newsId){
        for (let news of this.news){
            if (news.id === newsId){
                // console.log("то что получает компонент News при свернутых комментах : ", news.comments.slice(0, 3))
                return news.comments.slice(0, 3)
            }
        }
        return false
    },

    getComments(newsId){
        for (let news of this.news){
            if (news.id === newsId){
                // console.log("то что получает компонент News просто : ", news.comments)
                return news.comments
            }
        }
        return false
    },

    getNumberOfComments(news_id){
        for (let news of this.news){
            if (news.id === news_id){
                if(news.comments !== undefined){
                    // console.log("количество комментариев в ", news_id)
                    // console.log("количество комментариев в ", news_id, "равно", news.comments.length)
                    return news.comments.length
                }
            }
        }
        return 0
    },

    getNumberOfNewsLikes(news_id) {
        for (let news of this.news){
            if (news.id === news_id){
                if(news.likes !== undefined){
                    return news.likes.length
                }
            }
        }
        return 0
    },

    getNumberOfCommentLikes(news_id, comment_id) {
        for (let news of this.news){
            if (news.id === news_id){
                for (let comment of news.comments){
                    if (comment.id == comment_id){
                        if(comment.likes !== undefined){
                            return comment.likes.length
                        }
                    }
                }
            }
        }
        return 0
    },

    getCurrentUserName(){
        return JSON.parse(localStorage.getItem('user')).userName 
    },

    isNewsLiked(newsId){
        for (let news of this.news) {
            if (news.id == newsId) {
                if (news.likes !== undefined && news.likes.length > 0){
                    for (let like of news.likes) {
                        if (like.author.userName == this.currentUser.userName) {
                            return true
                        }
                    }
                }
            }
        }

        return false
    },

    isCommentLiked(newsId, commentId){
        for (let news of this.news) {
            if (news.id == newsId) {
                for (let comment of news.comments) {
                    if (comment.id == commentId) {
                        if (comment.likes !== undefined && comment.likes.length > 0){
                            for (let like of comment.likes) {
                                if (like.author.userName == this.currentUser.userName) {
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }

        return false
    },

    // ---------- >>  MUTATIONS  << --------- //

    exit(){
        this.currentUser.password = null
        this.currentUser.userName = null
        this.currentUser.id = null
        this.userIn = false
    },
    
    async createTestNews(text, title, imgPath){
        var data = {
            text: text,
            title: title,
            imgPath: imgPath
        }
        const res = await UserDataService.createNews(data)
        // console.log(res)
        return res.data.id
    },

    async createTestUser(name, pass){
        var data = {
            userName: name,
            password: pass
        }
        const res = await UserDataService.createUser(data)
        // console.log(res)
        return res.data.id
    },
    
    async createTestComment(newsid, user_id, text){
        var data = {
            text: text,
        }
        const res = await UserDataService.createComment(newsid, user_id, data)
        return res.data.id
    },

    async createTestLike(newsid){
        const res = await UserDataService.likeNews(newsid, "Anna")
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

        newsid1 = await this.createTestNews("text 1", "title 1", "../img/cat.jpg")
        console.log("news 1 id = ", newsid1)
        newsid2 = await this.createTestNews("text 2", "title 2", "../img/fon.png")
        console.log("news 2 id = ", newsid2)
        newsid3 = await this.createTestNews("text 3", "title 3", "../img/home.jpg")
        console.log("news 3 id = ", newsid3)

        await this.createTestUser("Anna", "Olaf").catch( e => {
            console.log("не создался")
        })
        await UserDataService.getUser("Anna")
        .then(response => { 
            userid = response.data.id
        })
        console.log("USER: ", userid)

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

        await this.createTestLike(newsid1)
        await this.createTestLike(newsid2)
        await this.createTestLike(newsid3)
    },

    async saveUser(enteredName, enteredPassword) {
        this.currentUser.userName = enteredName
        this.currentUser.password = enteredPassword
        this.userIn = true

        var data = {
            userName: enteredName,
            password: enteredPassword
        }
    
        await UserDataService.createUser(data)
        .then(response => {
            this.currentUser.id = response.data.id
            this.submitted = true;
            console.log("response.data из saveUser ", response.data.userName, response.data.id)
        })
        .catch( e => {
            alert(e)
        })
        
        return true
    }, 

    async addComment(newsId, user_id, commentText){
        var data = {
            text: commentText
        }

        var date
        var comment
        var id

        await UserDataService.createComment(newsId, user_id, data)
        .then( response => {
            console.log("из функции ADDCOMMENT: ", response.data)            
            id = response.data.id
            date = response.data.date
        })
        .catch( e => {
            alert(e)
        })

        var comment = {
            id: id,
            date: date,
            text: commentText,
            author: {id: user_id, userName: this.currentUser.userName},
            post: newsId,
            likes: [],
        }

        for (let news of this.news) {
            if (news.id == newsId) {
                news.comments.push(comment)
                console.log("полный список коментов ", news.comments)   
            }
        }     
    },

    async verificationOfRegistration(){
        let ex = false
        await UserDataService.getAllUsers()
        .then(response => {
            for (let user of response.data) {
                console.log(user)
                if (user.userName === this.registrationData.enteredName) {
                    console.log("пользователь с таким именем уже существует")
                    return false
                }
            }

            console.log(this.registrationData.enteredName, ' ', this.registrationData.enteredPassword)

            if (this.registrationData.enteredName !== "" && this.registrationData.enteredPassword !== "" ){
                this.saveUser(this.registrationData.enteredName, this.registrationData.enteredPassword)
                this.userIn = true
                console.log(this.currentUser.userName, this.currentUser.id)
    
                let user = {
                    userName: this.registrationData.enteredName,
                    password: this.registrationData.enteredPassword,
                    id: this.currentUser.id
                }

                localStorage.setItem('user', JSON.stringify(user))

                this.gotoAnotherPage('/main')
            }
            return true
        })
    },

    async verificationOfAuthentication(){
        var c = true
        let user
        if (this.authenticationData.enteredName !== "" &&
            this.authenticationData.enteredPassword !== ""){
            await UserDataService.getUser(this.authenticationData.enteredName)
            .then(response => {
                if (this.authenticationData.enteredPassword !== response.data.password) {
                    c = false
                    console.log("Неверный пароль")
                }
                user = response.data
            }).catch( e => {
                c = false
                console.log("Неверный логин")
                localStorage.clear()
                return
            })

            if (c) {
                this.userIn = true

                console.log("userIn === true", this.userIn)

                this.currentUser.userName = user.userName
                this.currentUser.password = user.password
                this.currentUser.id = user.id

                localStorage.setItem('user', JSON.stringify(user))
                
                this.gotoAnotherPage('/main')
            }   
        }
    },

    changeVisibility(val){
        val = !val
    },
    
    async changeNewsLike(post_id){
        let user = JSON.parse(localStorage.getItem('user'))
        if (user !== null && this.currentUser.userName !== null){

            let isLiked = false
            let index = null

            for (let news of this.news) {
                if (news.id == post_id && news.likes !== []) {
                    for (let i = 0; i < news.likes.length; i++) {
                        if (news.likes[i].author.userName == this.currentUser.userName) {
                            isLiked = true
                    
                            await UserDataService.unlikeNews(post_id, news.likes[i].id)
                            .catch( e => {
                                console.log("НЕ НАШЕЛ") 
                            alert(e)
                            })
        
                            index = i
                        }
                    }

                    if (!isLiked){
                        var name = user.userName 
                        var like

                        await UserDataService.likeNews(post_id, name)
                        .then(response => {
                            console.log("добавление в стор лайка ", post_id, news.likes) 
                            like = response.data
                        })
                        .catch( e => {
                        alert(e)
                        })

                        //console.log("добавление в стор, новость: ", post_id, news.likes)
                        news.likes.push(like)
                        console.log("лайки после добавления: ", news.likes)
                    }                
                }
            }    

            if (index !== null) {
                await this.spliseLike(post_id, index)
            }
        }
    },

    async spliseLike(post_id, index){
        for (let news of this.news) {
            if (news.id == post_id) {
                news.likes.splice(index, 1)
                return
            }
        }
    },

    async changeCommentLike(post_id, comment_id){
        let user = JSON.parse(localStorage.getItem('user'))
        if (user !== null && this.currentUser.userName !== null){
            let isLiked = false
            for (let news of this.news) {
                if (news.id == post_id) {
                    for (let comment of news.comments) {
                        if (comment.id == comment_id) {
                            console.log("comment.likes.length ", comment)
                            for (let i = 0; i < comment.likes.length; i++) {
                                if (comment.likes[i].author.userName == this.currentUser.userName) {
                                    isLiked = true
                                    await UserDataService.unlikeComment(post_id, comment_id, comment.likes[i].id)
                                        .catch( e => {
                                        alert(e)
                                    })
            
                                    comment.likes.splice(i, 1)
                                
                                    return
                                }
                            }
                        
                            if (!isLiked){
                                var name =  user.userName
                                var like 
                                await UserDataService.likeComment(post_id, comment_id, name)
                                .then(response => {
                                    like = response.data
                                })
                                .catch( e => {
                                alert(e)
                                })
            
                                comment.likes.push(like)
                            }
                        }
                    }
                }
            }        
        }
    },

    gotoAnotherPage(page){
        window.location.href = page
    },

    newUser() {
        this.submitted = false
        this.currentUser = {}
    },

    newPage(newPage){
        path = "'/" + newPage + "'"     
    },

    async updateUser() {
        let data = {
            userName:this.currentUser.userName,
            password: this.currentUser.password
        }
        await UserDataService.update(this.currentUser.id, data)
        .then(() => {
            this.message = 'The user was updated successfully!'
        })
        .catch(e => {
            alert(e)
        })
    },

    async deleteUser() {
        await UserDataService.delete(this.currentUser.id)
        .then(() => {
            this.$router.push({name: 'users'})
        })
        .catch(e => {
            alert(e)
        })
    }
}});