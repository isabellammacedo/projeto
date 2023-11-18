// import coracaoImg from '../assets/images/coracao.png';

function Agendamento() {
    return (
        <div className="container-fluid">
            <div className="row bg-light justify-content-center">
                <div className="p-5 ml-5 col-6 text-center">
                    <h2 className="text-primary"><strong>Agendar Consulta</strong></h2>
                    <h5 className="informacao mt-2 text-secondary text-center">
                        Preencha o formulário abaixo para agendar sua consulta
                    </h5>
                </div>
                {/* <div className="col-2 my-4">
                    <img src={coracaoImg} alt="Coracao" className="img-fluid" width={150} />
                </div>  */}
            </div>
            <div className="container">
                                
                <div className="row mt-5">
                    <div className="col-8 offset-2">
                        {/* idNutricionista, nome e crn, motivo da consulta */}
                        <form>

                            <div className="row">
                                <div className="my-3 col-9">
                                    <label htmlFor="nutricionista" className="form-label font-weight-bold">
                                        <strong>
                                        Selecione o nutricionista:
                                        </strong>
                                    </label>
                                    <select className="form-select" id="nutricionista" required>
                                        <option value="">Selecione</option>
                                        <option value="1">Ana</option>
                                        <option value="2">João</option>
                                    </select>
                                </div>

                                <div className="my-3 col-3">
                                    <label htmlFor="crnSelecionado" className="form-label font-weight-bold">
                                        <strong>
                                        CRN
                                        </strong>
                                    </label>
                                    <input type="text" value="" className="form-control" id="crnSelecionado" placeholder='CRN' readOnly></input>
                                </div>
                            </div>


                            <div className="my-3 row">
                                <div>
                                    <label htmlFor="motivoConsulta" className="form-label">
                                        <strong>
                                        Conte-nos um pouco sobre o motivo de sua consulta:
                                        </strong>
                                    </label>
                                    <textarea className="form-control" id="motivoConsulta" placeholder='Digite aqui o motivo de sua consulta' rows="3" required ></textarea>
                                </div>
                                <div className="my-2 informacao">
                                    <p>
                                        Essas informações serão enviadas para o nutricionista selecionado, então tente detalhar os motivos que o(a) levaram a agendar esta consulta! 
                                    </p>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary mt-3 text-white col-3">
                                    Agendar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="p-0 m-0 row">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 289">
                    <path fill="#f29f00" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

        </div>
    )
  }
  
  export default Agendamento;