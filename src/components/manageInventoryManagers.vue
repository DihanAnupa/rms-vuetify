<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" flat tile>
        <v-card-title>Manage Inventory Managers</v-card-title>
        <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

        <v-data-table
          :headers="headers"
          :items="InventoryManagers"
          disable-pagination
          :hide-default-footer="true"
        >
        <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>All Inventory Managers</v-toolbar-title>
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
          <v-col cols="12" md="4">
           <v-btn small @click="searchTitle">
            Search
           </v-btn>
          </v-col>
          <v-spacer></v-spacer>
      <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Edit Inventory Manager Details</span>
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
                        v-model="InventoryManager.inventoryManagerID"
                        label="Inventory Manager ID"
                        readonly
                      ></v-text-field>
                    </v-col>
                    
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="InventoryManager.userName"
                        label="Username"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="InventoryManager.firstName"
                        label="First Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="InventoryManager.lastName"
                        label="Last Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="InventoryManager.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>

                     <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="InventoryManager.phoneNo"
                        label="Contact Number"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="InventoryManager.nic"
                        label="NIC"
                        readonly
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
                  @click="updateInventoryManager"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete Inventory Manager?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteInventoryManagerbyID">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDeleteAll" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete all Inventory Managers?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteAll">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteAllInventoryManagers">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
         </v-toolbar>
      </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editInventoryManager(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteInventoryManager(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions>
          <v-btn small color="error" class="mr-3" @click="dialogDeleteLauncher">
            Remove All Inventory Managers
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
  name: "InventoryManagers-list",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      dialogDeleteAll: false,
      InventoryManagers: [],
      title: "",
      headers: [
        { text: "Manager ID", value: "inventoryManagerID" }, 
                 {
                    text: "Username",
                    align: 'start',
                    sortable: false,
                    value: "userName", 
                 },
                 { text: "First Name", value: "firstName" },
                 { text: "Last Name", value: "lastName" },
                 { text: "Email", value: "email" },
                 { text: "Contact Number", value: "phoneNo"},
                 { text: "NIC", value: "nic" },
                 { text: "Actions", value: 'actions', sortable: false },
      ],
      InventoryManager:{
        inventoryManagerID:'',
        userName: '',
        firstName:'',
        lastName:'',
        email:'',
        phoneNo:'',
        nic:'',
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
    retrieveInventoryManagers() {
      DataService.getAllInventoryManagers()
        .then((response) => {
         this.InventoryManagers = response.data.map(this.getDisplayInventoryManagers);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveInventoryManagers();
    },

  editInventoryManager (item) {
    this.InventoryManager = Object.assign({}, item)
    this.dialog = true
    },

    deleteInventoryManager (item) {
    this.InventoryManager = Object.assign({}, item)
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

    dialogDeleteLauncher() {
      this.dialogDeleteAll = true
    },

    deleteAllInventoryManagers() {
      DataService.deleteAllInventoryManagers()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
        this.closeDeleteAll();
    },

    searchTitle() {
      DataService.findByTitle(this.title)
        .then((response) => {
          this.ingredients = response.data.map(this.getDisplayIngredient);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateInventoryManager() {
       DataService.updateEmployeeInventoryManager(this.InventoryManager.inventoryManagerID, this.InventoryManager)
       .then((response) => {
         console.log(response.data);
         this.message = "Inventory Manager Details were Updated successfully";
         this.refreshList();
       })
       .catch((e) => {
         console.log(e);
       })
       this.close()
       
    },

    deleteInventoryManagerbyID() {
      DataService.deleteEmployeeInventoryManagerbyID(this.InventoryManager.inventoryManagerID)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
        this.closeDelete();
    },


    getDisplayInventoryManagers(InventoryManager) {
      return {
        inventoryManagerID: InventoryManager.inventoryManagerID,
        userName: InventoryManager.userName,
        firstName: InventoryManager.firstName,
        lastName: InventoryManager.lastName,
        email: InventoryManager.email,
        phoneNo: InventoryManager.phoneNo,
        nic: InventoryManager.nic
      };
    },
  },
  mounted() {
    this.retrieveInventoryManagers();
  },
};
</script>