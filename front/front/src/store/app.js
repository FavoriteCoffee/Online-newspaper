import UserDataService from "../services/UserDataService";
import { defineStore } from "pinia";
import axios from "axios";


export const useStore = defineStore('MyStore', {
    state: () => ({
        news: [{id: 1, likedBy: ["name"], showText:false, date:"01.02.03", img:'./img/cat.jpg', title:" Заголовок 1", text: 'текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст ', comments: [{text: "1коммент 1 новости", id:'1111'}, {text: "2коммент 1 новости", id:'1111'}, {text: "3коммент 1 новости", id:'1111'}]},
                 {id: 2, likedBy: ["name"],  showText:false, date:"01.02.03", img:'#', title:"title2", text: '2News', comments: [{likedBy: ["name"], text: " ", id:'1111'}, {text: "2коммент 2 новости", id:'1111'}, {text: "3коммент 2 новости", id:'1111'}]},
            	 {id: 3,  likedBy: [], showText:false, date:"01.02.03", img:'./img/castle.jpeg', title:"title3", text: '3News', comments:[{text: "com11", id: 11}, {text: "com12", id: 12}]}],
        
        temp: [{}],
        comments: [[{text: "com11", id: 11}, {text: "com12", id: 12}],
                   {text: "com2", id: 1},
                   {text: "com3", id: 1}],
        users: [{id: 0, username: "first", name: "F", surname: "Ff"}],

        categories: [{id: 1, name:"A"}],

        selectedCategories: [],
        
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


        userIn: true,

        showErrMsg: false,

        errMasages: {regErr: "Ошибка регистрации", authErr: "Ошибка аутентификации"},

        currentErrMsg: null,

        // Данные для поиска ----------------

          loading: false,
          search: '',
          selected: [],

        //   ------------------------
        
    }),


    actions: {

    // --------- >> Методы для поиска << --------- //

    allSelected() {
        return this.selected.length === this.categories.length
      },

      tags() {
        const search = this.search.toLowerCase()

        if (!search) return this.categories

        return this.categories.filter(category => {
          const text = category.name.toLowerCase()

          return text.indexOf(search) > -1
        })
      },

      selections() {
        const selections = []

        for (const selection of this.selected) {
          selections.push(selection)
        }

        return selections
      },

    async searchByCategories(){
        //сравниваем полученные с сервера с текущими и удаляем несовпавшие
        let res = []

        let selected = []

        for (let tag of this.selected){
            selected.push(tag.name)
        }


        await UserDataService.getNewsByCategories(selected)
        .then( response => {
            res = response.data
        })
        .catch( e => {
            console.log("Ошибка получения новостей по категории")
        })

        await this.loadData()
       
        let del = []
        let found = false

        for (let news of this.news){
            for (let n of res){
                if (news.id == n.id){
                    found = true
                }
            }
            if(!found){
                let ind = this.news.indexOf(news)
                this.news.splice(ind, 1)
            }
            found = false
        }
      },

      next() {
        this.loading = true

        setTimeout(() => {
          this.search = ''
          this.selected = []
          this.loading = false
        }, 2000)
      },
  


    
    // ---------- >>  GETTERS  << --------- //
   
 
    async saveTodayNews(){
        await UserDataService.getRecentNews()
        .then(response => {
            this.news = response.data.slice(0)
        }) 
    },

    async saveComments(){
        for (let news of this.news){
            await UserDataService.getAllComments(news.id)
            .then(response => {
                for (let n of this.news){
                    if (n.id === news.id) {
                        n.comments = response.data.slice(0).reverse()
                    }
                } 
            })
        }

        // console.log(this.currentUser.userName, this.currentUser.id, this.currentUser.name, this.currentUser.surname)
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
            if (user !== null){
                let name = user.sub
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
        }) 
    }, 

    async saveCategories(){
    await UserDataService.getAllCategories()
    .then( response => {
        this.categories = response.data.slice(0)
    })
    .catch( e => {
        console.log("ОШИБКА ПОЛУЧЕНИЯ КАТЕГОРИЙ С СЕРВЕРА")
        console.log(e)
    }) 

    for (let news of this.news){
            await UserDataService.getNewsCategories(news.id)
            .then(response => {
                for (let n of this.news){
                    if (n.id === news.id) {
                        n.categories = response.data.slice(0)
                        // console.log("из сохранения категорий, новости", n.categories)
                    }
                } 
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
        await this.saveUsers()
        await this.saveCategories()
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

    getCategoriesNames(){
        let res = []
        for (let tag of this.categories){
            res.push(tag.name)
        }
        return res
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

    isUserAnAdmin(){
        let token = localStorage.getItem('token')
        if (token !== null){
            let user = JSON.parse(this.jwt_decode(token))
            return user.role == "ROLE_ADMIN"
        }
        else 
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
            // console.log("response.data из saveUser ", response.data.username, response.data.id)
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
        let id

        await UserDataService.createPost(data)
        .then( response => {
            id = response.data.id
        })
        .catch( e => {
            console.log("Ошибка создания поста!!!")
        })

        for(let category_name of this.selectedCategories){
            await UserDataService.addCategoryForNews(id, category_name)
            .catch( e => {
                console.log("Ошибка добавления категории: ",category_name)
            })
        }
        
        this.selectedCategories = []
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
                news.comments.unshift(comment)   
            }
        }     
    },

    async addTag(text){
        var id

        var category = {
            name: text,
        }

        await UserDataService.createCategory(category)
        .then( response => {
            //тут добавление нового тега в стор для реактивности id + text
        })
        .catch( e => {
            alert(e)
            console.log("Ошибка создания категории!!!") 
        })
    },

    async logInAsAdmin(){
        var c = true
        let user
        let request = {
            username: this.authenticationData.enteredUserName,
            password: this.authenticationData.enteredPassword,
        }
        if (this.authenticationData.enteredUserName !== "" &&
            this.authenticationData.enteredPassword !== "" 
    ){
                await UserDataService.signIn(request)
                .then(response => {
                    localStorage.setItem("token", response.data.token)
                })
                .catch( e => {
                    c = false
                    console.log("Неверный логин")
                    this.showErrMsg = true
                    this.currentErrMsg = this.errMasages.authErr
                    return
                })
            }
         await UserDataService.getUser(this.authenticationData.enteredUserName)
            .then(response => {
                user = response.data
            })

            if (c) {
                this.userIn = true

                this.currentUser.userName = user.username
                this.currentUser.password = user.password
                this.currentUser.name = user.name
                this.currentUser.surname = user.surname
                this.currentUser.id = user.id
                
                this.gotoAnotherPage('/admin')
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
                    this.showErrMsg = false
                    this.currentErrMsg = null
                })
                .catch( e => {
                    c = false
                    console.log("Ошибка регистрации")
                    this.showErrMsg = true
                    this.currentErrMsg = this.errMasages.regErr
                    return
                })
            }

            await UserDataService.getUser(this.registrationData.enteredUserName)
            .then(response => {
                user = response.data
            })
            .catch( e => {
                c = false
                console.log("Ошибка получения вновьсозданного пользователя после регистрации")
                return
            })

            if (c) {
                this.userIn = true

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
                    this.showErrMsg = true
                    this.currentErrMsg = this.errMasages.authErr
                    //localStorage.clear()
                    return
                })
            }
         await UserDataService.getUser(this.authenticationData.enteredUserName)
            .then(response => {
                user = response.data
            })

            if (c) {
                this.userIn = true

                this.currentUser.userName = user.username
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
                            like = response.data
                        })
                        .catch( e => {
                        alert(e)
                        })

                        news.likes.push(like)
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

        for (let i = 0; i < this.users.length; ++i){
            if (this.users[i].id == userId){
                this.users.splice(i, 1)
            }
        }
    },

     async deleteNews(newsId){
        await UserDataService.deleteNews(newsId)
        .catch(e => {
            alert(e)
        })

        for (let i = 0; i < this.news.length; ++i){
            if (this.news[i].id == newsId){
                this.news.splice(i, 1)
            }
        }
     },

     async deleteComment(newsId, commentId){
        await UserDataService.deleteComment(newsId, commentId)
        .then(() => {
            console.log("комментарий", commentId, "успешно удален")
        })

        for (let i = 0; i < this.news.length; ++i){
            if(this.news[i].id == newsId){
                if (this.news[i].comments != [] &&  this.news[i].comments.length !== 0){
                    for(let j = 0; j < this.news[i].comments.length; ++j){
                        if (this.news[i].comments[j].id === commentId){
                            this.news[i].comments.splice(j, 1)
                        }
                    }
                }
            }
        }
     },

     async deleteTag(id){
        await UserDataService.deleteCategory(id)
        .then( response => {
            //удаление из стора для реактивности
            for (let i = 0; i < this.categories.length; ++i){
                if (this.categories[i].id == id){
                    this.categories.splice(i, 1)
                }
            }
        })
        .catch( e => {
            alert(e)
            console.log("Ошибка удаления категории!!!")
        })
     },
}});