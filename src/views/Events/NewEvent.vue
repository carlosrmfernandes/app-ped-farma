<template>
  <div>
    <h1>Novo Evento</h1>
    <h2>
      Identificação do Evento
      <span class="badge badge-pill badge-info">1</span>
    </h2>
    <hr />
    <div>
      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Nome</label>
            <input type="text" class="form-control" id="event-name" placeholder="Nome do evento" />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-class">Classificação</label>
            <select id="event-class" class="form-control">
              <option selected>E - Everyone</option>
              <option>T – Tee</option>
              <option>A – Adult</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for>Sessão</label>
            <div class="row">
              <div class="col-md-4">
                <input type="text" class="form-control" id="localization" placeholder="Localização" />
                <small class="form-text text-muted">Localização do evento</small>
              </div>
              <div class="col-md-3">
                <input type="date" class="form-control" id="event-date" />
                <small class="form-text text-muted">Data do evento</small>
              </div>
              <div class="col-md-4">
                <input type="time" class="form-control" id="event-time" />
                <small class="form-text text-muted">Hora do evento</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for>Detalhes</label>
            <div class="form-group">
              <textarea class="form-control" rows="4" placeholder="Descrição do evento"></textarea>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Nome</label>
            <input type="text" class="form-control" id="event-name" placeholder="Nome do evento" />
          </div>
        </div>
        <div class="col-md-3 form-group mt-4">
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputGroupFile01" />
            <label class="custom-file-label" for="inputGroupFile01">Carregar poster</label>
            <small class="form-text text-muted">
              Anexar uma imagem no formato
              <i>JPG, Paisagem 16/9</i>.
            </small>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Próximo</button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
</style>
