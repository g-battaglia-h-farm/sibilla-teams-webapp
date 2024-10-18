import storeConversation from './storeConversation';
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
                    return;
                }

                return next(action);
            }

            // Stop conversazione dopo il feedback
            case 'DIRECT_LINE/INCOMING_ACTIVITY': {
                console.log('DIRECT_LINE/INCOMING_ACTIVITY');
                if (action?.payload?.activity?.text === '__SYSTEM_MESSAGE__ QUIT_COMPLETED') {
                    console.log('HELLO');
                    storeConversation();
                    console.log('storeConversation');
                    useConversationStore.getState().removeConversation();
                    console.log('Conversation removed');
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
