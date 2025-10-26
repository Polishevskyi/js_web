import 'dotenv/config';
import { HEADERS } from './constants.js';

class HttpClient {
  constructor(requestContext) {
    this.requestContext = requestContext;
    this.baseURL = process.env.API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': HEADERS.CONTENT_TYPE,
      Accept: HEADERS.ACCEPT,
    };
  }

  async get(url, config = {}) {
    const response = await this.requestContext.get(`${this.baseURL}${url}`, {
      headers: { ...this.defaultHeaders, ...config.headers },
      params: config.params,
    });

    return {
      data: await response.json(),
      status: response.status(),
      headers: response.headers(),
    };
  }

  async post(url, data, config = {}) {
    const response = await this.requestContext.post(`${this.baseURL}${url}`, {
      headers: { ...this.defaultHeaders, ...config.headers },
      data,
    });

    return {
      data: await response.json(),
      status: response.status(),
      headers: response.headers(),
    };
  }

  async put(url, data, config = {}) {
    const response = await this.requestContext.put(`${this.baseURL}${url}`, {
      headers: { ...this.defaultHeaders, ...config.headers },
      data,
    });

    return {
      data: await response.json(),
      status: response.status(),
      headers: response.headers(),
    };
  }

  async delete(url, config = {}) {
    const response = await this.requestContext.delete(`${this.baseURL}${url}`, {
      headers: { ...this.defaultHeaders, ...config.headers },
    });

    let data = null;
    const status = response.status();

    if (status !== 204) {
      const text = await response.text();
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      }
    }

    return {
      data,
      status,
      headers: response.headers(),
    };
  }
}

export default HttpClient;
