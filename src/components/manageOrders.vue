
<template>

  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" flat tile>
        <v-card-title>Manage Orders</v-card-title>
        <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

          <div id= 'orderReport'>

        <v-data-table
          :headers="headers"
          :items="orders"
          :search = "search"
          disable-pagination
          :hide-default-footer="true"
        >
        <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>All Orders</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

          <v-col cols="8" md="4">
           <v-text-field
          v-model="search"
          this.searchName
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
                <span class="headline">Edit Orders</span>
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
                        v-model="placeOrder.pOrderID"
                        label="Order ID"
                        readonly
                      ></v-text-field>
                    </v-col>
                    
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="placeOrder.orderitem1"
                        label="Item 1"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="placeOrder.quantity1"
                        label="Quantity 1"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="placeOrder.orderitem2"
                        label="Item 2"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="placeOrder.quantity2"
                        label="Quantity 2"
                      ></v-text-field>
                    </v-col>

                     <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="placeOrder.orderitem3"
                        label="Item 3"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="placeOrder.quantity3"
                        label="Quantity 3"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="placeOrder.status"
                        label="Status"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="placeOrder.tPrice"
                        label="Total Price"
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
                  @click="updateOrder"
                >
                  Update Changes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete Order?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteOrderbyID">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDeleteAll" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete all Orders?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteAll">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteAllOrders">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
         </v-toolbar>
      </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editOrder(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteOrder(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
          </div>

        <v-card-actions>
          <v-btn small color="error" class="mr-3" @click="dialogDeleteLauncher">
            Remove All Orders
          </v-btn>
          <v-btn small color="primary"  class="mr-3" @click="refreshList">
            Refresh
          </v-btn>
          <v-btn small color="primary" class="mr-3" @click="generateReport">
            Generate Order Report
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
//import VueHtml2pdf from 'vue-html2pdf'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DataService from '../services/DataService';
export default {
  name: "orders-list",
  data() {
    return {
      search:'',
      heading : 'orderReport',
      dialog: false,
      dialogDelete: false,
      dialogDeleteAll: false,
      orders: [],
      title: "",
      headers: [
        { text: "Order ID", value: "pOrderID" }, 
                 {
                    text: "Item 1",
                    align: 'start',
                    sortable: false,
                    value: "orderitem1", 
                 },
                 { text: "Quantity 1", value: "quantity1" },
                 { text: "Item 2", value: "orderitem2" },
                 { text: "Quantity 2", value: "quantity2" },
                 { text: "Item 3", value: "orderitem3" },
                 { text: "Quantity 3", value: "quantity3" },
                 { text: "Status", value: "status"},
                 { text: "Total Price", value: "tPrice"},
                 { text: "Actions", value: 'actions', sortable: false },
      ],
      placeOrder : {
        pOrderID:'',
        orderitem1: '',
        quantity1:'',
        orderitem2: '',
        quantity2: '',
        orderitem3: '',
        quantity3:'',
        status: '',
        tPrice:'',
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
    //Generate report for orders
     generateReport() {
      var element = document.getElementById("orderReport")
      html2canvas(element).then((canvas) => {
        console.log(canvas)

        let pagewidth = 210

        var imgData = canvas.toDataURL(`image/png`)
        var imgHeight = (canvas.height * pagewidth / canvas.width)
        var doc = new jsPDF()
        doc.addImage(imgData, 0, 0, pagewidth, imgHeight)

        doc.save(`${this.heading}.pdf`)
      })
    },

    retrieveOrders() {
      DataService.getAllOrders()
        .then((response) => {
         this.orders = response.data.map(this.getDisplayOrders);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveOrders();
    },

editOrder (item) {
    this.placeOrder = Object.assign({}, item)
    this.dialog = true
    },

    deleteOrder (item) {
    this.placeOrder = Object.assign({}, item)
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

    deleteAllOrders() {
      DataService.deleteAllOrders()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
        this.closeDeleteAll();
    },

    //Search method - by OrderID
    searchName() {
      DataService.getOrderByOrderID(this.placeOrder.pOrderID)
        .then((response) => {
          this.orders = response.data.map(this.getAllOrders);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateOrder() {
       DataService.updateOrderbyID(this.placeOrder.pOrderID, this.placeOrder)
       .then((response) => {
         console.log(response.data);
         this.message = "Order Details were Updated successfully";
         this.refreshList();
       })
       .catch((e) => {
         console.log(e);
       })
       this.close()
       
    },

    deleteOrderbyID() {
      DataService.deleteOrderbyID(this.placeOrder.pOrderID)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
        this.closeDelete();
    },

    getDisplayOrders(placeOrder) {
      return {
       pOrderID : placeOrder.pOrderID,
       orderitem1: placeOrder.orderitem1,
       quantity1: placeOrder.quantity1,
       orderitem2: placeOrder.orderitem2,
       quantity2: placeOrder.quantity2,
       orderitem3: placeOrder.orderitem3,
       quantity3: placeOrder.quantity3,
       status : placeOrder.status,
       tPrice : placeOrder.tPrice
        
      };
    },
  },

  mounted() {
    this.retrieveOrders();
  },
};
</script>