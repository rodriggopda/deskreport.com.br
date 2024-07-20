const apiBase = 'http://localhost:3000'

enum http {
  POST = 'POST',
  GET = 'GET'
}

const apiInit: RequestInit = {
  headers: {
    'Content-Type': 'Application/json'
  }
}

export const api = {
  get: (uri: string) => {
    return fetch(apiBase + uri, {
      ...apiInit,
      method: http.GET
    })
      .then(async (response) => await response.json())
      .then((data) => data);
  },
  post: (uri: string, body?: any) => {
    return fetch(apiBase + uri, {
      ...apiInit,
      method: http.POST,
      body: JSON.stringify(body)
    })
  }
}