```javascript
import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('your-api-endpoint');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function (optional, but good practice):
    return () => {
      // Cancel any in-flight requests if needed
      // ...
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      {/* Render your data here */}
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default DataFetcher;
```