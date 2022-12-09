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
    },
    getFollow: {
        method: 'get',
        url: '/user/follow_all'
    },
    cancelFollow: {
        method: 'get',
        url: '/user/unfollow'
    },
    follow: {
        method: 'get',
        url: '/user/follow'
    }
};
export default api;