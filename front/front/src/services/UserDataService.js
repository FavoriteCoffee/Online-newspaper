import http from '../http-common'

class UserDataService {

    // ---- >>  << ---- //

    getAllUsers() {
        return http.get('/users')
    }

    //не нужны
    getAllNews() {
        return http.get('/posts')
    }

    getAllComments(id) {
        return http.get(`posts/${id}/comments`)
    }

    getUser(name) {
        return http.get(`/users/${name}`)
    }

    getNews(id) {
        return http.get(`/posts/${id}`)
    }

    getComment(id) {
        return http.get(`/comments/${id}`)
    }

    getRecentComments(id) {
        return http.get(`/posts/${id}/comments/recent`) 
    }

    getRecentNews() {
        return http.get(`/posts/recent`)
    }

    getNewsLikes(id) {
        return http.get(`/posts/${id}/likes`)
    }

    getCommentsLikes(post_id, comment_id) {
        return http.get(`/posts/${post_id}/comments/${comment_id}/likes`)
    }
    
    // ---- >>  << ---- //

    createUser(data) {
        let token = localStorage.getItem('token')
        return http.post('/users', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    createNews(data) {
        let token = localStorage.getItem('token')
        return http.post('/posts', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    createComment(post_id, author_id, data) {
        let token = localStorage.getItem('token')
        return http.post(`/posts/${post_id}/post-comment-by-userid/${author_id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    likeNews(id, userName) {
        let token = localStorage.getItem('token')
        return http.post(`posts/${id}/likes`, userName, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    likeComment(post_id, comment_id, author) {
        let token = localStorage.getItem('token')
        return http.post(`/posts/${post_id}/comments/${comment_id}/likes`, author, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    signIn(request) {
        return http.post(`/auth/sign-in`, request)
    }

    signUp(request) {
        return http.post(`/auth/sign-up`, request)
    }

    // ---- >>  << ---- //

    updateUser(id, data) {
        let token = localStorage.getItem('token')
        return http.put(`/users/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    updateNews(id, data) {
        let token = localStorage.getItem('token')
        return http.put(`/posts/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    updateComments(id, data) {
        let token = localStorage.getItem('token')
        return http.put(`/comments/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    // ---- >>  << ---- //

    deleteUser(id) {
        let token = localStorage.getItem('token')
        return http.delete(`/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    deleteNews(id) {
        let token = localStorage.getItem('token')
        return http.delete(`/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    deleteComment(id, comment_id) {
        let token = localStorage.getItem('token')
        return http.delete(`/posts/${id}/comments/${comment_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    
    unlikeNews(post_id, like_id) {
        let token = localStorage.getItem('token')
        return http.delete(`/posts/${post_id}/likes/${like_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })   
    }

    unlikeComment(post_id, comment_id, like_id) {
        let token = localStorage.getItem('token')
        return http.delete(`/posts/${post_id}/comments/${comment_id}/likes/${like_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export default new UserDataService()
