<template>
    <Form 
    @submit="$emit('addcomic-submit', addcomicLocal)"
    :validation-schema="schema"
  >
    <div class="form-group">
      <label for="name">Tên</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="addcomicLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
   <div class="form-group">
      <label for="url">hình ảnh truyện</label>
      <Field
        name="url"
        type="text"
        class="form-control"
        v-model="addcomicLocal.url"
      />
      <ErrorMessage name="url" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="author">Tên tác giả</label>
      <Field
        name="author"
        type="text"
        class="form-control"
        v-model="addcomicLocal.author"
      />
      <ErrorMessage name="author" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="type">Thể loại</label>
      <Field
        name="type"
        type="text"
        class="form-control"
        v-model="addcomicLocal.type"
      />
      <ErrorMessage name="type" class="error-feedback" />
    </div>
    
    <div class="form-group">
      <label for="content">Nội dung truyện</label>
      <Field
        name="content"
        type="text"
        class="form-control"
        v-model="addcomicLocal.content"
      />
      <ErrorMessage name="content" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-dark"><i class="fa fa-upload"></i> Đăng tải </button>
      <button
        v-if="addcomicLocal.id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="$emit('addcomic-delete', addcomicLocal.id)"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "FromAddComic",
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  emits: ["addcomic-submit","addcomic-delete"],
  props: ["addcomic"],
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()   
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
    });
    return {
      schema,
      addcomicLocal: this.addcomic,
    };
  },
};
</script>