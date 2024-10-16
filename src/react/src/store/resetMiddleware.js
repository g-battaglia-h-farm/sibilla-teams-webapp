import storeConversation from './storeConversation';

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

                    storeConversation();

                    sessionStorage.clear();

                    initConversation();
                    return;
                } else if (value?.confirm === 'no') {
                    console.log('END WITH NO');

                    storeConversation();

                    sessionStorage.clear();
                    initConversation();
                    return;
                }

                return next(action);
            }

            /*
            case 'DIRECT_LINE/INCOMING_ACTIVITY': {
                // If it's an adaptive card, we don't want to store it.
                const { activity } = action.payload;

                if (
                    activity.type === 'message' &&
                    activity.attachments &&
                    activity.attachments.some(
                        (attachment) => attachment.contentType === 'application/vnd.microsoft.card.adaptive',
                    )
                ) {
                    // Skip storing the activity if it's an adaptive card
                    return;
                }

                // Otherwise, proceed with the next middleware or reducer
                return next(action);
            }
            */

            default:
                return next(action);
        }
    };

export default resetMiddleware;
