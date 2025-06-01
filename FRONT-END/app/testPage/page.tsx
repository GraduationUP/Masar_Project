'use client';
import React, { useEffect, useState } from 'react';

function FetchData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/register')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(actualData => {
        setData(actualData);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []); 

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  if (data) {
    return (
      <div>
        <h1>Data from Backend:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  return null;
}

export default FetchData;