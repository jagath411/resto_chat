// app/order/page.tsx

"use client";
import { useState, useEffect } from "react";

const menuItems = [
  {
    name: "Masala Vada",
    price: 39,
    image: "/images/masala-vada.jpg",
    category: "Snacks",
  },
  {
    name: "Chicken",
    price: 59,
    image: "/images/chicken.jpg",
    category: "Main Course",
  },
  {
    name: "Dal Makhani",
    price: 69,
    image: "/images/dal_makhani.jpg",
    category: "Main Course",
  },
  {
    name: "Mutton Briyani",
    price: 79,
    image: "/images/mutton-briyani.jpg",
    category: "Main Course",
  },
  {
    name: "Butter Chicken",
    price: 89,
    image: "/images/butter_chicken.jpg",
    category: "Main Course",
  },
  {
    name: "Veg Biryani",
    price: 99,
    image: "/images/veg_biryani.jpg",
    category: "Biryani",
  },
  {
    name: "Chicken Briyani",
    price: 109,
    image: "/images/chicken_briyani.jpg",
    category: "Biryani",
  },
  {
    name: "Paneer Tikka",
    price: 119,
    image: "/images/paneer_tikka.jpg",
    category: "Snacks",
  },
  {
    name: "Lamb Rogan Josh",
    price: 139,
    image: "/images/lamb_rogan_josh.jpg",
    category: "Main Course",
  },
  {
    name: "Egg Briyani",
    price: 100,
    image: "/images/egg_briyani.jpg",
    category: "Main Course",
  },
];

