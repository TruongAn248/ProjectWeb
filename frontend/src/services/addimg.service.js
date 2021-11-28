import http from "../common/http";
import store from "../store";

class AddImgChapterService {

  constructor() {
    http.interceptors.request.use(config => {
      const user = store.getters.loggedInUser;
      if (user && user.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
  }
  getAll() { return http.get("/addimgchapter"); }
  get(id) { return http.get(`/addimgchapter/chapterid/${id}`); }
  create(data) { return http.post("/addimgchapter", data); }
  delete(id) { return http.delete(`/addimgchapter/chapterid/${id}`); }
}

export default new AddImgChapterService();