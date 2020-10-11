<template>
    <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">

          <v-list-item
            v-if="item.text"
            :key="item.text"
            link
            router :to="item.route"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="red darken-1"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
          <v-avatar
            size="55px"
            item
            class="mr-3"
          >
            <v-img
               src="../src/assets/cloudcafe.png"
               alt="Vuetify"
             ></v-img></v-avatar>
         
        <span class="hidden-sm-and-down">Cloud Café</span>
      </v-toolbar-title>
      <!--<v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>-->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      
    </v-app-bar>
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
      <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'local_dining', text: 'Orders', route: '/Orders' },
        { icon: 'restaurant', text: 'Dine-in', route: '/Dinein'},
        { icon: 'event_note', text: 'Events', route: '/Events'},
        { icon: 'storage', text: 'Inventory', route: '/Inventory'},
        { icon: 'people', text: 'Employee', route: '/Employee' },
        { icon: 'fastfood', text: 'Items', route: '/Items' },
        { icon: 'payments', text: 'Billing', route: '/Billing' },
        { icon: 'loyalty', text: 'CRM', route: '/CRM'},
        { icon: 'show_chart', text: 'Statistics', route: '/Statistics' },
        { icon: 'star_half', text: 'Feedback', route: '/FeedBack' },
      ],
    }),
  }
</script>

