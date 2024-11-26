import MenuCloseIcon from './icons/MenuCloseIcon';

function ConversationHistorySidebar({ oldConversations, closeSidebar, resumeConversation, authToken }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2 className="sidebar-title">Conversazioni</h2>
                <div className="main-buttons">
                    <button className="sidebar-btn" onClick={closeSidebar}>
                        <MenuCloseIcon />
                    </button>
                </div>
            </div>
            <div className="buttons">
                {!!oldConversations.length &&
                    oldConversations.map((oldConversation) => (
                        <button
                            className="sidebar-btn"
                            key={oldConversation.id}
                            onClick={() => resumeConversation(oldConversation.id, authToken)}
                        >
                            {oldConversation?.title?.substring(0, 40) + ' ...'}
                        </button>
                    ))}
            </div>
        </aside>
    );
}

export default ConversationHistorySidebar;
