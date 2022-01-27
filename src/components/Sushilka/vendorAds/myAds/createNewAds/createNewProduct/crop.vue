<template>
    <div>
        <!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
        <vue-croppie 
            ref="croppieRef" 
            :enableOrientation="true"
            :boundary="{ width: 300, height: 300}"
            @result="result"
            @update="update">
        </vue-croppie>

        <!-- the result -->
        <img style ="margin-left:110px" v-bind:src="cropped">

        <!-- <button @click="bind()">Bind</button> -->
        <!-- Rotate angle is Number -->
        <v-row>
            <v-col>

            
        <button class ="mx-2" @click="rotate(-90)">Повернуть налево</button>
        <button class ="mx-2" @click="rotate(90)">Повернуть направо</button>
        <button  @click="crop()">Отобразить результат</button>
        </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: {
    dataPhoto: {
      type: Object,
      default: null
    },
    },
    mounted() {
        // Upon mounting of the component, we accessed the .bind({...})
        // function to put an initial image on the canvas.
        this.$refs.croppieRef.bind({
            url: this.dataPhoto,
        })
    },
    data() {
        return {
            cropped: null,
            images: [
                'http://i.imgur.com/fHNtPXX.jpg',
                'http://i.imgur.com/ecMUngU.jpg',
                'http://i.imgur.com/7oO6zrh.jpg',
                'http://i.imgur.com/miVkBH2.jpg'
            ],
            options : {
                format: 'jpeg', 
                circle: true
            }
        }
    },
    methods: {
        // bind() {
        //     // Randomize cat photos, nothing special here.
        //     let url = this.images[Math.floor(Math.random() * 4)]

        //     // Just like what we did with .bind({...}) on 
        //     // the mounted() function above.
        //     this.$refs.croppieRef.bind({
        //         url: url,
        //     });
        // },
        // CALBACK USAGE
        crop() {
            // Here we are getting the result via callback function
            // and set the result to this.cropped which is being 
            // used to display the result above.
            
            this.$refs.croppieRef.result(this.options, (output) => {
                this.cropped = output;
            });
        },
        result(output) {
            this.cropped = output;
        },
        update(val) {
            console.log(val);
        },
        rotate(rotationAngle) {
            // Rotates the image
            this.$refs.croppieRef.rotate(rotationAngle);
        }
    }
}
</script>