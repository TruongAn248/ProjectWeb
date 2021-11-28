<template>
  <div class="row">
    <div class="col-md-12">
      <button
        v-if="currentUser"
        class="mb-3 ml-2 float-right btn btn-sm btn-dark"
        @click="goToAddImgChapter"
      >
        <i class="fa fa-cog"></i>
        Tùy Chỉnh
      </button>

      <FormAddImg
        v-show="hiden"
        :addimgchapter="addimgchapter"
        @addimgchapter-submit="AddImg"
      />
      <p>{{ message }}</p>

      <div
        class="col-md-11 ml-5"
        v-for="(imgchapter, index) in imgchapters"
        :key="imgchapter.id"
        @click="setActiveImgChapter(imgchapter, index)"
      >
        <div>
          <button
            v-show="hiden"
            class="mt-3 ml-2 btn btn-sm btn-danger"
            @click="removeImg(imgchapter.id)"
          >
            Xóa ảnh
          </button>
          <img v-bind:src="imgchapter.img" class="img-fluid w-100" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddChapterService from "../services/addchapter.service";
import AddImgChapterService from "../services/addimg.service";
import FormAddImg from "../components/FormAddImg";
export default {
  name: "ChapterView",
  components: {
    FormAddImg,
  },
  data() {
    return {
      chapters: [],
      currentChapterId: -1,
      currentChapter: null,
      currentUser: null,
      addimgchapter: { img: "" },
      hiden: false,
      imgchapters: [],
      currentImgId: -1,
      currentImg: null,
      message: "",
    };
  },
  methods: {
    async AddImg(data) {
      data.ChapterId = this.currentChapterId;
      console.log(data);
      const [error, response] = await this.handle(
        AddImgChapterService.create(data)
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
      this.retrieveImgChapter();
      this.currentImg = null;
      this.currentImgId = -1;
    },
    async removeImg(Id) {
      const [error, response] = await this.handle(
        AddImgChapterService.delete(Id)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.refreshList();
        this.$router.go();
      }
    },

    setActiveImgChapter(imgchapter, index) {
      console.log(imgchapter, index);
    },
    setActiveInfoChapter(chapterView, index) {
      this.currentChapterId = index;
      this.currentChapter = chapterView;
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
        this.chapters = response.data;
        console.log(response.data);
      }
    },
    async retrieveImgChapter(currentId) {
      const [error, response] = await this.handle(
        AddImgChapterService.get(currentId)
      );
      if (error) {
        console.log(error);
        // alert("Error");
      } else {
        // alert("Found Data");
        this.imgchapters = response.data;
        console.log(response.data);
      }
    },
    goToAddImgChapter() {
      if (this.hiden == false) {
        this.hiden = true;
      } else {
        this.hiden = false;
      }
    },
  },
  mounted() {
    (this.currentChapterId = this.$route.params.id),
      this.retrieveListChapter(this.currentChapterId);
    this.retrieveImgChapter(this.currentChapterId);
    this.currentUser = this.$store.getters.loggedInUser;
  },
};
</script>



<style>
</style>