
<template>
<div>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" flat tile>
        <v-card-title>Manage Cashiers</v-card-title>
        <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

        <v-data-table
          :headers="headers"
          :items="cashiers"
          disable-pagination
          :hide-default-footer="true"
        >
        <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>All Cashiers</v-toolbar-title>
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
                <span class="headline">Edit Cashier Details</span>
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
                        v-model="Cashier.cashierID"
                        label="Cashier ID"
                        readonly
                      ></v-text-field>
                    </v-col>
                    
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="Cashier.userName"
                        label="Username"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="Cashier.firstName"
                        label="First Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="Cashier.lastName"
                        label="Last Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="Cashier.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>

                     <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="Cashier.phoneNo"
                        label="Contact Number"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="Cashier.nic"
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
                  @click="updateCashier"
                >
                  Save Changes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete Cashier?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteCashierbyID">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDeleteAll" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete all Cashiers?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteAll">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteAllCashiers">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
         </v-toolbar>
      </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editCashier(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteCashier(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions>
          <v-btn small color="error" class="mr-3" @click="dialogDeleteLauncher">
            Remove All Cashiers
          </v-btn>
          <v-btn small color="primary" @click="refreshList">
            Refresh
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import DataService from '../services/DataService';
export default {
  name: "cashiers-list",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      dialogDeleteAll: false,
      cashiers: [],
      title: "",
      headers: [
        { text: "Cashier ID", value: "cashierID" }, 
                 {
                    text: "Username",
                    align: 'start',
                    sortable: false,
                    value: "userName", 
                 },
                 { text: "First Name", value: "firstName" },
                 { text: "Last Name", value: "lastName" },
                 { text: "Email", value: "email" },
                 { text: "Contact Number", value :"phoneNo"},
                 { text: "NIC", value: "nic" },
                 { text: "Actions", value: 'actions', sortable: false },
      ],
  Cashier: {
        cashierID:'',
        userName:'',
        firstName:'',
        lastName:'',
        email:'',
        phoneNo: '',
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

    retrieveCashiers() {
      DataService.getAllCashiers()
        .then((response) => {
         this.cashiers = response.data.map(this.getDisplayCashiers);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCashiers();
    },

editCashier (item) {
    this.Cashier = Object.assign({}, item)
    this.dialog = true
    },

    deleteCashier (item) {
    this.Cashier = Object.assign({}, item)
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

    deleteAllCashiers() {
      DataService.deleteAllCashiers()
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

    updateCashier() {
       DataService.updateEmployeeCashier(this.Cashier.cashierID, this.Cashier)
       .then((response) => {
         console.log(response.data);
         this.message = "Cashier Details were Updated successfully";
         this.refreshList();
       })
       .catch((e) => {
         console.log(e);
       })
       this.close()
       
    },

    deleteCashierbyID() {
      DataService.deleteEmployeeCashierbyID(this.Cashier.cashierID)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
        this.closeDelete();
    },

    getDisplayCashiers(Cashier) {
      return {
        cashierID: Cashier.cashierID,
        userName: Cashier.userName,
        firstName: Cashier.firstName,
        lastName: Cashier.lastName,
        email: Cashier.email,
        phoneNo: Cashier.phoneNo,
        nic: Cashier.nic
      };
    },
  },
  mounted() {
    this.retrieveCashiers();
  },
};
</script>