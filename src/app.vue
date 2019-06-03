<template>
  <!-- App -->
  <f7-app :params="f7params">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left cover theme-dark>
      <f7-view url="/panel-left/"></f7-view>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view" url="/" main class="safe-areas"></f7-view>

  </f7-app>
</template>

<script>
// Import Routes
import routes from './routes.js'

export default {

  //mixins: [gameData],

  mounted() {
    
  },
  
  data() {
    return {
      // Framework7 parameters here
      f7params: {
        id: 'Inc Game', // App bundle ID
        name: 'Inc Game', // App name
        theme: 'auto', // Automatic theme detection
        // App routes
        routes: routes,
      },
      data: {
      }
    }
  }
}
</script>
