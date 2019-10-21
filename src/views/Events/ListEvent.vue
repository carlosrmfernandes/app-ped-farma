<template>
  <div>
    <h1 class="page-header mb-5">Eventos</h1>
    <div class="row">
      <div class="col-md-5 mb-4">
        <input
          type="text"
          class="form-control"
          placeholder="Pesquisar por localização, patrocinadores, classificação, descrição..."
        />
      </div>
      <div class="row ml-auto">
        <div class="col-md-3 mr-3">
          <button href="#" class="btn btn-primary" title="Ver eventos em lista">
            <i class="fas fa-list"></i>
          </button>
        </div>
        <div class="col-md-3">
          <button href="#" class="btn btn-primary" title="Ver eventos em grelha">
            <i class="fas fa-th"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">Eventos Cadastrados</div>
      <div class="card-body"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
