<template>
  <div>
    <h1 class="title">Message List</h1>
    <router-link :to="{ name: 'AddMessage' }" class="button is-primary"
      >Add New</router-link
    >

    <!-- Input pencarian -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        @input="searchMessages"
        placeholder="Search..."
      />
    </div>

    <!-- Tabel pesan -->
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="20"
    >
      <table
        class="table is-striped is-fullwidth"
        :class="{ 'is-mobile': isMobile }"
      >
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody v-if="messages.length > 0">
          <tr v-for="message in messages" :key="message.id">
            <td>{{ message.users.email }}</td>
            <td>{{ message.users.name }}</td>
            <td>{{ message.content }}</td>
            <td>
              <router-link
                :to="{ name: 'EditMessage', params: { id: message.id } }"
                class="button is-info is-small"
                >Edit</router-link
              >
              <button
                class="button is-danger is-small"
                @click="deleteMessages(message.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4">No messages available.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import InfiniteScroll from "vue-infinite-scroll";

export default {
  name: "Message",
  data() {
    return {
      messages: [],
      isMobile: false,
      loading: false,
      page: 1,
      searchQuery: "",
    };
  },
  directives: {
    InfiniteScroll,
  },
  created() {
    this.getMessages();
    this.isMobile = window.innerWidth <= 768;
  },
  methods: {
    async getMessages() {
      try {
        const response = await axios.get("messages");
        this.messages = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteMessages(id) {
      try {
        await axios.delete(`messages/${id}`);
        this.getMessages();
      } catch (error) {
        console.error(error);
      }
    },
    async loadMore() {
      if (!this.loading) {
        this.loading = true;
        try {
          this.page++;
          const response = await axios.get(`messages?page=${this.page}`);
          const newMessages = response.data.data;
          this.messages.push(...newMessages);
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      }
    },
    async searchMessages() {
      this.page = 1;
      try {
        const response = await axios.get(`messages?search=${this.searchQuery}`);
        this.messages = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  directives: {
    InfiniteScroll,
  },
};
</script>

<style scoped>
/* Gaya CSS khusus untuk mode mobile */
.is-mobile {
  /* Sesuaikan gaya CSS untuk mode mobile di sini */
}

.search-container {
  margin-bottom: 20px;
}
</style>
