<template>
  <div class="edit-form">
    <h4><i class="fa fa-book"></i> Thêm truyện</h4>
      <FormAddComic
      :addcomic="addcomic"
      @addcomic-submit="addComic"
      @addcomic-delete="resetComic"
    />
     <p>{{ message }}</p>
  </div>
</template>
<script>
import ListChapterService from "../services/listchapter.service";
import FormAddComic from "../components/FormAddComic";
export default {
  name: "AddComic",
   components: {
    FormAddComic,
  },
  data() {
    return {
      addcomic: {
        name: "",
        url:"",
        author:"",
        type:"",
        content:"",
      },
      message: "",
    };
  },
  methods: {
    initComic() {
      // maybe not...      
    },
    async addComic(data) {
      console.log("input: ", data);
      const [error, response] = await this.handle(
        ListChapterService.create(data)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Thêm thành công.";
        this.$router.push("/homepage");
      }
    },
    resetComic() {
      alert("reset");
    },
  },
  mounted() {
    this.message = "";
    this.initComic();
  },
};
</script>
<style>
.edit-form {
  max-width: 400px;
  margin: auto;
}
</style>
