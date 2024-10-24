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

    getJwt: async () => {
        const res = await fetch('https://europe.webchat.botframework.com/v3/directline/tokens/generate', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer -y4zYgzySyQ.mI95uwEU3mELuz4-DA7tSt7cE2Z0Y0TNZAn3X3IdCgU',
            },
        });

        return res.json();
    },
};

export default API;
