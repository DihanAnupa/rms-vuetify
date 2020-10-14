<template>
<div class="submit-form">
    <v-row align="center">
        <div v-if="!submitted">
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >
      <v-text-field
        v-model="employee.userName"
        :counter="10"
        :rules="nameRules"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="employee.firstName"
        :rules="firstNameRules"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="employee.lastName"
        :rules="lastNameRules"
        label="Last Name"
        required
      ></v-text-field>

       <v-text-field
        v-model="employee.phoneNo"
        :rules="contactRules"
        label="Contact Number"
        :counter="10"
        required
      ></v-text-field>


      <v-text-field
        v-model="employee.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      
      <v-text-field
              v-model="employee.passWord"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
        ></v-text-field>
        

       <v-text-field
        v-model="employee.nic"
        :rules="nicRules"
        label="NIC"
        required
      ></v-text-field>
      <v-row class="my-5"> 
      <v-btn color="success" class="mr-4" @click="addChef"> Add Chef </v-btn>
      <v-btn color="success" class="mr-4" @click="addCashier"> Add Cashier </v-btn>
      <v-btn color="success" class="mr-4" @click="addRestManager"> Add Restaurant Manager </v-btn>
      <v-btn color="success" class="mr-4" @click="addInvManager"> Add Inventory Manager </v-btn>
      </v-row>

   <v-row>
     
      <v-btn color="error" class="mr-4" @click="reset">Reset Form </v-btn>
      <v-btn color="primary" class="mr-4" @click="demo">Demo </v-btn>
      </v-row>

    </v-form>
        </div>

        <div v-else>
            <v-alert type="success">
              Employee added Successfully!
              <v-col class="shrink">
               <v-btn @click="newEmployee">Add another Employee</v-btn>
              </v-col>
            </v-alert>
        </div>
  </v-row>
</div>
</template>

<script>
import DataService from '../services/DataService'
  export default {
    data() {
    
    return{
      show1: false,
      valid: true,
      
      employee: {
        id: null,
        userName: '',
        firstName: '',
        lastName: '',
        phoneNo: null,
        email: '',
        passWord: '',
        nic: '',
      },

      submitted : false,
      name: '',
      nameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Username must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      firstName: '',
      firstNameRules: [
        v => !!v || 'First Name is required',
        
      ],
      lastName: '',
      lastNameRules: [
        v => !!v || 'Last Name is required',
        
      ],
      contact: '',
      contactRules: [
        v => !!v || 'Contact Number is required',
        v =>  /^\d+$/.test(v) || 'Contact Number must be valid',
      ],
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
      nic: '',
      nicRules: [
        v => !!v || 'NIC is required',
        
      ],
      lazy: false,
    };
  
    },
    //add new employee dialog 
    methods: {
      //demo button data
      demo() {
                this.employee = {
                     userName: 'Dihan33',
                     firstName: 'Dihan',
                      lastName: 'Perera',
                     phoneNo: '0767287650',
                      email: 'dihananupa99@gmail.com',
                      passWord: '123456789',
                      nic: '990880690V',
                };
            },

      newEmployee() {
              this.submitted = false;
              this.employee = {};
            },

      addChef() {
        var data = {
             userName: this.employee.userName,
             firstName: this.employee.firstName,
             lastName: this.employee.lastName,
             phoneNo: this.employee.phoneNo,
             passWord: this.employee.passWord,
             email: this.employee.email,
             nic: this.employee.nic
           };
           DataService.addEmployeeChef(data)
           .then(response => {
           this.employee.id = response.data.id;
           console.log(response.data);
           this.submitted = true;
           })
           .catch(e => {
           console.log(e);
           });
      },
      addCashier() {
        var data = {
             userName: this.employee.userName,
             firstName: this.employee.firstName,
             lastName: this.employee.lastName,
             phoneNo: this.employee.phoneNo,
             passWord: this.employee.passWord,
             email: this.employee.email,
             nic: this.employee.nic
           };
           DataService.addEmployeeCashier(data)
           .then(response => {
           this.employee.id = response.data.id;
           console.log(response.data);
           this.submitted = true;
           })
           .catch(e => {
           console.log(e);
           });
      },
      addInvManager() {
        var data = {
             userName: this.employee.userName,
             firstName: this.employee.firstName,
             lastName: this.employee.lastName,
             phoneNo: this.employee.phoneNo,
             passWord: this.employee.passWord,
             email: this.employee.email,
             nic: this.employee.nic
           };
           DataService.addEmployeeInvManager(data)
           .then(response => {
           this.employee.id = response.data.id;
           console.log(response.data);
           this.submitted = true;
           })
           .catch(e => {
           console.log(e);
           });
      },
      addRestManager() {
        var data = {
             userName: this.employee.userName,
             firstName: this.employee.firstName,
             lastName: this.employee.lastName,
             phoneNo: this.employee.phoneNo,
             passWord: this.employee.passWord,
             email: this.employee.email,
             nic: this.employee.nic
           };
           DataService.addEmployeeRestManager(data)
           .then(response => {
           this.employee.id = response.data.id;
           console.log(response.data);
           this.submitted = true;
           })
           .catch(e => {
           console.log(e);
           });
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      //resetValidation () {
        //this.$refs.form.resetValidation()
     // },
    },
  }
 
</script>