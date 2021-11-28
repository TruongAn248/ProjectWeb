import http from "../common/http";
import store from "../store";

class AddChapterService {

  constructor() {
    http.interceptors.request.use(config => {
      const user = store.getters.loggedInUser;
      if (user && user.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
  }

  get(id) { return http.get(`/chapter/s/${id}`); }
  create(data) { return http.post("/chapter", data); }
  delete(id) { return http.delete(`/chapter/s/${id}`); }
}

export default new AddChapterService();