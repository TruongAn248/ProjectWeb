<template>
    <Form 
    @submit="$emit('addimgchapter-submit', addimgchapterLocal)"
    :validation-schema="schema"
  >
    <div class="form-group">
      <label for="img">Ảnh</label>
      <Field
        name="img"
        type="text"
        class="form-control"
        v-model="addimgchapterLocal.img"
      />
      <ErrorMessage name="img" class="error-feedback" />
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
  name: "FromAddImg",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["addimgchapter-submit"],
  props: ["addimgchapter"],
  data() {
    const schema = yup.object().shape({
      img: yup
        .string(),
    });
    return {
      schema,
      addimgchapterLocal: this.addimgchapter,
    };
  },
};
</script>

