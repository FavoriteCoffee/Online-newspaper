import http from '../http-common'

class UserDataService {
    getAllUsers() {
        return http.get('/users')
    }

    getAllNews() {
        returnyttp.get('/news')
    }

    get(id) {
        return http.get(`/users/${id}`)
    }

    create(data) {
        return http.post('/users', data)
    }

    updateUser(id, data) {
        return http.put(`/users/${id}`, data)
    }

    updateNews(id, data) {
        return http.put(`/news/${id}`, data)
    }

    deleteUser(id) {
        return http.delete(`/users/${id}`)
    }
}

export default new UserDataService()