const api = {
    login: {
        method: 'post',
        url: '/user/log_in'
    },
    register: {
        method: 'post',
        url: '/user/sign_up',
    },
    getVerifyCode: {
        method: 'post',
        url: '/code/send',
    },
    getImageCode: {
        method: 'post',
        url: '/code/image',
    },
}
export default api;