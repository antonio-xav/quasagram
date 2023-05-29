<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-grey-10"
      bordered
      >

      <!-- ToolBar para telemoveis -->
      <q-toolbar class="mobile-only">
          <q-toolbar-title
            class="text-bold   text-center"
            >
            Quasagram
          </q-toolbar-title>


      </q-toolbar>

      <!-- ToolBar para Desktops -->
      <q-toolbar class="desktop-only constrain q-pa-md ">
        <q-btn
          class="q-mr-sm"
          to="/camera"
          flat
          round
          dense
          icon="eva-camera-outline"
          size="18px"
          />
         <q-separator
            vertical
            spaced
             />

            <!-- Titulo localizado no centro para Desktops -->
          <q-toolbar-title
          class="text-bold   text-left desktop-only"
          >
            Quasagram
          </q-toolbar-title>

        <q-btn
          to="/"
          flat
          round
          dense
          icon="eva-home-outline"
          size="18px"
          />
      </q-toolbar>



    </q-header>
    <q-footer
      class="bg-white mobile-only"
      bordered
      >
             <q-tabs
                class="text-grey-10"
                active-color="primary"
                indicator-color="transparent"
                >
            <q-route-tab
             to="/"

              icon="eva-home-outline"
              />
            <q-route-tab
                to="/camera"
              icon="eva-camera-outline"
              />
          </q-tabs>
         </q-footer>


    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>


export default({
  name: 'MainLayout',


  setup () {
    return {


    }
  }
})
</script>
<style lang="sass">
.q-toolbar
  max-width: 975px
  margin: auto
  .q-toolbar__title
    font-size: 30px
    font-family: 'Grand Hotel', 'Roboto', 'Helvetica Neue', elvetica, Arial, sans-serif

  .q-footer
    .q-tab__icon
      font-size: 30px
</style>

