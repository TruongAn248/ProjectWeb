<template>
    <Form 
    @submit="$emit('addchapter-submit', addchapterLocal)"
    :validation-schema="schema"
  >
    <div class="form-group">
      <label for="name">Tên</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="addchapterLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
   

    <div class="form-group">
      <button class="btn btn-dark">Lưu</button>
      
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "FromAddChapter",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["addchapter-submit"],
  props: ["addchapter"],
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()   
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
    });
    return {
      schema,
      addchapterLocal: this.addchapter,
    };
  },
};
</script>