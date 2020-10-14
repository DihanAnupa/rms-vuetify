
<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" flat tile>
        <v-card-title>Manage Chefs</v-card-title>
        <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

        <v-data-table
          :headers="headers"
          :items="Chefs"
          :search = "search"
          disable-pagination
          :hide-default-footer="true"
        >
        <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>All Chefs</v-toolbar-title>
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
          hide-details>
           </v-text-field>

          </v-col>
        
          <v-spacer></v-spacer>
      <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Edit Chef Details</span>
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
                        v-model="Chef.chefId"
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
                        v-model="Chef.userName"
                        label="Username"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="Chef.firstName"
                        label="First Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="Chef.lastName"
                        label="Last Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="Chef.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>

                     <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="Chef.phoneNo"
                        label="Contact Number"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="Chef.nic"
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
                  @click="updateChef"
                >
                  Update Changes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete Chef?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteChefbyID">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDeleteAll" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete all Chefs?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteAll">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteAllChefs">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
         </v-toolbar>
      </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editChef(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteChef(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions>
          <v-btn small color="error" class="mr-3" @click="dialogDeleteLauncher">
            Remove All Chefs
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
  name: "chefs-list",
  data() {
    return {
      search:'',
      dialog: false,
      dialogDelete: false,
      dialogDeleteAll: false,
      Chefs: [],
      title: "",
      headers: [
        { text: "Chef ID", value: "chefId" }, 
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
      Chef : {
        chefId:'',
        userName:'',
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
    retrieveChefs() {
      DataService.getAllChefs()
        .then((response) => {
         this.Chefs = response.data.map(this.getDisplayChefs);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveChefs();
    },

editChef (item) {
    this.Chef = Object.assign({}, item)
    this.dialog = true
    },

    deleteChef (item) {
    this.Chef = Object.assign({}, item)
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

    deleteAllChefs() {
      DataService.deleteAllChefs()
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

    updateChef() {
       DataService.updateEmployeeChef(this.Chef.chefId, this.Chef)
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

    deleteChefbyID() {
      DataService.deleteEmployeeChefbyID(this.Chef.chefId)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
        this.closeDelete();
    },

    getDisplayChefs(Chef) {
      return {
        chefId: Chef.chefId,
        userName: Chef.userName,
        firstName: Chef.firstName,
        lastName: Chef.lastName,
        email: Chef.email,
        phoneNo: Chef.phoneNo,
        nic: Chef.nic
      };
    },
  },
  mounted() {
    this.retrieveChefs();
  },
};
</script>