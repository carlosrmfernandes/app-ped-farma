<template>
  <div>
    <div class="main-header">
      <div class="main-header__heading">Dashboard Cliente</div>
      <div class="col col-9 head-info"></div>
    </div>
    <div class="main-overview">
      <router-link :to="{name: ''}" tag="div" class="overviewcard">
        <div class="overviewcard__status"></div>
        <div class="overviewcard__describe">
          <div class="overviewcard__icon">Usuarios</div>
          <div class="overviewcard__info">30</div>
        </div>
      </router-link>
      <router-link :to="{name: ''}" tag="div" class="overviewcard">
        <div class="overviewcard__status"></div>
        <div class="overviewcard__describe">
          <div class="overviewcard__icon">Produtos</div>
          <div class="overviewcard__info">10000</div>
        </div>
      </router-link>
      <router-link :to="{name: ''}" tag="div" class="overviewcard">
        <div class="overviewcard__status"></div>
        <div class="overviewcard__describe">
          <div class="overviewcard__icon">Fornecedores</div>
          <div class="overviewcard__info">125</div>
        </div>
      </router-link>
      <router-link :to="{name: ''}" tag="div" class="overviewcard">
        <div class="overviewcard__status"></div>
        <div class="overviewcard__describe">
          <div class="overviewcard__icon">Operadores</div>
          <div class="overviewcard__info">12</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {}
  },
  methods: {},
  created () {}
}
</script>
<style style="scss" scoped>
.main-overview {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(265px, 1fr)
  ); /* Where the magic happens */
  grid-auto-rows: 94px;
  grid-gap: 20px;
  margin: 20px;
}

.overviewcard {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 15px 1px rgba(39, 39, 39, 0.1);
  cursor: pointer;
}

.overviewcard__icon {
  display: flex;
  text-align: center;
}

.overviewcard__describe {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex-grow: 1;
}

.overviewcard__status {
  content: "";
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.overviewcard__icon {
  font-family: "Open Sans Regular";
  font-size: 14;
  color: slategray;
}

.overviewcard__info {
  font-family: "Open Sans SemiBold";
  font-size: 26px;
  color: slategray;
}

.chart__label{
  color: #27A7BE;
  font-size: 25px;
}

.chart-row .chart-col:first-child{
  width: 70%;
}

.chart-row .chart-col:last-child{
  width: 28%;
}

.dashboard-card-info {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 1px 7px 14px -5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 0 20px;
}

@media screen and (max-width: 1024px){
  .dashboard-card{
    margin-bottom: 20px;
  }

  .dashboard-card-info {
    width: 100%;
    margin: 0;
  }
}

.card-info-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.card-info-header span {
  color: #555555;
  font-family: "Open Sans SemiBold";
  font-size: 13px;
}

.card-info-body {
  margin: 0;
  margin-top: 20px;
}

@media screen and (max-width: 424px){
  .card-info-body {
    grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
  }
}

.info-body-card {
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #999;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
}

.info-body-card div{
  font-family: 'Open Sans SemiBold';
  font-size: 13px;
  color: #555555;
  margin-bottom: 2px;
}

.val-info {
  display: flex;
  justify-content: space-between;
}

.val-info span{
  font-family: 'Open Sans Regular';
  font-size: 13px;
  color: #555555;
}

.card-legends{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  /* align-items: flex-end; */
}

.card-legends div{
  width: 50px;
  height: 15px;
  border-radius: 4px;
  margin-left: 20px;
}

.card-legends span{
  font-family: 'Open Sans Regular';
  font-size: 12px;
  color: #555555;
}

.card-legends .recepts{
  background-color: #1d72f3;
}

.card-legends .devolutions{
  background-color: #ffc007;
}

.chart-footer{
  width: 100%;
  display: flex;
}

.chart-description{
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-family: 'Open Sans Regular';
  font-size: 14px;
}

.chart-description span{
  font-family: 'Open Sans SemiBold';
  margin-right: 5px;
}

@media screen and (max-width: 424px){
  .chart-description{
    font-size: 10px;
    flex-direction: column;
  }
  .chart-description span{
    font-family: 'Open Sans SemiBold';
    margin-right: 5px;
  }
}
</style>
