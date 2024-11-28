import storeCurrentConversation from '../zustand/utils/storeCurrentConversation';
import useConversationStore from '../zustand/conversation';

const mainMiddleware =
    (initConversation) =>
    ({ dispatch }) =>
    (next) =>
    (action) => {
        switch (action.type) {
            case 'WEB_CHAT/SEND_MESSAGE': {
                const { text } = action.payload;

                if (text.startsWith('/reset-simple')) {
                    dispatch({
                        type: 'WEB_CHAT/SEND_MESSAGE_BACK',
                        payload: {
                            ...action.payload,
                            text: text.trim(),
                        },
                    });
                    storeCurrentConversation();
                    useConversationStore.getState().removeConversation();
                    initConversation();
                    console.info('QUIT_COMPLETED');
                    break;
                }

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

                document.body.classList.add('message-sending');
                document.body.classList.remove('show-splash');
                return next(action);
            }

            case 'DIRECT_LINE/INCOMING_ACTIVITY': {
                if (action?.payload?.activity?.text === '__SYSTEM_MESSAGE__ QUIT_COMPLETED') {
                    storeCurrentConversation();
                    useConversationStore.getState().removeConversation();
                    initConversation();
                    console.info('QUIT_COMPLETED');
                    break;
                } else if (action?.payload?.activity?.text === '__SYSTEM_MESSAGE__ QUIT_SIMPLE_COMPLETED') {
                    // useConversationStore.getState().removeConversation();
                    // initConversation();
                    // console.info('QUIT_COMPLETED');
                    break;
                }

                return next(action);
            }

            case 'DIRECT_LINE/POST_ACTIVITY_FULFILLED': {
                document.body.classList.remove('message-sending');
                return next(action);
            }

            default:
                return next(action);
        }
    };

export default mainMiddleware;
