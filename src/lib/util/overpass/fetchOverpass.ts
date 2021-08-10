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

  if (!result.ok) {
    const message = `An error has occured: ${result.status}`;
    throw new Error(message);
  }

  return await result.json();
};
