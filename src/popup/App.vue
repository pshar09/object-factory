<template>
  <v-app>
    <v-card>
      <v-card-text class="body-1 pb-0 pt-2">
        <h3>Object Factory {{ version }}</h3>
        <p>Please open DevTools to use the Object Factory extension.</p>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn flat small color="primary" v-on:click="openSupport">Support</v-btn><v-btn flat small color="primary" v-on:click="openOptions">Options</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      version: '1.5.2',
    };
  },
  methods: {
    openOptions() {
      chrome.runtime.openOptionsPage();
      window.close();
    },
    openSupport() {
      chrome.tabs.create({ url: 'https://github.com/pshar09/object-factory' });
      window.close();
    },
  },
};
</script>

<style lang="scss">
body {
  width: 260px;
}
</style>
