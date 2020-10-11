<template>
<div id="app">
  <v-app id="inspire">
  <v-container>
      <v-tabs v-model="tab" background-color="white" color= "red darken-1">
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card flat>
            <v-card-text>
              <component v-bind:is="item.content"></component>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
  </v-container>
  </v-app>
</div>
</template>

<script>
import addItem from '../components/addItem'
import viewMenu from '../components/viewMenu'

export default {
  name: 'Items',
  components: {
    addItem,
    viewMenu
  },

  data() {
    return{
      tab: null,
      items: [
        {tab: 'Add Item', content: 'addItem'},
        {tab: 'View Menu', content: 'viewMenu'}
      ]
    };
  }
};
</script>