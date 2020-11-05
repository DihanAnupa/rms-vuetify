<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" flat tile>
        <v-card-title>Manage Restaurant Managers</v-card-title>
        <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

        <v-data-table
          :headers="headers"
          :items="RestaurantManagers"
          disable-pagination
          :hide-default-footer="true"
        >
        <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>All Restaurant Managers</v-toolbar-title>
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
             this.searchName
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
                <span class="headline">Edit Restaurant Manager Details</span>
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
                        v-model="RestaurantManager.restaurantManagerID"
                        label="Restaurant Manager ID"
                        readonly
                      ></v-text-field>
                    </v-col>
                    
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="RestaurantManager.userName"
                        label="Username"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="RestaurantManager.firstName"
                        label="First Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="RestaurantManager.lastName"
                        label="Last Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="RestaurantManager.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="RestaurantManager.passWord"
                        label="Password"
                         :type="show1 ? 'text' : 'password'"
                         readonly
                      ></v-text-field>
                    </v-col>

                     <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="RestaurantManager.phoneNo"
                        label="Contact Number"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="RestaurantManager.nic"
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
                  Cancel Changes
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="updateRestaurantManager"
                >
                  Update Changes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete Restaurant Manager?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteRestaurantManagerbyID">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDeleteAll" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete all Restaurant Managers?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteAll">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteAllRestaurantManagers">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
         </v-toolbar>
      </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editRestaurantManager(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteRestaurantManager(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions>
          <v-btn small color="error" class="mr-3" @click="dialogDeleteLauncher">
            Remove All Restaurant Managers
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
  name: "RestaurantManagers-list",
  data() {
    return {
      search: '',
      show1 : false,
      dialog: false,
      dialogDelete: false,
      dialogDeleteAll: false,
      RestaurantManagers: [],
      title: "",
      headers: [
        { text: "Manager ID", value: "restaurantManagerID" }, 
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
      RestaurantManager:{
        restaurantManagerID:'',
        userName:'',
        firstName:'',
        lastName:'',
        email:'',
        passWord: '',
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
    retrieveRestaurantManagers() {
      DataService.getAllRestaurantManagers()
        .then((response) => {
         this.RestaurantManagers = response.data.map(this.getDisplayRestaurantManagers);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveRestaurantManagers();
    },

editRestaurantManager (item) {
    this.RestaurantManager = Object.assign({}, item)
    this.dialog = true
    },

    deleteRestaurantManager (item) {
    this.RestaurantManager = Object.assign({}, item)
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

    deleteAllRestaurantManagers() {
      DataService.deleteAllRestaurantManagers()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
        this.closeDeleteAll();
    },

    //Search method - by RestaurantManager username
    searchName() {
      DataService.getRestaurantManagerByUserName(this.RestaurantManager.username)
        .then((response) => {
          this.RestaurantManagers = response.data.map(this.getAllRestaurantManagers);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateRestaurantManager() {
       DataService.updateEmployeeRestaurantManager(this.RestaurantManager.restaurantManagerID, this.RestaurantManager)
       .then((response) => {
         console.log(response.data);
         this.message = "Restaurant Manager Details were Updated successfully";
         this.refreshList();
       })
       .catch((e) => {
         console.log(e);
       })
       this.close()
       
    },

    deleteRestaurantManagerbyID() {
      DataService.deleteEmployeeRestaurantManagerbyID(this.RestaurantManager.restaurantManagerID)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
        this.closeDelete();
    },


    getDisplayRestaurantManagers(RestaurantManager) {
      return {
        restaurantManagerID: RestaurantManager.restaurantManagerID,
        userName: RestaurantManager.userName,
        firstName: RestaurantManager.firstName,
        lastName: RestaurantManager.lastName,
        email: RestaurantManager.email,
        passWord: RestaurantManager.passWord,
        phoneNo: RestaurantManager.phoneNo,
        nic: RestaurantManager.nic
      };
    },
  },
  mounted() {
    this.retrieveRestaurantManagers();
  },
};
</script>