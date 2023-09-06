<template>
  <div>
    <h1 class="title">Update Message</h1>
    <form enctype="multipart/form-data" @submit.prevent="updateBook">
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
          <button class="button is-primary">Update</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditForm",
  data() {
    return {
      email: "",
      name: "",
      content: "",
    };
  },
  created() {
    this.getMessageById();
  },
  methods: {
    async getMessageById() {
      try {
        const response = await axios.get(`messages/${this.$route.params.id}`);
        (this.email = response.data.users.email),
          (this.name = response.data.users.name),
          (this.content = response.data.content);
      } catch (error) {
        console.log(error);
      }
    },
    async updateBook() {
      try {
        let formData = new FormData();
        formData.append("email", this.email);
        formData.append("name", this.name);
        formData.append("content", this.content);

        await axios.post(`messages/update/${this.$route.params.id}`, formData);
        (this.email = ""),
          (this.name = ""),
          (this.content = ""),
          this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
