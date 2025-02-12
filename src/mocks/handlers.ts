import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.chucknorris.io/jokes/random', () => {
    return HttpResponse.json({
      id: '1',
      value: 'Test joke',
      categories: [],
      created_at: '2020-01-05',
      updated_at: '2020-01-05',
      url: 'https://api.chucknorris.io/jokes/1'
    })
  }),
  // Add other API endpoints
] 