<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" flat tile>
        <v-card-title>Food Items</v-card-title>
        <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

        <v-data-table
          :headers="headers"
          :items="foodItems"
          :search="search"
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
      <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Edit Item</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="foodItem.itemID"
                        label="Food Item ID"
                        readonly
                      ></v-text-field>
                    </v-col>
                    
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="foodItem.itemName"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="foodItem.price"
                        label="Price (LKR)"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="foodItem.type"
                        label="Type"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="updateFoodItem"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this menu item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItem">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDeleteAll" max-width="500px">
            <v-card>
              <v-card-title>Are you sure you want to delete all the items?</v-card-title>
              <v-card-text>This may cause problems</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteAll">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="removeAllItems">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
         </v-toolbar>
      </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon medium class="mr-2" @click="editIngredient(item)">mdi-pencil</v-icon>
            <v-icon medium @click="deleteIngredient(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions>
          <v-btn small color="error" class="mr-3" @click="deleteAllDialog">
            Remove All
          </v-btn>
          <v-btn small color="primary" @click="refreshList">
            Refresh
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DataService from '../services/DataService';
export default {
  name: "ingredients-list",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      dialogDeleteAll: false,
      foodItems: [],
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
                 { text: "Actions", value: 'actions', sortable: false },
      ],

      
      foodItem: {
        itemID:'',
        itemName: '',
        price: 0,
        recipe: 0,
        type: 0,
      }
    };
  },

  watch: {
    dialog (val) {
      val || this.close()
    },

    dialogDelete (val) {
      val || this.closeDelete()
    },

    dialogDeleteAll (val) {
      val || this.closeDeleteAll()
    },
  },

  
  methods: {
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

    refreshList() {
      this.retrieveFoodItems();
    },

    deleteAllDialog() {
      this.dialogDeleteAll = true
    },

    editIngredient (item) {
    this.foodItem = Object.assign({}, item)
    this.dialog = true
    },

    deleteIngredient (item) {
    this.foodItem = Object.assign({}, item)
    this.dialogDelete = true
    },

    close() {
      this.dialog = false
    },
 
    closeDelete() {
      this.dialogDelete = false
    },

    closeDeleteAll() {
      this.dialogDeleteAll = false
    },

    removeAllItems() {
      DataService.deleteAllFoodItems()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
        this.closeDeleteAll()
    },

    updateFoodItem() {
       DataService.updateFoodItemByID(this.foodItem.itemID, this.foodItem)
       .then((response) => {
         console.log(response.data);
         this.message = "The item was Updated successfully";
         this.refreshList();
       })
       .catch((e) => {
         console.log(e);
       })
       this.close()
    },

    deleteItem() {
      DataService.deleteFoodItemByID(this.foodItem.itemID)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
        this.closeDelete()
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
  },
  mounted() {
    this.retrieveFoodItems();
  },
};
</script>

