const api = {
    getPoapList: {
        method: 'post',
        url: '/poap/mainpage_list'
    },
    mint: {
        method: 'post',
        url: '/poap/mint'
    },
    claim: {
        method: 'post',
        url: '/poap/collect'
    }
};
export default api;