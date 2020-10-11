<template>
 <div id="app">
  <v-app id="inspire">
    <v-parallax
      height="1000"
      src="../src/assets/background3.png"
    >
    <v-app-bar
        color="grey darken-4"
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        dense
        dark
        prominent
      >
      <v-toolbar-title class="display-2 font-weight-light mb-3 mx-3">
          Cloud Café</v-toolbar-title>
    </v-app-bar>
    <br><br><br><br><br>
    <v-row
      class="mt-16"
      align="start"
      justify="end"
    >
      <v-col class="text-left" cols="12" md="6">
        <v-card dark flat color="transparent">
        <h1 class="display-4 font-weight-thin">Welcome!</h1>
        <p class="font-weight-regular">The amazing ambience will instantly set you in the mood for an incredible evening. 
          Sit down under the stars on a well-lit rooftop terrace for some great food and entertainment. 
          Served up for your pleasure is an array of finger food – from pizza and panini sandwiches, 
          to other delectable delights – prepared to perfection by celebrity chef Jean Pierre..</p>
           <p class="font-weight-regular">
              Functions hosted at Cloud Café </p>
              <ul>
                  <li>Cocktail evenings </li>
                    <li>Birthday parties </li>
                    <li>Engagement evenings </li>
                    <li>Corporate parties / events </li>
                    <li>Wine evenings</li>
              </ul>
          <v-dialog v-model="dialogSignUp" max-width="500px">
               <v-card
    >
      <v-toolbar
        color="grey darken-4"
        cards
        dark
        flat
      >
        <v-btn icon @click="closeDialogSignup">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-card-title class="title font-weight-light">Sign up</v-card-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-form
        ref="form"
        v-model="form"
        class="pa-4 pt-6"
      >
        <v-text-field
          v-model="Customer.userName"
          filled
          :rules="nameRules"
          color="success"
          label="User Name"
        ></v-text-field>
        <v-text-field
          v-model="Customer.passWord"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          filled
          color="success"
          label="Password"
          style="min-height: 96px"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field
          v-model="Customer.phoneNo"
          :rules="contactRules"
          filled
          color="success"
          label="Phone number"
        ></v-text-field>
         <v-text-field
          v-model="Customer.firstName"
          :rules="firstNameRules"
          filled
          color="success"
          label="First Name"
        ></v-text-field>
        <v-text-field
          v-model="Customer.lastName"
          :rules="lastNameRules"
          filled
          color="success"
          label="Last Name"
        ></v-text-field>
        <v-text-field
          v-model="Customer.email"
          :rules="emailRules"
          filled
          color="success"
          label="Email address"
          type="email"
        ></v-text-field>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          text
          @click="$refs.form.reset()"
        >
          Clear
        </v-btn>
        <v-spacer></v-spacer>
        
        <v-btn
          class="white--text"
          color="primary"
          depressed
          @click="$router.push('CustomerView')"
        >Create Account</v-btn>
      </v-card-actions>
    </v-card>
          </v-dialog>
          <v-card-actions>
          <v-btn text medium class="mr-3" @click=" dialogSignUpLaunch">
            SignUp
          </v-btn>
          <v-btn text medium>
            Login
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

     <v-footer
    dark
    padless
    absolute
  >
    <v-card
      flat
      tile
      class="grey darken-4 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Address : Colombo Court Hotel & Spa, 32 Alfred House Ave, Colombo 03, Sri Lanka.  
        Please contact us for further inquiries and reservations
         : +94 114 645 333 , 
         info@colombocourthotel.com 
        Open from 5 pm
        Colombo Court Hotel & Spa
         </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>All Copyrights Reserved by Colombo Court Hotel & Spa</strong>
      </v-card-text>
    </v-card>
  </v-footer>
    </v-parallax>
  </v-app>
</div>
</template>

<script>

export default {
  data() {
    return {
      show1: false,
      dialogSignUp: false,

      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],

      Customer: {
        id: null,
        userName: '',
        passWord:'',
        phoneNo:'',
        firstName:'',
        lastName:'',
        email:'',
      },

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
    };
  },

  watch: {
    dialogSignUp (val)  {
      val || this.closeSignUp()
    },
  },

  methods: {
    dialogSignUpLaunch() {
      this.dialogSignUp = true
    },

    closeDialogSignup() {
      this.dialogSignUp = false
    },
  },
}
</script>