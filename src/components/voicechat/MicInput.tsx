import React, { useState } from "react";
import { toast } from "sonner";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function MicInput() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [reply, setReply] = useState("");

  const startListening = () => {
    if (!SpeechRecognition) {
      toast.error("⚠️ Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      toast("🎙️ Listening...");
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      setListening(false);
      toast.loading("🤖 AI is thinking...");
      setReply("This is a placeholder AI response.");
    };

    recognition.onerror = (event) => {
      toast.error("Recognition error: " + event.error);
    };

    recognition.start();
  };

  return (
    <div className="p-4 space-y-4">
      <button onClick={startListening} className="px-4 py-2 bg-blue-600 text-white rounded">🎤 Start Talking</button>
      <div><strong>You:</strong> {text}</div>
      <div><strong>AI:</strong> {reply}</div>
    </div>
  );
}
