<template>
  <div class="row">
    <div class="col-md-12 mb-3 input-group">
      <input
        type="text"
        class="form-control shadow-lg bg-white rounded"
        placeholder="Tìm theo tên"
        v-model="nameToSearch"
      />
      <div class="input-group-append">
        <button
          class="shadow-lg bg-white rounded btn btn-outline-secondary"
          type="button"
          @click="searchName"
        >
          <i class="fa fa-search"></i>
          Tìm kiếm
        </button>
      </div>
    </div>

    <div>
      <button
        v-if="currentUser"
        class="md-3 mb-3 btn btn-sm btn-dark"
        @click="goToAddComic"
      >
        <i class="fa fa-plus-square"></i>
        Thêm Truyện
      </button>
    </div>

    <div class="col-md-12">
      <div class="row">
        <div
          class="col-md-3 mb-2"
          v-for="(infoView, index) in infoViews"
          :key="infoView.id"
          @click="setActiveInfoChapter(infoView, index)"
        >
          <div class="card border-dark" style="width: 17rem">
            <router-link :to="{ path: '/info/' + infoView.id }">
              <img v-bind:src="infoView.url" class="rounded card-img-top" />
            </router-link>
            <div class="card-body">
              <router-link :to="{ path: '/info/' + infoView.id }">
                <h5 class="card-title text-info">{{ infoView.name }}</h5>
              </router-link>
              <p
                class="card-text d-inline-block text-truncate"
                style="max-width: 230px"
              >
                Thể Loại: {{ infoView.type }}
              </p>
            </div>
            <div v-if="currentInfo">
              <router-link :to="'/comic/' + currentInfo.id">
                <span
                  v-if="currentUser"
                  class="mb-2 ml-2 p-2 badge badge-warning"
                >
                  <i class="fa fa-wrench"></i>
                  Hiệu chỉnh</span
                >
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListChapterService from "../services/listchapter.service";

export default {
  name: "InfoView",

  data() {
    return {
      infoViews: [],
      currentInfoId: -1,
      currentInfo: null,
      currentUser: null,
      nameToSearch: "",
    };
  },
  methods: {
    setActiveInfoChapter(infoView, index) {
      this.currentInfoId = index;
      this.currentInfo = infoView;
    },
    async searchName() {
      const [error, response] = await this.handle(
        ListChapterService.findByName(this.nameToSearch)
      );
      if (error) {
        console.log(error);
      } else {
        this.infoViews = response.data;
        this.setActiveInfoChapter(null);
        console.log(response.data);
      }
    },
    async retrieveInfoChapter() {
      const [error, response] = await this.handle(ListChapterService.getAll());
      if (error) {
        console.log(error);
        // alert("Error");
      } else {
        // alert("Found Data");
        this.infoViews = response.data;
        console.log(response.data);
      }
    },
    goToAddComic() {
      this.$router.push("/addcomic");
    },
  },
  mounted() {
    this.retrieveInfoChapter();
    this.currentUser = this.$store.getters.loggedInUser;
  },
};
</script>