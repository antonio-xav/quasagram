<template>
  <q-page class="q-pa-md">

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card
      v-for="post in posts"
      :key="post.id"
      class="card-post q-mb-md"
      flat
      bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="~/assets/me1.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">António__Xavier</q-item-label>
          <q-item-label caption>
              {{ post.location }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <q-img
      :src="post.imageUrl"

      />

      <q-card-section>
        <div >{{post.caption}}</div>
        <div class="text-caption text-grey">{{ dateString }}</div>
      </q-card-section>

    </q-card>
      </div>
      <div
        class="col-4 desktop-only">
            <q-item class="fixed">
            <q-item-section avatar>
              <q-avatar size="48px">
                <img src="~/assets/me1.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">António__Xavier</q-item-label>
              <q-item-label caption>
                  António__Xavier
              </q-item-label>
            </q-item-section>
          </q-item>
      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'

export default defineComponent({
  name: 'PageHome',
  setup(){
     const timeStamp = Date.now()
     const dateString = date.formatDate(timeStamp, 'MMMM D h:mmA')
    return{
      date,
      posts:[
        {
          id: 1,
          caption: 'Golden Gate Bridge',
          date: 1684869569338,
          location: 'Maputo, Moçambique',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 2,
          caption: 'Golden Gate Bridge',
          date: 1684869569338,
          location: 'Maputo, Moçambique',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 3,
          caption: 'Golden Gate Bridge',
          date: 1684869569338,
          location: 'Maputo, Moçambique',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 4,
          caption: 'Golden Gate Bridge',
          date: 1684869569338,
          location: 'Maputo, Moçambique',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        }

      ],
      dateString
    }
  }



})
</script>

<style lang="sass">
.q-page
  max-width: 975px
  margin: auto
  .card-post
    .q-img
      min-height: 200px
</style>
