import http from '../http-common'

class UserDataService {

    // ---- >>  << ---- //

    getAllUsers() {
        return http.get('/users')
    }

    getAllNews() {
        returnyttp.get('/news')
    }

    getAllComments() {
        return http.get(`/comments/${id}`)
    }

    getUser(id) {
        return http.get(`/users/${id}`)
    }

    getNews(id) {
        return http.get(`/news/${id}`)
    }

    getComment(id) {
        return http.get(`/comments/${id}`)
    }

    
    // ---- >>  << ---- //

    createUser(data) {
        return http.post('/users', data)
    }

    createNews(data) {
        return http.post('/news', data)
    }

    createComment(data) {
        return http.post('/comments', data)
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
}

export default new UserDataService()