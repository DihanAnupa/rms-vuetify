<template>
<div id ="app">
  <v-app id="inspire">
  <v-container>
      <v-tabs v-model="tab" background-color="white" color="red darken-1">
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
import addEmployee from '../components/addEmployee'
import manageEmployees from '../components/manageEmployees'
import manageCashiers from '../components/manageCashiers'
import manageRestaurantManagers from '../components/manageRestaurantManagers'
import manageInventoryManagers from '../components/manageInventoryManagers'

export default{
  name:'Employee',
  components:{
    addEmployee,
    manageEmployees,
    manageCashiers,
    manageRestaurantManagers,
    manageInventoryManagers
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: 'Add Employee', content: 'addEmployee' },
         { tab: 'Manage Chefs', content: 'manageEmployees' },
         { tab: 'Manage Cashiers', content: 'manageCashiers' },
         { tab: 'Manage Restaurant Managers', content: 'manageRestaurantManagers' },
         { tab: 'Manage Inventory Managers', content: 'manageInventoryManagers' }
      ]
    };
  }
};
</script>