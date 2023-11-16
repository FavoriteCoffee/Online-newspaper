import { defineStore } from "pinia";
import UserDataService from "../services/UserDataService";



export const useStore = defineStore('MyStore', {
    state: () => ({
        count: 7,
        news: [{id: 1, showText:false, data:"01.02.03", img:'./img/cat.jpg', title:"THIS IS SPARTA", text: '111bJCHjkbjhvkJhVKUYCJSB:OÏJESPOJSFo;1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', comments: [{text: "1коммент 1 новости"}, {text: "2коммент 1 новости"}, {text: "3коммент 1 новости"}]},
                 {id: 2,  showText:false, data:"01.02.03", img:'#', title:"title2", text: '2News', comments: [{text: "IF you happen to have read another book about Christopher Robin, you may remember that he once had a swan (or the swan had Christopher Robin, I don't know which) and that he used to call this swan Pooh. That was a long time ago, and when we said good-bye, we took the name with us, as we didn't think the swan would want it any more. Well, when Edward Bear said that he would like an exciting name all to himself, Christopher Robin said at once, without stopping to think, that he was Winnie-the-Pooh. And he was. So, as I have explained the Pooh part, I will now explain the rest of it."}, {text: "2коммент 2 новости"}, {text: "3коммент 2 новости"}]},
            	 {id: 3,  showText:false, data:"01.02.03", img:'./img/castle.jpeg', title:"title3", text: '3News', comments: [{text: "1коммент 3 новости"}, {text: "2коммент 3 новости"}, {text: "3коммент 3 новости"}]}],
        user: {
            firstName: "Леха",
            lastName: "Попович",
            email: null,
            phone: null,
            id: null,
            submitted: false
        }
    }),
    // getters: {

    // },
    actions: {
      changeVisibility(val){
        val = !val
      },
      saveUser() {
        var data = {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            phone: this.user.phone
        }
        UserDataService.create(data)
            .then(response => {
                this.user.id = response.data.id
                this.submitted = true;
            })
            .catch( e => {
                alert(e)
            })
        console.log(this.user.firstName)    
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
    getUser(id) {
      UserDataService.get(id)
          .then(response => {
              this.currentUser = response.data
          })
          .catch(e => {
              alert(e)
          })
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
