import {useChatStore} from "../store/useChatStore.js";
import {useEffect} from "react";
import ChatHeader from "../components/ChatHeader.jsx";
import MessageInput from "../components/MessageInput.jsx";
import MessageSkeleton from "../components/skeleton/MessageSkeleton.jsx";

const ChatContainer = () => {
    const {messages, getMessages, selectedUser, isMessagesLoading} = useChatStore();

    useEffect(() => {
        getMessages(selectedUser._id);
    },[selectedUser._id, getMessages]);

    if(isMessagesLoading) return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    )

    return (
    <div className=" flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <p>messages...</p>

        <MessageInput />
    </div>
    );
};

export default ChatContainer;