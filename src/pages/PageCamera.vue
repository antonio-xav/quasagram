<template>
  <q-page class="q-pa-md">
      <div class="camera-frame q-pa-md">
        <video
        v-show="!imageCaptured"
          ref="video"
          class="full-width"
          autoplay
        />
        <canvas
        v-show="imageCaptured"
          ref="canvas"
          class="full-width"
          height="240"
        />
      </div>

      <div class="text-center q-pa-md">
        <q-btn
        v-if="hasCameraSupport"
            @click="capturaImage"
            round
            color="grey-10"
            icon="eva-camera"
            size="lg"
        />

        <q-file
          v-else
          outlined
          v-model="imageUpload"
          @input="captureImageFallback"
          label="Choose an image"
          accept="image/*"
          >
          <template v-slot:prepend>
              <q-icon  name="eva-attach-outline"/>

          </template>
        </q-file>

        <div class="row justify-center q-pa-md">
          <q-input
            v-model="post.caption"
            class="col col-sm-6"
            label="Caption"
            dense
          />
          </div>

          <div class="row justify-center q-pa-md">
             <q-input
                v-model="post.location"
                :loading="locationLoading"
                dense
                class="col col-sm-6"
                label="Location"
                >
              <template v-slot:append>
               <q-btn
                v-if="!locationLoading && locationSupported"
                @click="getLocation"
                  icon="navigation"
                  dense
                  flat
                  round
                  />
              </template>
            </q-input>

          </div>

        </div>
        <div class="row justify-center q-mt-lg">
          <q-btn
              color="primary"
              label="Post Image"
              rounded
              unelevated
          />
          </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { uid } from 'quasar'
require('md-gum-polyfill')

export default defineComponent({
  name: 'PageCamera',
  data(){
    return {
      post:{
        id:uid(),
        caption:'',
        location:'',
        photo: null,
        date: Date.now()
      },
      imageCaptured: false,
      imageUpload:[],
      hasCameraSupport: true,
      locationLoading: false
    }
  },
  computed:{
    locationSupported(){
      if('geolocation' in navigator) return
      true
      return false
    }

  },
  methods:{
    initCamera(){
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream=>{
        this.$refs.video.srcObject = stream

      }).catch(error=>{
        this.hasCameraSupport = false
      })
    },
    capturaImage(){
        let video = this.$refs.video
        let canvas = this.$refs.canvas
        canvas.width = video.getBoundingClientRect().width
        canvas.height = video.getBoundingClientRect().height
        let context = canvas.getContext('2d')
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        this.imageCaptured = true
        this.post.photo = this.dataURItoBlob(canvas.toDataURL())
        this.disableCamera()
    },
    captureImageFallback(file){
        this.post.photo = file
        //contem a informacao da imagam a ser mostrada no canvas
        var e = file.target.files[0];
          // console.log('file:',e)

            let canvas = this.$refs.canvas
            let context = canvas.getContext('2d')

            var reader = new FileReader()
            reader.onload = event => {
              var img = new Image()
              img.onload = ()=> {
                  canvas.width = img.width
                  canvas.height = img.height
                  context.drawImage(img, 0, 0)
                  this.imageCaptured = true
              }
              img.src = event.target.result

          }
          reader.readAsDataURL(e)

    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track =>{
        track.stop()
      })


    },
      dataURItoBlob(dataURI) {
          // convert base64 to raw binary data held in a string
          // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
          var byteString = atob(dataURI.split(',')[1]);

          // separate out the mime component
          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

          // write the bytes of the string to an ArrayBuffer
          var ab = new ArrayBuffer(byteString.length);

          // create a view into the buffer
          var ia = new Uint8Array(ab);

          // set the bytes of the buffer to the correct values
          for (var i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
          }

          // write the ArrayBuffer to a blob, and you're done
          var blob = new Blob([ab], {type: mimeString});
          return blob;

    },
    getLocation(){
      //geocode.xyz
      this.locationLoading = true
      navigator.geolocation.getCurrentPosition(position =>{
        this.getCityAndCountry(position)
      }, err =>{
        console.log('erro:', err)
        this.locationError()
      }, { timeout: 7000 })

    },
    getCityAndCountry(position){
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      let apiUrl=`https://nominatim.openstreetmap.org/reverse?format=json&lat=${ latitude }&lon=${ longitude }`
      this.$axios.get(apiUrl).then(result =>{
        //console.log('result:', result)
         this.locationSucess(result)
      }).catch(err =>{
        console.log('err: ', err)
      })
     },
     locationSucess(result){
        this.post.location = result.data.address.city
        // const cidade = result.data.address.city
        // console.log("cidade:", cidade)
        if (result.data.address.country){
          this.post.location += `, ${ result.data.address.country}`
        }
        this.locationLoading = false
     },
     locationError(){
      this.$q.dialog({
        title: 'Error',
        message: 'Could not find your location.'
      })
      this.locationLoading = false

     }
  },




  mounted(){
    this.initCamera()
    // console.log('navigator:', navigator)

  }
})
</script>

<style lang="sass">
.camera-frame
      border: 2px solid $grey-10
      border-radius: 10px

.q-page
  max-width: 600px
  margin: auto


</style>
