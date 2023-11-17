function Agendamento() {
    return (
        <div className="container">
            <div className="row">
            <div className="col-md-8 offset-md-2">
                <h2>Agendar Consulta</h2>
                {/* idNutricionista, nome e crn, motivo da consulta */}
                <form>
                    <div class="mb-3">
                        <label for="nutricionista" class="form-label">
                            Selecione o nutricionista:
                        </label>
                        <select class="form-select" id="nutricionista" required>
                            <option value="">Selecione</option>
                            <option value="1">Ana</option>
                            <option value="2">João</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="crnSelecionado" class="form-label">
                            CRN
                        </label>
                        <input type="text" value="" class="form-control" id="crnSelecionado" placeholder='CRN do nutricionista selecionado' readonly></input>
                    </div>

                    <div class="mb-3">
                        <label for="motivoConsulta" class="form-label">
                            Conte-nos um pouco sobre o motivo de sua consulta:
                        </label>
                        <textarea class="form-control" id="motivoConsulta" placeholder='Digite aqui o motivo de sua consulta' rows="3" required ></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary mt-3 text-white">
                        Agendar
                    </button>
                </form>
            </div>
            </div>
        </div>
    )
  }
  
  export default Agendamento;