import storeConversation from './storeConversation';

const resetMiddleware =
    (initConversation) =>
    ({ dispatch }) =>
    (next) =>
    (action) => {
        console.log('resetMiddleware', action);

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

            // Stop conversazione dopo il feedback
            case 'DIRECT_LINE/INCOMING_ACTIVITY': {
                if (action?.payload?.activity?.text === '__SYSTEM_MESSAGE__ QUIT_COMPLETED') {
                    storeConversation();
                    sessionStorage.clear();
                    initConversation();
                    console.log('QUIT_COMPLETED');
                    return;
                }
            }

            default:
                return next(action);
        }
    };

export default resetMiddleware;
