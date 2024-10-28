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
        const res = await fetch(
            'https://sibilla-bot-appservice-e5egc6dseagxc2gy.northeurope-01.azurewebsites.net/api/get-token',
            {
                method: 'GET',
            },
        );

        return res.json();
    },
};

export default API;
