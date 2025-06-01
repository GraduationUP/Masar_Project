'use client'

import { useEffect, useState } from 'react';

function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/guest/stores')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setStores(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading stores...</p>;
  }

  if (error) {
    return <p>Error loading stores: {error.message}</p>;
  }

  return (
    <div>
      <h1>Stores</h1>
      <ul>
        {stores.map(store => (
          <li key={store.id}>
            {store.name} - {store.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stores;