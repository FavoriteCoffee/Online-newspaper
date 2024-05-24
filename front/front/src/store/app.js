import { defineStore } from "pinia";
import UserDataService from "../services/UserDataService";
import axios from "axios";


export const useStore = defineStore('MyStore', {
    state: () => ({
        news: [{id: 1, likedBy: ["name"], showText:false, date:"01.02.03", img:'./img/cat.jpg', title:" t1", text: ' ', comments: [{text: "1коммент 1 новости", id:'1111'}, {text: "2коммент 1 новости", id:'1111'}, {text: "3коммент 1 новости", id:'1111'}]},
                 {id: 2, likedBy: ["name"],  showText:false, date:"01.02.03", img:'#', title:"title2", text: '2News', comments: [{likedBy: ["name"], text: " ", id:'1111'}, {text: "2коммент 2 новости", id:'1111'}, {text: "3коммент 2 новости", id:'1111'}]},
            	 {id: 3,  likedBy: [], showText:false, date:"01.02.03", img:'./img/castle.jpeg', title:"title3", text: '3News', comments:[{text: "com11", id: 11}, {text: "com12", id: 12}]}],
        comments: [[{text: "com11", id: 11}, {text: "com12", id: 12}],
                   {text: "com2", id: 1},
                   {text: "com3", id: 1}],
        users: [{id: 0, username: "first", name: "F", surname: "Ff"}],
        
        authenticationData: {
            enteredUserName: "",
            enteredPassword: "",
            
        },
        registrationData: {
            enteredName: "",
            enteredSurname: "",
            enteredUserName: "",
            enteredPassword: "",
        },
    
        currentDateAndTime: null, //let currentDate = new Date();

        currentUser: {
            userName: null,
            password: null,
            name: null,
            surname: null,
            id: null
        },    
        users: [{userName: "HippoMaru1", password: "1111"},
                {userName: "HippoMaru2", password: "1111"},
                {userName: "HippoMaru3", password: "3333"},],


        userIn: true
    }),
    

// TODO поправить лайки




    actions: {
    
    // ---------- >>  GETTERS  << --------- //
   
 
    async saveTodayNews(){
        await UserDataService.getRecentNews()
        .then(response => {
            this.news = response.data.slice(0)
            console.log("то что присылает сервер:", response.data, "то что записано в tis.news:", this.news)
        }) 
    },

    async saveComments(){
        for (let news of this.news){
            await UserDataService.getAllComments(news.id)
            .then(response => {
                for (let n of this.news){
                    if (n.id === news.id) {
                        n.comments = response.data.slice(0)
                        console.log("из сохранения комментариев, новости номер ", n.comments)
                    }
                } 
            })
        }

        console.log(this.currentUser.userName, this.currentUser.id, this.currentUser.name, this.currentUser.surname)
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

    jwt_decode(token){
        const decode = decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
        return decode
    },
    
    async saveCurrentUser(){
        let token = localStorage.getItem('token')
        if (token !== null){
            let user = JSON.parse(this.jwt_decode(token))
            console.log("USER = ", user)
            if (user !== null){
                let name = user.sub
                console.log(name)
                await UserDataService.getUser(name)
                .then( response => {
                    this.currentUser.userName = response.data.username
                    this.currentUser.password = response.data.password
                    this.currentUser.name = response.data.name
                    this.currentUser.surname = response.data.surname
                    this.currentUser.id = response.data.id
                    //console.log("СОХРАНЕНИЕ ЮЗЕРА", this.currentUser.userName, this.currentUser.id)
                })
            }
        }
    },

    async saveUsers(){
        await UserDataService.getAllUsers()
        .then(response => {
            this.users = response.data.slice(0)
            console.log("то что присылает сервер:", response.data, "то что записано в this.users:", this.users)
        }) 
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
        await this.saveUsers()
        await this.showTodayNews()
    },

    getNewsTitles(){
        let res = []
        for (let news of this.news){
            res.push(news.title)
        }
        return res
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
        let token = localStorage.getItem('token')
        if (token !== null){
            let user = JSON.parse(this.jwt_decode(token))
            return user.sub
        }
        else 
            return null
    },

    isNewsLiked(newsId){
        for (let news of this.news) {
            if (news.id == newsId) {
                if (news.likes !== undefined && news.likes.length > 0){
                    for (let like of news.likes) {
                        if (like.author.id == this.currentUser.id) {
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
                                if (like.author.id == this.currentUser.id) {
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
        this.currentUser.name = null
        this.currentUser.surname = null
        this.currentUser.id = null
        this.userIn = false
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    },
    
    // async createTestNews(text, title, imgPath){
    //     var data = {
    //         text: text,
    //         title: title,
    //         imgPath: imgPath
    //     }
    //     const res = await UserDataService.createNews(data)
    //     // console.log(res)
    //     return res.data.id
    // },

    // async createTestUser(name, pass){
    //     var request = {
    //         username: name,
    //         password: pass
    //     }
    //     await UserDataService.signUp(request)
    //     .then(response => {
    //         localStorage.setItem("token", response.data.token)
    //     })
    //     .catch( e => {
    //         c = false
    //         console.log("Неверный логин")
    //         return
    //     })
        
    //     return res.data.id
    // },

    // async authalizeTestUser(name, pass){
    //     var request = {
    //         username: name,
    //         password: pass
    //     }

    //     await UserDataService.signIn(request)
    //     .then(response => {
    //         localStorage.setItem("token", response.data.token)
    //     })
    //     .catch( e => {
    //         c = false
    //         console.log("Неверный логин")
    //         return
    //     })
    // },
    
    // async createTestComment(newsid, user_id, text){
    //     var data = {
    //         text: text,
    //     }
    //     const res = await UserDataService.createComment(newsid, user_id, data)
    //     return res.data.id
    // },

    // async createTestLike(newsid){
    //     const res = await UserDataService.likeNews(newsid, "Anna")
    // },

    // async pushTestDataToDB(){
    //     let dataNeeded = true
    //     await UserDataService.getRecentNews().then( response => {
    //         if(response.data.slice(0).length != 0){
    //             dataNeeded = false
    //         }
    //     })

    //     if(!dataNeeded) {return}

    //     var newsid1
    //     var newsid2
    //     var newsid3

    //     var userid

    //     var commentid1

    //     var commentsid1 = new Array(3).fill(null)
    //     var commentsid2 = new Array(3).fill(null)
    //     var commentsid3 = new Array(3).fill(null)

    //     await this.createTestUser("Anna", "Olaf").catch( e => {
    //         console.log("не создался")
    //     })

    //     await this.authalizeTestUser("Anna", "Olaf").catch( e => {
    //         console.log("не авторизовался")
    //     })

    //     await UserDataService.getUser("Anna")
    //     .then(response => { 
    //         userid = response.data.id
    //     })
    //     console.log("USER: ", userid)

    //     newsid1 = await this.createTestNews("text 1", "title 1", "../img/cat.jpg")
    //     console.log("news 1 id = ", newsid1)
    //     newsid2 = await this.createTestNews("text 2", "title 2", "../img/fon.png")
    //     console.log("news 2 id = ", newsid2)
    //     newsid3 = await this.createTestNews("text 3", "title 3", "../img/home.jpg")
    //     console.log("news 3 id = ", newsid3)

    //     commentid1 = await this.createTestComment(newsid1, userid,  "first comment news1")

    //     for (let i = 0; i < commentsid1.length; ++i){
    //         commentsid1[i] = await this.createTestComment(newsid1, userid, "comment news1")
    //     }
 
    //     for (let i = 0; i < commentsid2.length; ++i){
    //         commentsid1[i] = await this.createTestComment(newsid2, userid, "comment news2")
    //     }

    //     for (let i = 0; i < commentsid3.length; ++i){
    //         commentsid1[i] = await this.createTestComment(newsid3, userid, "comment news3")
    //     }

    //     await this.createTestLike(newsid1)
    //     await this.createTestLike(newsid2)
    //     await this.createTestLike(newsid3)

    //     localStorage.removeItem("token")
    // },

    async loadData(){
        //await this.pushTestDataToDB()
        await this.saveAllDataFromDB()
    },

    async saveUser(enteredName, enteredUserName, enteredSurname, enteredPassword) {
        this.currentUser.userName = enteredUserName
        this.currentUser.password = enteredPassword
	    this.currentUser.name = enteredName
	    this.currentUser.surname = enteredSurname
        this.userIn = true

        var data = {
            username: enteredUserName,
            password: enteredPassword,
	    name: enteredName,
	    surname: enteredSurname
        }
    
        await UserDataService.createUser(data)
        .then(response => {
            this.currentUser.id = response.data.id
            this.submitted = true;
            console.log("response.data из saveUser ", response.data.username, response.data.id)
        })
        .catch( e => {
            alert(e)
        })
        
        return true
    }, 

    async addPost(text, title, img){
        var data = {
            text: text,
            title: title,
            imgPath: img,
        }

        await UserDataService.createPost(data)
        .then( response => {
            console.log("создан новый пост", response.data)
        })
        .catch( e => {
            console.log("Ошибка создания поста!!!")
        })
    },

    async addComment(newsId, user_id, commentText){
        var data = {
            text: commentText
        }

        var date
        var comment
        var id

        console.log("в запрос createComment подаем: ", newsId, user_id, data)
        await UserDataService.createComment(newsId, user_id, data)
        .then( response => {
            console.log("из функции ADDCOMMENT: ", response.data)            
            id = response.data.id
            date = response.data.date
        })
        .catch( e => {
            alert(e)
            console.log("Ошибка создания комментария!!!")
        })

        var comment = {
            id: id,
            date: date,
            text: commentText,
            author: {id: user_id, username: this.currentUser.userName},
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
        var c = true
        let user
        let request = {
            username: this.registrationData.enteredUserName,
            password: this.registrationData.enteredPassword,
	        name: this.registrationData.enteredName,
	        surname: this.registrationData.enteredSurname,
        }
        if (this.registrationData.enteredUserName !== "" &&
            this.registrationData.enteredPassword !== "" &&
	        this.registrationData.enteredName !== "" &&
	        this.registrationData.enteredSurname !== ""){
                await UserDataService.signUp(request)
                .then(response => {
                    localStorage.setItem("token", response.data.token)
                })
                .catch( e => {
                    c = false
                    console.log("Ошибка регистрации")
                    return
                })
            }

            await UserDataService.getUser(this.registrationData.enteredUserName)
            .then(response => {
                user = response.data
            })
            .catch( e => {
                c = false
                console.log(request)
                console.log("Ошибка получения вновьсозданного пользователя после регистрации")
                return
            })

            if (c) {
                this.userIn = true

                console.log("userIn === true", this.userIn)

                this.currentUser.userName = user.username
                this.currentUser.password = user.password
                this.currentUser.name = user.name
                this.currentUser.surname = user.surname
                this.currentUser.id = user.id

                //localStorage.setItem('user', JSON.stringify(user))
                
                this.gotoAnotherPage('/main')
            }   
        
    },

    async verificationOfAuthentication(){
        var c = true
        let user
        let request = {
            username: this.authenticationData.enteredUserName,
            password: this.authenticationData.enteredPassword,
	    // name: this.registrationData.enteredName,
	    // surname: this.registrationData.enteredSurname,
        }
        if (this.authenticationData.enteredUserName !== "" &&
            this.authenticationData.enteredPassword !== "" 
        //     &&  this.registrationData.enteredName !== "" &&
	    // this.registrationData.enteredSurname !== ""
    ){
                await UserDataService.signIn(request)
                .then(response => {
                    localStorage.setItem("token", response.data.token)
                })
                .catch( e => {
                    c = false
                    console.log("Неверный логин")
                    //localStorage.clear()
                    return
                })
            }
         await UserDataService.getUser(this.authenticationData.enteredUserName)
            .then(response => {
                user = response.data
                console.log("USER: ", user)
            })

            if (c) {
                this.userIn = true

                console.log("userIn === true", this.userIn)

                this.currentUser.userName = user.username
                console.log("authenticationData.enteredUserName: ", this.authenticationData.enteredUserName, "user.username: ", user.username, "this.currentUser.userName", this.currentUser.userName)
                this.currentUser.password = user.password
                this.currentUser.name = user.name
                this.currentUser.surname = user.surname
                this.currentUser.id = user.id

                //localStorage.setItem('user', JSON.stringify(user))
                
                this.gotoAnotherPage('/main')
            }   
    },

    changeVisibility(val){
        val = !val
    },
    
    async changeNewsLike(post_id){
        let token = localStorage.getItem('token')
        let user
        if (token !== null){
            user = JSON.parse(this.jwt_decode(token))
        }

        if (user !== null && this.currentUser.userName !== null){

            let isLiked = false
            let index = null

            for (let news of this.news) {
                if (news.id == post_id && news.likes != []) {
                    for (let i = 0; i < news.likes.length; i++) {
                        if (news.likes[i].author.id == this.currentUser.id) {
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
                        var name = user.sub
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
        let user
        let token = localStorage.getItem('token')
        if (token !== null){
            user = JSON.parse(this.jwt_decode(token))
        }
        if (user !== null && this.currentUser.userName !== null){
            let isLiked = false
            for (let news of this.news) {
                if (news.id == post_id) {
                    for (let comment of news.comments) {
                        if (comment.id == comment_id) {
                            console.log("comment.likes.length ", comment)
                            for (let i = 0; i < comment.likes.length; i++) {
                                if (comment.likes[i].author.id == this.currentUser.id) {
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
                                var name =  user.sub
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
            username: this.currentUser.userName,
            password: this.currentUser.password,
            name: this.currentUser.name,
            surname: this.currentUser.surname
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
    },
    async deleteUser(userId) {
        await UserDataService.deleteUser(userId)
        .then(() => {
            console.log("пользователь", userId, "успешно удален")
        })
        .catch(e => {
            alert(e)
        })
    },
     async deleteNews(newsId){
        console.log(newsId)
        await UserDataService.deleteNews(newsId)
        .catch(e => {
            alert(e)
        })
     },
     async deleteComment(newsId, commentId){
        await UserDataService.deleteComment(newsId, commentId)
        .then(() => {
            console.log("комментарий", commentId, "успешно удален")
        })
     },
}});