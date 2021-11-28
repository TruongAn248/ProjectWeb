<template>
  <div class="row">
    <div class="col-md-12">
      <div>
        <div class="shadow-sm p-4 mb-5 bg-light rounded">
          <div class="row">
            <div class="p-4">
              <img class="shadow-lg rounded" v-bind:src="infoViews.url" />
            </div>
            <div class="col-md-8 p-3">
              <h2>{{ infoViews.name }}</h2>
              <div class="row">
                <div class="col-md-8 mt-4">
                  <p>
                    <strong>Tác giả:</strong>
                    {{ infoViews.author }}
                  </p>
                  <p>
                    <strong>Thể loại:</strong>
                    {{ infoViews.type }}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p>{{ infoViews.content }}</p>
            </div>
          </div>

          <FormAddChapter
            v-show="hiden"
            :addchapter="addchapter"
            @addchapter-submit="AddChapter"
          />
          <p>{{ message }}</p>
          <table class="table">
            <thead>
              <tr scope="row">
                <th scope="col"><i class="fa fa-list-ul"></i> Danh sách</th>

                <button
                  v-if="currentUser"
                  class="mt-2 float-right btn btn-sm btn-dark"
                  @click="goToAddChapter"
                >
                  <i class="fa fa-plus-square"></i>
                  Add Chapter
                </button>
              </tr>
            </thead>
            <tbody
              v-for="(chapter, index) in chapterViews"
              :key="chapter.id"
              @click="setActiveChapter(chapter, index)"
            >
              <tr>
                <router-link :to="{ path: '/chap/' + chapter.id }">
                  <th class="text-dark" scope="row">{{ chapter.name }}</th>
                </router-link>
                <td>{{ chapter.createdAt }}</td>
                <td>
                  <button
                    v-show="hiden"
                    class="mt-3 ml-2 btn btn-sm btn-danger"
                    @click="removeChapter(chapter.id)"
                  >
                    <i class="fa fa-times"></i>
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListChapterService from "../services/listchapter.service";
import FormAddChapter from "../components/FormAddChapter";
import AddChapterService from "../services/addchapter.service";
export default {
  name: "InfoView",
  components: {
    FormAddChapter,
  },
  data() {
    return {
      infoViews: [],
      currentInfoId: -1,
      currentInfo: null,
      currentUser: null,
      addchapter: { name: "" },
      hiden: false,
      chapterViews: [],
      message: "",
      currentChapterId: -1,
      currentChapter: null,
    };
  },
  methods: {
    async AddChapter(data) {
      data.infoId = this.currentInfoId;
      const [error, response] = await this.handle(
        AddChapterService.create(data)
      );
      if (error) {
        console.log(error);
        // alert("Error");
      } else {
        // alert("Found Data");
        console.log(response.data);
        this.message = "Thêm thành công.";
        this.$router.go();
      }
    },
    refreshList() {
      this.retrieveInfoChapter();
      this.currentChapter = null;
      this.currentChapterId = -1;
    },
    async removeChapter(Id) {
      const [error, response] = await this.handle(AddChapterService.delete(Id));
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.refreshList();
        this.$router.go();
      }
    },
    setActiveChapter(chapter, index) {
      // console.log(chapter, index);
      this.currentChapter = chapter;
      this.currentChapterId = index;
    },
    setActiveListChapter(infoView, index) {
      this.currentInfoId = index;
      this.currentInfo = infoView;
    },
    async retrieveInfoChapter(currentId) {
      const [error, response] = await this.handle(
        ListChapterService.get(currentId)
      );
      if (error) {
        console.log(error);
        // alert("Error");
      } else {
        // alert("Found Data");
        this.infoViews = response.data;
        console.log(response.data);
      }
    },
    async retrieveListChapter(currentId) {
      const [error, response] = await this.handle(
        AddChapterService.get(currentId)
      );
      if (error) {
        console.log(error);
        // alert("Error");
      } else {
        // alert("Found Data");
        this.chapterViews = response.data;
        console.log(response.data);
      }
    },
    goToAddChapter() {
      if (this.hiden == false) {
        this.hiden = true;
      } else {
        this.hiden = false;
      }
    },
  },
  mounted() {
    (this.currentInfoId = this.$route.params.id),
      this.retrieveInfoChapter(this.currentInfoId);
    this.retrieveListChapter(this.currentInfoId);
    this.currentUser = this.$store.getters.loggedInUser;
    console.log(this.currentUser);
  },
};
</script>



<style>
</style>