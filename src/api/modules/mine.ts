const api = {
    getPoapList: {
        method: 'post',
        url: '/poap/mainpage_list'
    },
    getScore: {
        method: 'get',
        url: '/user/score'
    },
    getUserInfo: {
        method: 'get',
        url: '/user/profile'
    }
};
export default api;