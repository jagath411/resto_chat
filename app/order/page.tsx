// app/order/page.tsx

"use client";
import { useState, useEffect } from "react";

const menuItems = [
  { name: "Masala Vada", price: 39, image: "/images/masala-vada.jpg" },
  { name: "Chicken", price: 59, image: "/images/chicken.jpg" },
  { name: "Dal Makhani", price: 69, image: "/images/dal_makhani.jpg" },
  {
    name: "Paneer Butter Masala",
    price: 79,
    image: "/images/paneer_butter_masala.jpg",
  },
  { name: "Fish Curry", price: 89, image: "/images/fish_curry.jpg" },
  { name: "Veg Biryani", price: 99, image: "/images/veg_biryani.jpg" },
  { name: "Chicken Biryani", price: 109, image: "/images/chicken_biryani.jpg" },
  { name: "Paneer Tikka", price: 119, image: "/images/paneer_tikka.jpg" },
  { name: "Butter Chicken", price: 129, image: "/images/butter_chicken.jpg" },
  {
    name: "Mutton Rogan Josh",
    price: 139,
    image: "/images/mutton_rogan_josh.jpg",
  },
  { name: "Prawn Curry", price: 149, image: "/images/prawn_curry.jpg" },
  // Add more items...
];

export default function OrderPage() {
  const [orderList, setOrderList] = useState<string[]>([]);
  const [listening, setListening] = useState(false);
  const [liveText, setLiveText] = useState("");
  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;

    setListening(true);
    setLiveText("Listening...");

    recognition.start();
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setLiveText(transcript);

      // When speech is finalized
      if (event.results[0].isFinal) {
        const finalText = transcript.toLowerCase();
        const matchedItem = menuItems.find((item) =>
          finalText.includes(item.name.toLowerCase())
        );

        if (matchedItem) {
          setOrderList((prev) => [...prev, matchedItem.name]);
        } else {
          setOrderList((prev) => [...prev, `❌ Not recognized: ${finalText}`]);
        }

        setListening(false);
        setLiveText("");
      }
    };
    recognition.onerror = () => {
      setListening(false);
      setLiveText("Error recognizing speech");
    };
  };

  return (
    <div className="flex w-full h-full min-h-screen">
      {/* Left Sidebar - Menu */}
      <aside className="w-2/3 bg-white shadow-lg p-6 flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold">Menu</h2>
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="bg-gray-100 rounded-xl p-4 w-full flex items-center gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">₹{item.price}</p>
            </div>
          </div>
        ))}
      </aside>

      {/* Right Panel - Order & Speech */}
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-purple-100 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Order</h1>
          <button
            onClick={handleVoice}
            className="bg-blue-300 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-400 transition"
          >
            {listening ? "Listening..." : "🎙️ Speak to Order"}
          </button>
        </div>

        <div className="grid gap-4">
          {orderList.length > 0 ? (
            orderList.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4 text-lg">
                {item}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No items added yet. Use mic to add.</p>
          )}
        </div>
      </main>
    </div>
  );
}
