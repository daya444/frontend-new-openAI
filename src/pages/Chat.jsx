import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatItems from "../components/chat/chat-Items";
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicators";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Chat = () => {
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState([]);
  const auth = useAuth();
  const inputRef = useRef(null);

  const handleSubmit = async () => {
    const content = inputRef.current.value;
    if (!content) return; // Prevent empty submissions
    if (inputRef && inputRef?.current) {
      inputRef.current.value = "";
    }

    const newMessage = {
      role: "user",
      content: content,
    };
    setChatMessages([...chatMessages, newMessage]);

    // Send message to the server
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats Deleted Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  // Handle key press event
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex m-3 w-full h-full gap-3 p-4 overflow-hidden">
      {/* Left Sidebar */}
      <div className="hidden sm:hidden md:flex flex-[0.2] flex-col">
        <div className="flex w-full h-[60vh] bg-[#111d27] rounded-2xl flex-col mx-3">
          {/* Avatar */}
          <div className="mx-auto my-2 bg-white text-black font-bold rounded-full w-16 h-16 flex items-center justify-center">
            <img src="user.png" alt="user" />
          </div>

          {/* Chatbot description */}
          <div className="mx-auto font-sans">You are talking to a ChatBOT</div>

          <div className="mx-auto font-sans my-4 p-3 text-center">
            You can ask some questions related to Knowledge, Business, Advice, Education, etc. But avoid sharing personal information.
          </div>

          {/* Clear conversation button */}
          <button
            onClick={handleDeleteChats}
            className="w-[250px] py-3 my-auto text-white font-extrabold rounded-lg mx-auto bg-blue-600 hover:bg-blue-400"
          >
            Clear Conversation
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col md:flex-[0.8] sm:flex-1 xs:flex-1 px-3">
        {/* Title for Larger Screens */}
        <h1 className="text-4xl text-white mb-2 mx-auto font-semibold hidden md:block">
          Model - GPT 3.5 Turbo
        </h1>

        {/* Title and Clear Conversation Button for Small Screens */}
        <div className="md:hidden flex justify-between items-center mb-2">
          <h1 className="text-2xl text-white font-semibold">GPT 3.5</h1>
          <button
            onClick={handleDeleteChats}
            className="w-full max-w-[120px] py-2 text-white font-extrabold rounded-lg bg-blue-600 hover:bg-blue-400"
          >
            Clear
          </button>
        </div>

        {/* Chat Messages Container */}
        <div className="w-full h-[60vh] rounded-lg mx-auto flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {chatMessages.map((chat, index) => (
            <ChatItems content={chat.content} role={chat.role} key={index} />
          ))}
        </div>

        {/* Input Field & Send Button */}
        <div className="w-full rounded-lg bg-[#111b27] flex mx-auto mt-4">
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent p-7 border-none outline-none text-white text-lg"
            onKeyPress={handleKeyPress} // Add the key press event handler
          />
          <button className="text-white mx-2" onClick={handleSubmit}>
            <IoMdSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
