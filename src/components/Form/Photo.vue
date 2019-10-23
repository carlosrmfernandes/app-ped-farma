<template>
<div>
<div class="upload-photo__container">
    <div
      class="upload-photo"
      :style="{ height: height, width: width }"
      title="Carregar imagem"
    >
      <!-- Input field -->
      <input
        class="upload-photo__input"
        type="file"
        @change="PreviewFile"
        accept=".jpg, .png, .gif"
        :style="{ height: height, width: width }"
      />
      <!-- Button -->
      <div class="upload-photo__button is-flex__centered-y is-flex__centered-x">
        <div class="button__container is-flex__centered-y is-flex__centered-x">
          <i class="fas fa-plus"></i>
        </div>
      </div>
      <!-- Preview container -->
      <div
        class="previewer"
        :style="'background-image: url(' + imgSrc + ');'"
      ></div>
    </div>
    <span v-if="label" class="upload-photo__label">{{ label }}</span>
  </div>
  <Span class="image-footer">Carregar imagem</Span>
</div>
</template>

<script>
export default {
  name: 'UploadPhoto',
  data () {
    return {
      imgSrc: '',
      isRequesting: false
    }
  },
  props: {
    OnChange: {
      type: Function,
      required: true
    },
    label: {
      type: String
    },
    index: {
      type: Number
    },
    height: {
      type: String,
      default: '60'
    },
    width: {
      type: String,
      default: '60'
    },
    defaultImage: {
      type: String
    }
  },
  methods: {
    /**
     * PreviewFile: This method will read the selected file load it
     * into a previewer container, and then pass
     */
    PreviewFile (event) {
      // Clear the current image in the previewer
      this.imgSrc = ''

      // Instantiate a new FileReader object.
      const Reader = new FileReader()
      const file = event.target.files[0]

      // Read the file into the Reader object
      // in case there is an image selected.
      if (file) {
        Reader.readAsDataURL(file)
      }

      // Load the result from the Reader object into the
      // imgSrc state property.
      Reader.addEventListener(
        'load',
        () => {
          this.imgSrc = Reader.result
        },
        false
      )

      // Pass the input object to a method from the parent component
      this.OnChange(event.target.files[0], this.index)
    }
  },
  created () {
    this.imgSrc = this.defaultImage
  }
}
</script>

<style lang="stylus" scoped>

upload-photo__container
.upload-photo
  width 91px
  height 200px
  cursor pointer
  border-radius 3px
  position relative
  border 1px solid #ABB3C9
  margin-top 10px
  margin-left 15px

.upload-photo__input
  opacity 0
  width 91px
  height 185px
  z-index 700
  cursor pointer
  position absolute

.upload-photo__button
  position relative

.previewer
.upload-photo__button
  width 100%
  height 100%

.button__container
  width 30px
  height 30px
  border-radius 50%
  background-color #ABB3C9
  margin-left 40%
  margin-top 55%

.button__container i
  color #242939
  margin-left 25%
  margin-top 25%

.previewer
  top 0
  left 0
  position absolute
  background-size cover

.upload-photo__label
  display block
  font-size 12px
  margin-top 2px

.image-footer
  margin-left: 12px;
</style>
