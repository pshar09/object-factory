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
      const filename = prompt('Please enter your file name without extension');
      if (filename) {
        if (filename.match(/[^\w]|_/) == null) {
          const FileSaver = require('file-saver');
          const importJSPackage_IComponentValidations = "import {IComponentValidations} from '\@wmclientonline\/e2e-utils';";
          const exportVariable = 'export var ' + filename + ': Map<string, IComponentValidations> = new Map<string, IComponentValidations>([';
          const newLineJS = '\r\n';
          const contentToWriteInJS = importJSPackage_IComponentValidations + newLineJS + exportVariable + newLineJS + newLineJS + this.code + newLineJS + ']);';

          var blob = new Blob([contentToWriteInJS], { type: 'text/plain;charset=utf-8' });
          FileSaver.saveAs(blob, filename + '.js');
          document.body.removeChild(copyEl);
          this.dialog = false;
          this.$root.$popupSuccess('The code has been saved to your local storage');
          alert('File saved successfully...');
        } else {
          alert('Invalid File Name entered...!!!');
        }
      } else {
        alert('File save canceled...');
      }
    },
    saveJava() {
      const filename = prompt('Please enter your file name without extension');
      if (filename) {
        if (filename.match(/[^\w]|_/) == null) {
          const FileSaver = require('file-saver');

          const packageName = 'package com.ms.pages;';
          const importSeleniumPackage_By = 'import org.openqa.selenium.By;';
          const newLine = '\r\n';
          const contentToWrite = packageName + newLine + importSeleniumPackage_By + newLine + newLine + 'public class ' + filename + '{' + this.code + newLine + '}';

          var blob = new Blob([contentToWrite], { type: 'text/plain;charset=utf-8' });
          FileSaver.saveAs(blob, filename + '.java');
          document.body.removeChild(copyEl);
          this.dialog = false;
          this.$root.$popupSuccess('The code has been saved to your local storage');
          alert('File saved successfully...');
        } else {
          alert('Invalid File Name entered...!!!');
        }
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
