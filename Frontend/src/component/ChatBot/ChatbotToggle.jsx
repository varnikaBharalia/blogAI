
/*
🔧 Overview of Features to Implement
Chatbot Avatar (robot image) – clickable to open chat window.
Chat Window UI – displays suggestions like "Summarize blog", "Explain key concepts", etc.
OpenAI API integration – fetch response based on blog content + comments.
Backend API – securely call OpenAI API using blog ID to fetch blog and comments from DB.
Frontend to Backend flow – passes prompts and displays replies dynamically.
*/
const botIcon = "/image/ChatBot.jpg";

const ChatbotToggle = ({ onClick }) => (
  <div
    onClick={onClick}
    className="fixed bottom-6 right-6 cursor-pointer z-50 animate-buzz-once"
    title="Ask AI"
  >
    <img src={botIcon} alt="Chatbot" className="w-16 h-16" />
  </div>
);

export default ChatbotToggle;

