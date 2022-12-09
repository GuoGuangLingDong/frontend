const api = {
    getScore: {
        method: 'get',
        url: '/user/score'
    },
    getUserInfo: {
        method: 'get',
        url: '/user/profile'
    },
    setUserInfo: {
        method: 'post',
        url: '/user/profile'
    },
    getFollow: {
        method: 'get',
        url: '/user/follow_all'
    },
    cancelFollow: {
        method: 'post',
        url: '/user/unfollow'
    },
    follow: {
        method: 'post',
        url: '/user/follow'
    }
};
export default api;