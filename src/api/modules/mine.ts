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
    getFollowers: {
        method: 'get',
        url: '/user/followers'
    },
    getFollowees: {
        method: 'get',
        url: '/user/followees'
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