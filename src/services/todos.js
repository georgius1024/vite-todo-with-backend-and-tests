import axios from "axios";
const defaultUrl = 'https://jsonplaceholder.typicode.com'
export default function Todos(baseUrl = defaultUrl) {
  this.baseUrl = `${baseUrl}/todos`;
  this.url = function (id = null) {
    if (id) {
      return `${this.baseUrl}/${id}`;
    }
    return this.baseUrl;
  };
  this.request = function (url, method = "get", payload = null) {
    return axios[method](url, payload);
  };
  this.index = function () {
    return this.request(this.url());
  };
  this.show = function (id) {
    return this.request(this.url(id));
  };
  this.create = function (payload) {
    return this.request(this.url(), "post", payload);
  };
  this.update = function (id, payload) {
    return this.request(this.url(id), "put", payload);
  };
  this.destroy = function (id) {
    return this.request(this.url(id), "delete");
  };
}
