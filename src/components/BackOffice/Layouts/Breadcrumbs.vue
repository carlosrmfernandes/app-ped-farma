<template>
  <div class="content-breadcrumb">
    <div class="breadcrumb">
    <!-- <div class="notifications">
        <div class="notification-body">
            <i class="nextbss-notification"></i>
        </div>
    </div> -->
      <!-- <h2>{{atualHeader}}</h2> -->
      <!-- <a class="goBack" @click="$router.go(-1)">
          <span class="arro-left"><i class="fas fa-arrow-left"></i></span>
      </a> -->
      <ul class="breadcrumb_list">
        <li class="li-4" v-for="view in viewsInfo" :key="view.id" :class="{last : view.title == $route.meta.title}" >
          <router-link
            v-if="view.title != $route.meta.title"
            :to="{ name: view.component }"
          >
            {{ view.title }}
          </router-link>
          <span class="breacrumbs__active" v-else>
            {{ view.title }}
          </span>
        </li>
      </ul>
  </div>
  </div>
</template>
<script>
export default {
  name: 'ViewTitle',
  data () {
    return {
      views: [],
      headers: [],
      atualHeader: ''
    }
  },
  computed: {
    viewsInfo () {
      let paths = {}
      this.$route.matched.forEach(view => {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.headers.push(view.meta.title)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.atualHeader = this.headers[0]
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.headers = []
        if (!paths[view.meta.title] && view.meta.title) {
          paths[view.meta.title] = {
            component: view.name ? view.name : view.meta.name,
            title: view.meta['title'] ? view.meta.title : 'Início'
          }
        }
      })
      return paths
    }
  }
}
</script>

<style lang="scss" scoped>
.content-breadcrumb {
  height: 50px;
  top: 0;
  right: 0;
  z-index: 1;
}

.breadcrumb{
 padding-bottom: 0;
}

.breadcrumb h2{
  position: relative;
  top: 30px;
  left: 15px;
  font-weight: bold;
  font-size: 24px;
  color: #FFFFFF;
}
.breadcrumb .arro-left{
  position: relative;
  top: 10px;
  left: 20px;
}

.breadcrumb_list
{
    padding-top: 0px;
    top: 5px;
    position: relative;
    display: flex;
}

.breadcrumb_list li
{
  list-style-type:none;
  display:inline;
  margin-left: 0px;
  font-size: 13px;
}

.breadcrumb_list a
{
  color:#999;
  font-family: 'Open Sans Regular';
  font-size:12px;;
  text-decoration:none;
  position: relative;
}

.breadcrumb_list a:visited
{
  color:#999;
}

.breadcrumb_list a:hover
{
  color:#666;
}

.breacrumbs__active{
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: #363636;
}

.li-4:after
{
  content:"›";
  font-size: 18px;
  padding-left:6px;
  color: #b3b3b3;
  margin-right: 5px;
}

.li-4.last:after
{
  content:"";
  font-size: 18px;
  padding-left:6px;
  color: #b3b3b3;
  margin-right: 5px;
}

.fa, .fas {
    font-size: 20px;
}

.goBack{
  cursor: pointer;
  width: 50px;
}
</style>
