export default async (query) => {
  const result = await fetch(
    'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query),
    {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return await result.json();
};
