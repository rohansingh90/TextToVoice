import React, { useEffect, useState } from 'react';
import useClipboard from "react-use-clipboard";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Texttovoice = () => {
  const [text, setText] = useState(() => {
    return localStorage.getItem('transcript') || " ";
  });

  const [isCopied, setCopied] = useClipboard(text); // Set up copy functionality

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      localStorage.setItem("transcript", transcript);
      setText(transcript);
    }
  }, [transcript]);

  const handleCopy = () => {
    setCopied();
  };

  const clearAll = () => {
    resetTranscript();
    setText('');
    localStorage.removeItem("transcript");
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser does not support speech recognition.</p>;
  }

  return (
    <div className="w-full px-4 md:px-0">
      <h1 className="pt-5 text-4xl md:text-5xl text-white text-center">
        Voice To Text Converter
      </h1>

      {/* Responsive text box */}
      <div className="max-w-full md:w-[700px] bg-gray-300 h-[300px] md:h-[400px] overflow-y-auto m-5 md:m-10 text-xl md:text-2xl p-6 md:p-10 rounded-lg shadow-lg">
        {transcript || text} {/* Display transcript or saved text */}
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
        <button onClick={handleCopy} className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md transform hover:scale-105">
          Copy
        </button>

        <button onClick={startListening} className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out shadow-md transform hover:scale-105">
          Listen
        </button>

        <button onClick={stopListening} className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-md transform hover:scale-105">
          Stop Listen
        </button>

        <button onClick={clearAll} className="bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out shadow-md transform hover:scale-105">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Texttovoice;
