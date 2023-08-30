import React, { useEffect, useState } from "react";
import { collection, orderBy, query, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../Spinner";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useNavigate } from "react-router-dom";

export default function Slidding() {
  const navigate = useNavigate();
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchListings();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <Splide
        options={{
          type: "fade",
          autoplay: true,
          interval: 3000,
          perPage: 1,
          pagination: true,
          arrows: true,
        }}
      >
        {listings.map(({ data, id }) => (
          <SplideSlide
            key={id}
            onClick={() => navigate(`/category/${data.type}/${id}`)}
          >
            <div
              style={{
                background: `url(${data.imgUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="w-full h-[300px] overflow-hidden"
            ></div>
            <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-red-500 shadow-lg opacity-90 p-2 rounded-br-3xl">
              {data.name}
            </p>
            <p className="text-[#f1faee] absolute left-1 bottom-1 font-medium max-w-[90%] bg-red-500 shadow-lg opacity-90 p-2 rounded-br-3xl">
              ${data.discountedPrice ?? data.regularPrice}
              {data.type === "rent" && " / month"}
            </p>
          </SplideSlide>
        ))}
      </Splide>
    )
  );
}
