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
        return http.put(`/users/${id}`, data)
    }

    updateNews(id, data) {
        return http.put(`/posts/${id}`, data)
    }

    updateComments(id, data) {
        return http.put(`/comments/${id}`, data)
    }

    // ---- >>  << ---- //

    deleteUser(id) {
        return http.delete(`/users/${id}`)
    }

    deleteNews(id) {
        return http.delete(`/posts/${id}`)
    }

    deleteComment(id, comment_id) {
        return http.delete(`/posts/${id}/comments/${comment_id}`)
    }
    
    unlikeNews(post_id, like_id) {
        return http.delete(`/posts/${post_id}/likes/${like_id}`)   
    }

    unlikeComment(post_id, comment_id, like_id) {
        return http.delete(`/posts/${post_id}/comments/${comment_id}/likes/${like_id}`)
    }
}

export default new UserDataService()