const resetMiddleware =
    (initConversation) =>
    ({ dispatch }) =>
    (next) =>
    (action) => {
        switch (action.type) {
            case 'WEB_CHAT/SEND_MESSAGE': {
                const { text } = action.payload;

                if (text.startsWith('/reset')) {
                    dispatch({
                        type: 'WEB_CHAT/SEND_MESSAGE_BACK',
                        payload: {
                            ...action.payload,
                            text: text.trim(),
                        },
                    });
                    return;
                }

                return next(action);
            }

            case 'WEB_CHAT/SEND_POST_BACK': {
                const { value } = action.payload;

                if (value?.action === 'submit_feedback') {
                    console.log('END WITH SUBMIT');
                    sessionStorage.clear();
                    initConversation();
                    return;
                } else if (value?.confirm === 'no') {
                    console.log('END WITH NO');
                    sessionStorage.clear();
                    initConversation();
                    return;
                }

                return next(action);
            }

            default:
                return next(action);
        }
    };

export default resetMiddleware;