export default function OrderPage() {
  const [orderList, setOrderList] = useState<
    { name: string; quantity: number; image: string }[]
  >([]);

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
    recognition.continuous = true;
    // recognition.maxAlternatives = 1;
    // recognition.onstart = () => {
    //   console.log("Voice recognition started");
    // };
    setListening(false);
    setLiveText("Listening...");

    recognition.start();
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setLiveText(transcript);

      // When speech is finalized
      // if (event.results[0].isFinal) {
      //   const finalText = transcript.toLowerCase();
      //   const matchedItem = menuItems.find((item) =>
      //     finalText.includes(item.name.toLowerCase())
      //   );

      //   if (matchedItem) {
      //     setOrderList((prev) => [...prev, matchedItem.name]);
      //   } else {
      //     setOrderList((prev) => [...prev, `❌ Not recognized: ${finalText}`]);
      //   }

      //   if (matchedItem) {
      //     const updatedOrder = [...orderList, matchedItem.name];
      //     setOrderList(updatedOrder);

      //     // Save to backend
      //     fetch("http://localhost:5000/api/orders/add", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({ items: updatedOrder }),
      //     }).catch((err) => {
      //       console.error("Failed to save order", err);
      //     });
      //   }

      //   setListening(false);
      //   setLiveText("");
      // }
      // if (event.results[0].isFinal) {
      //   const finalText = transcript.toLowerCase();
      //   const matchedItem = menuItems.find((item) =>
      //     finalText.includes(item.name.toLowerCase())
      //   );

      //   if (matchedItem) {
      //     // Check if item already in orderList
      //     const existingItem = orderList.find(
      //       (i) => i.name === matchedItem.name
      //     );
      //     let updatedOrder;

      //     if (existingItem) {
      //       // Increase quantity
      //       updatedOrder = orderList.map((i) =>
      //         i.name === matchedItem.name
      //           ? { ...i, quantity: i.quantity + 1 }
      //           : i
      //       );
      //     } else {
      //       // Add new item
      //       updatedOrder = [
      //         ...orderList,
      //         { name: matchedItem.name, quantity: 1, image: matchedItem.image },
      //       ];
      //     }

      //     setOrderList(updatedOrder);

      //     // Save to backend
      //     fetch("http://localhost:5000/api/orders/add", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({ items: updatedOrder }),
      //     }).catch((err) => {
      //       console.error("Failed to save order", err);
      //     });
      //   } else {
      //     // setOrderList((prev) => [
      //     //   ...prev,
      //     //   { name: `❌ Not recognized: ${finalText}`, quantity: 1, image: "" },
      //     // ]);
      //     alert("Item not recognized. Please try again.");
      //   }

      //   setListening(false);
      //   setLiveText("");
      // }

      if (event.results[0].isFinal) {
        const finalText = transcript.toLowerCase();

        // Try to extract quantity (e.g., "3 masala vada" => quantity = 3)
        const quantityMatch = finalText.match(/\b(\d+)\b/); // matches number in text
        const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;

        // Remove the quantity word from finalText (so item matching is cleaner)
        // const cleanedText = finalText.replace(/\b\d+\b/, "").trim();

        // Find item that matches
        console.log(quantity);
        console.log(finalText);
        const matchedItem = menuItems.find((item) =>
          finalText.includes(item.name.toLowerCase())
        );

        if (matchedItem) {
          const existingItem = orderList.find(
            (i) => i.name === matchedItem.name
          );

          let updatedOrder;

          if (existingItem) {
            updatedOrder = orderList.map((i) =>
              i.name === matchedItem.name
                ? { ...i, quantity: i.quantity + quantity }
                : i
            );
          } else {
            updatedOrder = [
              ...orderList,
              {
                name: matchedItem.name,
                quantity: quantity,
                image: matchedItem.image,
              },
            ];
          }

          setOrderList(updatedOrder);

          // Save to backend
          fetch("http://localhost:5000/api/orders/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: updatedOrder }),
          }).catch((err) => {
            console.error("Failed to save order", err);
          });
        } else {
          alert("Item not recognized. Please try again.");
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
      {/* <aside className="w-[70%] bg-white shadow-lg p-6 flex flex-col items-center gap-4">
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
      </aside> */}

      <aside className="w-10/12 bg-white shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Menu</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="bg-gray-100 rounded-xl p-4 flex items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Right Panel - Order & Speech */}
      <main className=" w-4/12 flex-1 bg-gradient-to-br from-blue-50 to-purple-100 p-10">
        <h1 className="text-4xl font-bold">Your Order</h1>
        <div className="flex min-w-lg justify-between items-center mb-8">
          <div className="flex flex-col items-end">
            <button
              onClick={handleVoice}
              className="bg-blue-400 text-white px-6 py-2 m-4 rounded-lg flex items-center gap-2 hover:bg-blue-500 transition"
            >
              {listening ? "🎙️ Listening..." : "🎙️ Speak to Order"}
            </button>

            {/* Live transcript shown here */}
            {liveText && (
              <div className="m-2 text-sm bg-white p-2 rounded shadow text-gray-700 max-w-xs">
                <strong>Heard:</strong> {liveText}
              </div>
            )}
            <div className="bg-white rounded-xl shadow-lg p-6 w-full">
              <h2 className="text-xl font-semibold mb-4">Cart</h2>
              {orderList.length > 0 ? (
                <ul className="space-y-8">
                  {orderList.map((item, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-100 p-3 rounded flex items-center gap-4"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      )}
                      <div className="flex-3">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center mt-1">
                          <button
                            onClick={() =>
                              setOrderList((prev) =>
                                prev
                                  .map((i) =>
                                    i.name === item.name
                                      ? { ...i, quantity: i.quantity - 1 }
                                      : i
                                  )
                                  .filter((i) => i.quantity > 0)
                              )
                            }
                            className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-lg font-bold text-red-600"
                          >
                            −
                          </button>
                          <span className="mx-3 text-sm text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              setOrderList((prev) =>
                                prev.map((i) =>
                                  i.name === item.name
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                                )
                              )
                            }
                            className="px-2 py-1 rounded bg-green-100 hover:bg-green-200 text-lg font-bold text-green-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  Your cart is empty. Speak to add items.
                </p>
              )}
            </div>
            {/* 
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Cart</h2>
              {orderList.length > 0 ? (
                <ul className="space-y-3">
                  {orderList.map((item, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-100 p-3 rounded flex items-center gap-4"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setOrderList((prev) =>
                            prev
                              .map((i) =>
                                i.name === item.name
                                  ? { ...i, quantity: i.quantity - 1 }
                                  : i
                              )
                              .filter((i) => i.quantity > 0)
                          )
                        }
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ❌ Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  Your cart is empty. Speak to add items.
                </p>
              )}
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}
