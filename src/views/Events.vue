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
import addEvents from '../components/addEvents'
import viewEvents from '../components/viewEvents'

export default {
  name: 'Events',
  components: {
    addEvents,
    viewEvents
  },

  data() {
    return{
      tab: null,
      items: [
        {tab: 'Add Events Reservation', content: 'addEvents'},
        {tab: 'View Events Reservations', content: 'viewEvents'}
      ]
    };
  }
};
</script>