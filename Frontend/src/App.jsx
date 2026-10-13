
import { useState } from "react";
import "./App.css";
import minhaLogo from "./assets/minha_logo.png";
import logoHorizonte from "./assets/images.jpg";
function App() {
  const [matricula, setMatricula] = useState("");
  const [dados, setDados] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mes,setMes] = useState('')
  const MATRICULA_REGEX = /^[0-9]{3,20}$/;
  
  async function req() {
    const m = matricula.trim();

    if (!MATRICULA_REGEX.test(m)) {
      setMessage("Matrícula inválida");
      setDados(null);
      return;
    }
    
    setDados(null)
    setMessage("");
    setLoading(true);

    try {
      if(!mes){
        setMessage('Selecione Um MÊS!')
        return;
      }
      const response = await fetch("https://horizonte-api-consulta-001-admin1234.onrender.com/read", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          matricula: m,mes:mes
        })
      });

      const data = await response.json();

      console.log(data.dados);
      console.log('esse e o data.dados')
      if (!response.ok) {
        setMessage(data.message || "Erro ao consultar matrícula");
        setDados(null);
        return;
      }

      setDados(data.dados);
    } catch (error) {
      console.error(error);
      setMessage("Não foi possível conectar ao servidor");
      setDados(null);
    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="pagina">

      <div className="container">

        <div className="cabecalho">
          <div className="horizonte"> <img src={logoHorizonte}></img> </div>
         
          <h1>Consultas de RV / Diarias</h1>
          <p>Digite sua matrícula para consultar suas informações.</p>
        </div>
        <div className="seletor-mes">
    <label htmlFor="mes">Selecione o mês:</label>

    <select
        id="mes"
        value={mes}
        onChange={(e) => setMes(e.target.value)}
    >
        <option value="">Selecione um mês</option>
        <option value="janeiro">Janeiro</option>
        <option value="fevereiro">Fevereiro</option>
        <option value="março">Março</option>
        <option value="abril">Abril</option>
        <option value="maio">Maio</option>
        <option value="junho">Junho</option>
        <option value="julho">Julho</option>
        <option value="agosto">Agosto</option>
        <option value="setembro">Setembro</option>
        <option value="outubro">Outubro</option>
        <option value="novembro">Novembro</option>
        <option value="dezembro">Dezembro</option>
    </select>
</div>
        <div className="consulta">
          <input
            placeholder="Insira sua matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />

          <button onClick={req}>
            Consultar
          </button>
        </div>

        {loading && (
          <div className="carregando">
            <span className="spinner"></span>
            <span>Aguarde, consultando seus dados...</span>
          </div>
        )}

        {message && (
          <p className="mensagem">
            {message}
          </p>
        )}

        {dados && (
          <div className="tabela-container">

            <table>
              <thead>
                <tr>
                  <td>p/ MÊS</td>
                  <th>Matrícula</th>
                  <th>Nome</th>
                  <th>Dias a Serem Reabastecidos</th>
                  <th>Diarias Valor Total</th>
                  <th>RV viagems</th>
                  <th>Disel / combustivel</th>
                  <th>Seguranca</th>
                  <th>sua Jornada</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{dados.mes}</td>
                  <td>{dados.matricula}</td>
                  <td>{dados.nome}</td>    
                  <td>{dados.dias_a_serem_reabastecidos}</td>
                  <td>R$ {dados.valorTotal}</td>
                  <td>R$ {dados.justificativa?.RV_Viagems ?? 0}</td>
                  <td>R$ {dados.justificativa?.Disel ?? 0} </td>
                  <td>R$ {dados.justificativa?.seguranca ?? 0} </td>
                  <td>R$ {dados.justificativa?.jornada ?? 0}</td>
                </tr>
              </tbody>
            </table>

          </div>
        )}

      </div>
    <footer className="rodape">
  <div className="rodape-conteudo">
    <div className="rodape-identidade">
      <img
        src={minhaLogo}
        alt="Logo Kalebz Dev"
        className="rodape-logo"
      />

      <div className="rodape-textos">
        <span className="rodape-legenda">Desenvolvedor</span>

        <h3>
          Kalebz<span className="rodape-destaque">_Dev</span>
        </h3>

        <p>
          Desenvolvendo soluções digitais com tecnologia,
          criatividade e dedicação.
        </p>
      </div>
    </div>

    <div className="rodape-divisor"></div>

    <div className="rodape-final">
      <span>
        © {new Date().getFullYear()} Kalebz_Dev
      </span>

      <span className="rodape-assinatura">
        08/10/2026
      </span>
    </div>
  </div>
</footer>
    </div>
    
  );
}

export default App;

