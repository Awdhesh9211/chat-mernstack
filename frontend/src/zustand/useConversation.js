import { create } from "zustand";
const useConversation = create((set) => ({
	// selected conversation state
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

	// selected message state
	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;
