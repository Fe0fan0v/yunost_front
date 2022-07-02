<template>
  <fieldset class="uk-fieldset">
    <div class="uk-card uk-card-body">
      <h4 class="uk-card-title">{{ oldname }} - группа {{ oldgroup }}</h4>
      <div>
        <label class="uk-form-label">Новое название</label>
        <Select2 v-model="newname" :options="coursesForSelect"
                 :settings="{ width: '100%' }"
                 @select="updateGroups($event)"/>
        <label class="uk-form-label">Новый номер группы</label>
        <select class="uk-select" v-model="newgroup">
          <option v-for="group in groups" v-bind:value="group" v-bind:key="group">
            {{ group }}
          </option>
        </select>
        <div class="uk-margin">
          <button class="uk-button" @click="submitData()">Применить</button>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>
import Select2 from 'vue3-select2-component';

export default {
  name: 'OldEditForm',
  components: {Select2},
  props: {
    oldname: {
      type: String,
      required: true
    },
    oldgroup: {
      type: String,
      required: true
    },
    coursesForSelect: {
      type: Array,
      required: true
    },
    groupLists: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      groups: [],
      newname: '',
      newgroup: ''
    }
  },
  methods: {
    updateGroups(e) {
      this.groups = this.groupLists[e.id]
    },
    submitData() {
      if (this.newname && this.newgroup) {
        this.$emit('done', [this.oldname, this.newname, this.newgroup])
      } else return
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
