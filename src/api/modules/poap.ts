const api = {
    getDetails: {
        method: 'post',
        url: '/poap/details'
    },
    getHolders: {
        method: 'post',
        url: '/poap/holders'
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