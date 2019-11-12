<template>
  <v-dialog scrollable v-model="dialog" @keydown.esc="cancel">
    <v-card>
      <v-toolbar dark dense flat>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text style="height: 450px">
        <pre>
          {{ code }}
        </pre>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn color="primary darken-1" flat="flat" @click.native="copy">Copy</v-btn>
        <v-btn color="primary darken-1" flat="flat" v-if="this.title == 'Protractor'" @click.native="saveJS">Save As JS</v-btn>
        <v-btn color="primary darken-1" flat="flat" v-else @click.native="saveJava">Save As Java</v-btn>
        <v-btn color="primary darken-1" flat="flat" @click.native="ok">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    code: null,
    title: null,
  }),
  methods: {
    show(title, code) {
      this.dialog = true;
      this.title = title;
      this.code = code;
    },
    ok() {
      this.dialog = false;
    },
    copy() {
      const copyEl = document.createElement('pre');
      copyEl.setAttribute('style', 'height: 0px');
      copyEl.contentEditable = 'true';
      document.body.appendChild(copyEl);
      copyEl.appendChild(document.createTextNode(this.code));
      copyEl.unselectable = 'off';
      copyEl.focus();
      document.execCommand('SelectAll');
      document.execCommand('Copy', false, null);
      document.body.removeChild(copyEl);
      this.dialog = false;
      this.$root.$popupSuccess('The code has been copied to your clipboard');
    },
    saveJS() {
      var filename = prompt('Please enter your file name');
      if (filename) {
        const FileSaver = require('file-saver');
        var blob = new Blob([this.code], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, filename + '.js');
        document.body.removeChild(copyEl);
        this.dialog = false;
        this.$root.$popupSuccess('The code has been saved to your local storage');
        alert('File saved successfully...');
      } else {
        alert('File save canceled...');
      }
    },
    saveJava() {
      var filename = prompt('Please enter your file name');
      if (filename) {
        const FileSaver = require('file-saver');
        var blob = new Blob([this.code], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, filename + '.java');
        document.body.removeChild(copyEl);
        this.dialog = false;
        this.$root.$popupSuccess('The code has been saved to your local storage');
        alert('File saved successfully...');
      } else {
        alert('File save canceled...');
      }
    },
  },
};
</script>

<style scoped>
pre {
  font-size: 11px;
}
</style>
