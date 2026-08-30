export async function fetchDataForParam(url, method, nameParam, valueParam) {
  const resp = await fetch(`${url}?${nameParam}=${valueParam}`, {
    method: method
  })
  const json = await resp.json();
  return json;
}

