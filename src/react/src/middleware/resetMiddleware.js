import storeCurrentConversation from '../zustand/utils/storeCurrentConversation';
import useConversationStore from '../zustand/conversation';

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
                    break;
                }

                if (text.startsWith('/fr')) {
                    storeCurrentConversation();
                    useConversationStore.getState().removeConversation();
                    initConversation();
                    console.info('QUIT_COMPLETED');
                    break;
                }

                return next(action);
            }

            // Stop conversazione dopo il feedback
            case 'DIRECT_LINE/INCOMING_ACTIVITY': {
                if (action?.payload?.activity?.text === '__SYSTEM_MESSAGE__ QUIT_COMPLETED') {
                    storeCurrentConversation();
                    useConversationStore.getState().removeConversation();
                    initConversation();
                    console.info('QUIT_COMPLETED');
                    break;
                }
                return next(action);
            }

            default:
                return next(action);
        }
    };

export default resetMiddleware;

