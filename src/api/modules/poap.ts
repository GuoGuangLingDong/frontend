const api = {
    getPoapList: {
        method: 'post',
        url: '/poap/mainpage_list'
    },
    getDetails: {
        method: 'post',
        url: '/poap/details'
    },
    getHolders: {
        method: 'get',
        url: '/poap/holders'
    },
    mint: {
        method: 'post',
        url: '/poap/mint'
    },
    claim: {
        method: 'post',
        url: '/poap/collect'
    },
    getToken: {
        method: 'post',
        url: '/upload/token'
    },
    favour: {
        method: 'post',
        url: '/poap/favor'
    }
};
export default api;