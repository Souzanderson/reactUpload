import { useState } from "react";
import "./App.css";
import { UploadComponent } from "./components/Uploadcomponent/Upload.component";

export const  App = () =>  {
  const [fileJson, setFileJson] = useState(null);

  /**
   * Salva os dados do arquivo selecionado em uma variável para enviar ao backend
   * @param evt Dados enviados pelo component UploadComponent para o component App contendo os dados do arquivo selecionado
   * 
   */
  const saveFile = (evt: any) => {
    setFileJson(evt);
  };

  /**
   * Envia os dados ao backend (sem implementação, dica: Usar fetch para fazer um post no backend com o fileJson no body)
   * @param evt Evento de click no botão
   */
  const sendFile = (evt:any) =>{
    evt.preventDefault();
    console.log(fileJson);
  }

  return (
    <div className="App">
      {/* Atenção para o parâmetro acceptTypes que permite selecionar o tipo do documento aceito
          caso não queria limitar os tipos é só apagar o parâmetro, passar vazio ou passar quantos quiser... */}
      <UploadComponent
        onChage={saveFile}
        acceptTypes={[".pdf"]}
      ></UploadComponent>
      <button onClick={sendFile}>
        Enviar
      </button>
    </div>
  );
}
