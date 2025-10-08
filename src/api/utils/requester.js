const HttpClient = require('./httpClient');
const { endpoints } = require('./endpoints');

class Requester {
  constructor(requestContext) {
    this.httpClient = new HttpClient(requestContext);
  }

  async request(endpointKey, { data = null, config = {}, pathParams = {} } = {}) {
    const endpoint = endpoints[endpointKey];

    if (!endpoint) {
      throw new Error(`Endpoint "${endpointKey}" not found`);
    }

    const { url: endpointUrl, method = 'post', responseModel } = endpoint;
    let url = endpointUrl;

    if (typeof url === 'function') {
      url = url(...Object.values(pathParams));
    }

    const requestData = data?.toJson ? data.toJson() : data;
    const httpMethod = method.toLowerCase();

    let response;

    if (httpMethod === 'get') {
      response = await this.httpClient.get(url, { params: requestData, ...config });
    } else if (httpMethod === 'delete') {
      response = await this.httpClient.delete(url, config);
    } else if (httpMethod === 'post' || httpMethod === 'put') {
      response = await this.httpClient[httpMethod](url, requestData, config);
    } else {
      response = await this.httpClient[httpMethod](url, requestData, config);
    }

    const responseData = responseModel
      ? this.instantiateModel(responseModel, response.data)
      : response.data;

    return {
      data: responseData,
      status: response.status,
      headers: response.headers,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  instantiateModel(ModelClass, data) {
    if (typeof ModelClass.fromJson === 'function') {
      return ModelClass.fromJson(data);
    }
    return new ModelClass(data);
  }
}

module.exports = Requester;
