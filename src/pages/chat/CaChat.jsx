import React, { useEffect, useState } from "react";
import CALayout from "../../components/Layout";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { useParams } from "react-router-dom";

const CaChat = () => {
  const { caseId } = useParams();

  console.log(caseId);
  

  const caStore = JSON.parse(localStorage.getItem("legalhubCA"));
  const ca = caStore?.ca;  // IMPORTANT FIX

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Load real-time chat
  useEffect(() => {
    const q = query(
      collection(db, "chats", caseId, "messages"),
      orderBy("timestamp", "asc")
    );

    return onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => d.data()));
    });
  }, [caseId]);

  // Send message
  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "chats", caseId, "messages"), {
      sender: "ca",
      text,
      timestamp: serverTimestamp(),
      caId: ca?._id,
      caName: ca?.name
    });

    setText("");
  };

  return (
    <CALayout>
      <h2>Chat With User</h2>

      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </CALayout>
  );
};

export default CaChat;
