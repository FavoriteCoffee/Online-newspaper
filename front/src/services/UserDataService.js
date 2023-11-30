import http from '../http-common'

class UserDataService {

    // ---- >>  << ---- //

    getAllUsers() {
        return http.get('/users')
    }

    getAllNews() {
        returnyttp.get('/news')
    }

    getAllComments(id) {
        return http.get(`posts/${id}/comments`)
    }

    getUser(name) {
        return http.get(`/users/users/${name}`)
    }

    getNews(id) {
        return http.get(`/news/${id}`)
    }

    getComment(id) {
        return http.get(`/comments/${id}`)
    }

    getRecentComments(id, userId) {
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
        return http.post('/users', data)
    }

    createNews(data) {
        return http.post('/news', data)
    }

    createComment(id, data) {
        return http.post(`/posts/${id}/comments`, data)
    }

    likeNews(id) {
        return http.post(`posts/${id}/likes`)
    }

    likeComment(post_id, comment_id) {
        return http.post(`/posts/${post_id}/comments/${comment_id}/likes`)
    }


    // ---- >>  << ---- //

    updateUser(id, data) {
        return http.put(`/users/${id}`, data)
    }

    updateNews(id, data) {
        return http.put(`/news/${id}`, data)
    }

    updateComments(id, data) {
        return http.put(`/comments/${id}`, data)
    }

    // ---- >>  << ---- //

    deleteUser(id) {
        return http.delete(`/users/${id}`)
    }

    deleteNews(id) {
        return http.delete(`/news/${id}`)
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