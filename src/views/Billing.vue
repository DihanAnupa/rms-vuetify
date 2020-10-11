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
import payment from '../components/payment'
import viewPayments from '../components/viewPayments'

export default {
  name: 'Items',
  components: {
    payment,
    viewPayments
  },

  data() {
    return{
      tab: null,
      items: [
        {tab: 'Payment', content: 'payment'},
        {tab: 'View Payments', content: 'viewPayments'}
      ]
    };
  }
};
</script>