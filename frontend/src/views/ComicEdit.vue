<template>
  <div v-if="addcomic" class="edit-form">
    <h4>Hiệu chỉnh Truyện</h4>
    <FormAddComic
      :addcomic="addcomic"
      @addcomic-submit="updateComic"
      @addcomic-delete="deleteComic"
    />
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Không tìm thấy truyện.</p>
  </div>
</template>
<script>
import ListChapterService from "../services/listchapter.service";
import FormAddComic from "../components/FormAddComic";
export default {
  name: "ComicEdit",
  components: {
    FormAddComic,
  },
  data() {
    return {
      addcomic: null,
      message: "",
    };
  },
  methods: {
    async getComic(id) {
      const [error, response] = await this.handle(ListChapterService.get(id));
      if (error) {
        console.log(error);
      } else {
        this.addcomic = response.data;
        console.log(response.data);
      }
    },
    async updateComic(data) {
      const [error, response] = await this.handle(
        ListChapterService.update(this.addcomic.id, data)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Truyện được cập nhật thành công.";
      }
    },
    async deleteComic() {
      const [error, response] = await this.handle(
        ListChapterService.delete(this.addcomic.id)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.$router.push({ name: "HomePage" });
      }
    },
  },
  mounted() {
    this.message = "";
    this.getComic(this.$route.params.id);
  },
};
</script>