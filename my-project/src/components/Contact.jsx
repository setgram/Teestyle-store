import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("could not get landlord data");
      }
    }
    getLandlord();
  }, [userRef]);

  function onChange(e) {
    setMessage(e.target.value);
  }

  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full">
          <p className="mt-6">
            Contact {landlord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              rows={2}
              value={message}
              onChange={onChange}
              className="mb-6 w-full px-4 py-2 text-2xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:text-gray-700 focus:bg-white focus:border-gray-600 "
            />
          </div>
          <a
            href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message} `}
          >
            <button
              type="button"
              className="px-7 py-3 bg-blue-600 rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center text-white"
            >
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
}
