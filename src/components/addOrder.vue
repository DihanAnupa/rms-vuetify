<template>

 

<!-- --------------------------------------------------------------------------------------------------->

<div class="submit-form">

 <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" flat tile>
        <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

        <v-data-table
          :headers="headers"
          :items="foodItems"
          :search="search"
          class="elevation-1"
          disable-pagination
          :hide-default-footer="true"
        >
        <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>All Food Items</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-col cols="8" md="4">
            
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
         </v-toolbar>
       </template>
        </v-data-table>

        <v-card-actions>
          <v-btn small color="primary" @click="refreshList">
            Refresh
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>





   <div class="submit-form">
    <v-row align="center">
        <div v-if="!submitted">
          <v-card-title>Place New Order </v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >
    <v-row>
      <v-col>
        <v-text-field
        v-model="placeOrder.orderitem1"
        :rules="[v => !!v || 'Item is required']"
        label="Enter Item"
        required
      ></v-text-field>
       </v-col>
  
      <v-col cols="3" sm="2" md="5">
      <v-select
        v-model="placeOrder.quantity1"
        :items="quantity"
        :rules="[v => !!v || 'Quantity is required']"
        label="Quantity"
        required
      ></v-select>
       </v-col>
    </v-row>

    <v-row>
      <v-col>
       <v-text-field
        v-model="placeOrder.orderitem2"
        label="Enter Item"
        required
      ></v-text-field>
       </v-col>
  
      <v-col cols="3" sm="2" md="5">
       <v-select
        v-model="placeOrder.quantity2"
        :items="quantity"
        label="Quantity"
        required
      ></v-select>
       </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
        v-model="placeOrder.orderitem3"
        label="Enter Item"
        required
      ></v-text-field>
       </v-col>
  
      <v-col cols="3" sm="2" md="5">
      <v-select
        v-model="placeOrder.quantity3"
        :items="quantity"
        label="Quantity"
        required
      ></v-select>
       </v-col>
    </v-row>



      <v-row class="my-5"> 
      <v-btn color="success" class="mr-4" @click="addOrder"> Place Order </v-btn>
      <v-btn color="error" @click="reset" class = "mr-4">Reset Form </v-btn>
      <v-btn color="primary" class="mr-4" @click="demo"> Demo </v-btn>
      </v-row>

      </v-form>
        </div>

        <div v-else>
            <v-alert type="success">
              Order placed Successfully!
              <v-col class="shrink">
               <v-btn @click="newOrder">Add another Order</v-btn>
              </v-col>
            </v-alert>
        </div>
  </v-row></div>
</div>
</template>

<script>
import DataService from '../services/DataService'
  export default {

    data() {
    return{
      submitted: false,
      headers: [
        { text: "Food Item ID", value: "itemID" }, 
                 {
                    text: "Name",
                    align: 'start',
                    sortable: false,
                    value: "itemName",
                 },
                 { text: "Price (LKR)", value: "price" },
                 { text: "Recipe", value: "recipe" },
                 { text: "Type", value: "type" },
      ],

      foodItem: {
        itemID:'',
        itemName: '',
        price: 0,
        recipe: 0,
        type: 0,
      },

      placeOrder: {
          id: null,
          orderitem1: '',
          quantity1:'',
          orderitem2: '',
          quantity2:'',
          orderitem3: '',
          quantity3:'',
          status: 'Pending',
          tPrice: null
      },
       foodItems: [],
    

        quantity: [
          { text: '1'},
          { text: '2'},
          { text: '3'},
          { text: '4'},
          { text: '5'},

        ]
    };

  },
  methods: {

      demo(){
        this.placeOrder = {
          orderitem1: 'Pizza',
          quantity1:'1',
          orderitem2: 'Soup',
          quantity2:'2',
          orderitem3: 'Coca-Cola',
          quantity3:'3',
          status:'Pending'

        };
      },
       retrieveFoodItems() {
      DataService.getAllFoodItems()
        .then((response) => {
          this.foodItems = response.data.map(this.getDisplayFoodItem);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

       getDisplayFoodItem(foodItem) {
      return {
        itemID: foodItem.itemID,
        itemName: foodItem.itemName,
        price: foodItem.price,
        recipe: foodItem.recipe,
        type: foodItem.type,
      };
    },

       newOrder() {
              this.submitted = false;
              this.placeOrder = {};
            },

        addOrder() {
           var data = {
             orderitem1: this.placeOrder.orderitem1,
             quantity1: this.placeOrder.quantity1,
             orderitem2: this.placeOrder.orderitem2,
             quantity2: this.placeOrder.quantity2,
             orderitem3: this.placeOrder.orderitem3,
             quantity3: this.placeOrder.quantity3,
             status : this.placeOrder.status

           };

           DataService.addOrder(data)
           .then(response => {
           this.order.id = response.data.id;
           console.log(response.data);
           this.submitted = true;
           })
           .catch(e => {
           console.log(e);
           });

        },

        reset () {
        this.$refs.form.reset()
        },

  },
  mounted() {
    this.retrieveFoodItems();
  },
    
};
</script>