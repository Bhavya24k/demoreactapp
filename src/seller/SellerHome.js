import React, { useEffect, useState } from 'react';
import config from '../config'
export default function SellerHome() {
  const [sellerData, setSellerData] = useState("");

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData)
    }
  }, []);

  return (
    <div>
      {sellerData && (
        <div>
          <h4><center>Welcome {sellerData.ownername}</center></h4>
        </div>
      )}
    </div>
  );
}