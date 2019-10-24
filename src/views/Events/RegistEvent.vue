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
            <label class="custom-file-label" for="inputGroupFile01">Carregar poster</label>
            <input type="file" class="custom-file-input" id="inputGroupFile01" />
            <small class="form-text text-muted">
              Anexar uma imagem no formato
              <i>JPG, Paisagem 16/9</i>.
            </small>
          </div>
        </div>
        <div class="col-md-3 form-group mt-4">
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputGroupFile01" />
            <label class="custom-file-label" for="inputGroupFile01">Vídeo Promocional</label>
            <small class="form-text text-muted">
              Carregar um vídeo no formato
              <i>MP4, com uma duração de 5 minutos.</i>.
            </small>
          </div>
        </div>
      </div>
      <button class="btn btn-primary">Próximo</button>

      <h2>
        Serviços Adicionais no Evento
        <span class="badge badge-pill badge-info">2</span>
      </h2>

      <div class="row">
        <div class="col-md-9">
          <table class="table table-striped">
            <thead>
              <tr>Sessão 1</tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Casal VIP</th>
                <td>Quantidade</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="localization"
                    placeholder="Ex.: 10"
                  />
                </td>
                <td>Preço</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="price"
                    placeholder="Ex.: 1000"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Solteiro VIP</th>
                <td>Quantidade</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="localization"
                    placeholder="Ex.: 10"
                  />
                </td>
                <td>Preço</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="price"
                    placeholder="Ex.: 1000"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Casal Normal</th>
                <td>Quantidade</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="quatity"
                    placeholder="Ex.: 10"
                  />
                </td>
                <td>Preço</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="price"
                    placeholder="Ex.: 1000"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3>Serviços Extras</h3>

      <div class="row">
        <div class="col-md-9">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th scope="row">Estacionamento</th>
                <td>Preço</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="price"
                    placeholder="Ex.: 1000"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Lounge Bar</th>
                <td>Preço</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="price"
                    placeholder="Ex.: 1000"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button class="btn btn-primary mr-3">Anterior</button>
      <button type="submit" class="btn btn-primary">Enviar</button>

      <h2>
        Patrocinadores
        <span class="badge badge-pill badge-info">3</span>
      </h2>

      <div class="row">
        <input type="text" class="form-control col-md-5" placeholder="Ex.: Nextbss" />
      </div>

      <h3>Disponibilidade dos ingressos</h3>
      <div class="row">
        <div class="col-md-3">
          <input type="date" class="form-control" id="event-date" />
          <small class="form-text text-muted">Início de vendas</small>
        </div>
        <div class="col-md-3">
          <input type="date" class="form-control" id="event-date" />
          <small class="form-text text-muted">Fim de vendas</small>
        </div>
      </div>

      <button class="btn btn-primary mr-3">Anterior</button>
      <button class="btn btn-primary">Próximo</button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
