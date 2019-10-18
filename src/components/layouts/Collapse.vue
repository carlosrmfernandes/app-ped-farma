<template>
  <div class="accordion" v-bind:class="{ disabled: !active}">
      <div class="accordion-header" @click="openClose()">
        <span class="accordion-title">{{ title }}</span>
      </div>
      <div class="accordion-body" v-bind:style="{ maxHeight: maxHeight }">
        <div class="accordion-content">
            <slot></slot>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      active: false,
      maxHeight: '0px'
    }
  },
  methods: {
    openClose () {
      let containerHeight = this.$el.querySelector('.accordion-body')
        .offsetHeight
      if (this.active) {
        this.maxHeight = '0px'
      } else {
        this.maxHeight = containerHeight + 100 + 'px'
      }
      this.active = !this.active
    }

  }
}
</script>

<style>

.accordion {
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  background-color: #2e3553;
  cursor: pointer;
}
.accordion .accordion-header {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #2e3553;
  color: #fff;
  transition: all 0.3s ease;
}

.accordion .accordion-header:hover {
  width: 100%;
  height: 40px;
  background-color: #fff;
  color: #2e3553;
}

.accordion .accordion-header:active,
.accordion .accordion-header:focus {
  width: 100%;
  height: 40px;
  color: #2e3553;
  background-color: #fff;
}

.accordion .accordion-header .accordion-title:hover{
  color: #2e3553;
}

.accordion .accordion-header:hover .accordion-title{
  color: #2e3553;
}

.accordion-title {
  left: 10%;
  position: absolute;
    -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.accordion .accordion-body {
  text-align: start;
  box-sizing: border-box;
  width: 100%;
  /* padding: 10px 16px; */
  transition: all 0.3s ease;
  color: #ffffff;
  font-size: 14px;
  cursor: default;
}

.accordion .accordion-body .accordion-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.accordion .accordion-body .accordion-content a {
  width: 100%;
  height: 35px;
  padding-top: 7px;
}
.accordion .accordion-body .accordion-content a:hover {
  width: 100%;
  /* height: 35px; */
  background-color: #fff;
  color: #2e3553;
}

.accordion .accordion-body .accordion-content a span {
  margin-left: 20px;
  margin-top: 30px;
}

.accordion.disabled {
  background-color: #343A4E;
  height: 40px;
}
.accordion.disabled .accordion-header {
  border-bottom: none;
  height: 40px;
  color: #ffffff;
}

.accordion.disabled .accordion-header:hover {
   color: #ffffff;
   height: 40px;
}

.accordion.disabled .accordion-header i {
  transform: rotate(0deg);
}
.accordion.disabled .accordion-body {
  pointer-events: none;
  padding: 0;
  margin-left: 16px;
  opacity: 0;
  max-height: 0px;
  transform: translateY(50px);
}

</style>
