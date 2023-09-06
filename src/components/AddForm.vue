<template>
  <div>
    <h1 class="title">Add New Message</h1>
    <form enctype="multipart/form-data" @submit.prevent="saveMessage">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            type="text"
            v-model="email"
            class="input"
            placeholder="Email"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input type="text" v-model="name" class="input" placeholder="Name" />
        </div>
      </div>
      <div class="field">
        <label class="label">Content</label>
        <div class="control">
          <input
            type="text"
            v-model="content"
            class="input"
            placeholder="Content"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddForm",

  data() {
    return {
      title: "",
      author: "",
      description: "",
      selectedFile: null,
    };
  },
  methods: {
    async saveMessage() {
      try {
        let formData = new FormData();
        formData.append("email", this.email);
        formData.append("name", this.name);
        formData.append("content", this.content);
        formData.append("poster_image", this.selectedFile);

        await axios.post("messages/", formData);
        (this.title = ""), (this.author = ""), this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
