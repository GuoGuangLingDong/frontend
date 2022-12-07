const api = {
    login: {
        method: 'post',
        url: '/user/sign-in',
    },
    register: {
        method: 'post',
        url: '/user/sign-up',
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