<template>
<v-container>
  <v-row align="center">
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
      class="mx-16"
    >
      <v-text-field
        v-model="foodItem.itemName"
        :rules="nameRules"
        label="Item Name"
        required
      ></v-text-field>

       <v-textarea
        rows="1"
        v-model="foodItem.recipe"
        label="Recipe"
        required
        auto-grow
      ></v-textarea>

      <v-text-field
        v-model="foodItem.price"
        label="Price"
        required
      ></v-text-field>

      <v-select
        v-model="foodItem.type"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Type"
        required
      ></v-select>


      <v-btn
        color="success"
        class="mr-4"
        @click="saveItem"
      >
        Submit
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
    </v-form>
  </v-row>
</v-container>
</template>

<script>
import DataService from '../services/DataService'

export default {

    data() {
    return{
      foodItem: {
          id: null,
          itemName: '',
          recipe: '',
          price: null,
          type: null,
      },

      items: [
        {text: 'Food Item'},
        {text: 'Beverage'}
      ]
    };

  },
  methods: {
        saveItem() {
           var data = {
             itemName: this.foodItem.itemName,
             recipe: this.foodItem.recipe,
             price: this.foodItem.price,
             type: this.foodItem.type
            // image = this.item.image
           };

           DataService.create(data)
           .then(response => {
           this.foodItem.id = response.data.id;
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
        
       }
    
};
</script>