<template>
 <div id="app">
  <v-app id="inspire">
    
<v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="../src/assets/background.jpg"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Cloud Café</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title v-model="tab" background-color="white" color="red darken-1">
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card flat>
            <v-card-text>
              <component v-bind:is="item.content"></component>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      </template>

    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
  </v-card>

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
  </v-app>
</div>
</template>

<script>
import customerViewDineIn from './components/customerViewDineIn'
import customerViewEvent from './components/customerViewEvent'
import customerViewFeedback from './components/customerViewFeedback'

export default {
  name: 'Customer',
  components:{
    customerViewDineIn,
    customerViewEvent,
    customerViewFeedback
  },
  data() {
    return {
      show1: false,
      dialogSignUp: false,
      tab: null,
      items: [
        { tab: 'Dine In Reservation', content: 'customerViewDineIn' },
        { tab : 'Event Reservation', content: 'customerViewEvent'},
        { tab : 'Feedback', content: 'customerViewFeedback'}
      ],

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