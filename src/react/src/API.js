const BASE_URL = __BASE_API_ENDPOINT__;

const API = {
    fetchConversationId: async (token) => {
        const res = await fetch('https://europe.webchat.botframework.com/v3/directline/conversations', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const { conversationId } = await res.json();
        return conversationId;
    },

    /**
     * Restituisce il token e l'id per iniziare una nuova conversazione.
     *
     * @returns {Promise<{token: string}>}
     */
    newConversations: async () => {
        const res = await fetch(BASE_URL + '/api/new-conversation', {
            method: 'POST',
        });

        return res.json();
    },

    /**
     * Restituisce il token per riprendere una conversazione sulla base dell'id.
     *
     * @param {string} conversationId
     * @param {string} message
     * @returns {Promise<{token: string}>}
     */
    resumeConversations: async (conversationId) => {
        const res = await fetch(BASE_URL + '/api/resume-conversation?conversationId=' + conversationId, {
            method: 'GET',
        });

        return res.json();
    },

    saveHistory: async (userId, conversationId, store) => {
        await fetch(BASE_URL + '/api/save', {
            method: 'POST',
            body: JSON.stringify({
                userId,
                conversationId,
                store,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    loadHistory: async (userId) => {
        const res = await fetch(BASE_URL + '/api/load?userId=' + userId, {
            method: 'GET',
        });

        return res.json();
    },

    login: async (token) => {
        const res = await fetch(BASE_URL + '/api/login', {
            method: 'POST',
            body: JSON.stringify({
                jwt: token,
            }),
        });

        return res.json();
    },

    obtain_login_code: async (code, challengeCode) => {
        const res = await fetch(BASE_URL + '/api/obtain-login-code', {
            method: 'POST',
            body: JSON.stringify({
                code,
                code_challenge: challengeCode,
            }),
        });

        return res.json();
    },
};

export default API;
