import { useEffect, useRef, useState } from "react";
import "./upload.style.css";

/**
 * Interfaces determinam quais as opções são aceitas por um objeto,
 * Elas servem como um tipo e o objeto torna-se obrigado a
 * implementar o que a interface exigir. (ler mais sobre padrão de projeto Interface)
 */
interface UploadComponentInterface {
  filename?: string;
  acceptTypes?: string[];
  onChage: (file: any) => void;
}

/**
 *
 * @param Parâmetros do tipo UploadComponentInterface
 * @returns Retorna o component para ser usado
 */
export const UploadComponent = ({
  filename = "",
  acceptTypes = [],
  onChage,
}: UploadComponentInterface) => {
  const uploadRef = useRef<any>();
  const [, setSelected] = useState(null);
  const [namefile, setNameFile] = useState("");
  const [error, setError] = useState<String>("");

  /**
   * hookie que roda quando a renderização é iniciada ou quando o objeto
   * filename passado por parâmetro é modificado
   */
  useEffect(() => {
    if (!filename) {
      setNameFile("");
      setSelected(null);
    }
  }, [filename]);

  /**
   * Handle que trata o evento de mudança no input (ou seja, um arquivo foi selecionado ou arrastado pra caixa de upload)
   * @param evt Evento de onChange do input do tipo file
   */
  const onFileChange = (evt: any) => {
    reader(evt.target.files[0]);
  };

  /**
   * Reader é uma função que verfiica o tipo do arquivo e realiza o upload do mesmo criando um leitor
   * de arquivos temporário em memória chamado FileReader.
   * @param file_data dados do arquivo que foi arrastado/buscado pela sessão de upload
   */
  const reader = (file_data: any) => {
    /**
     * Se nenhum tipo foi passado como obrigatório o uploader aceitará todo tipo de arquivo, se um tipo
     * for passado como parâmetro, o uploader aceitará apenas os tipos passados
     */
    if (
      acceptTypes.length === 0 ||
      acceptTypes.filter(
        (e) =>
          String(file_data.name).toUpperCase().indexOf(e.toUpperCase()) > -1
      ).length > 0
    ) {
      //seta os dados do arquivo selecionado
      setSelected(file_data);
      //seta o noem do arquivo selecionado
      setNameFile(file_data.name);
      //cria um leitor na memória
      let reader = new FileReader();
      //armazena o arquivo em uma variável
      let file = file_data;
      // dica: abra o console do navegador com f12 para ver os resultados em tempo real
      console.log(file);
      // prepara o evento de carregamento do arquivo no leitor de arquivo. Evento: onload
      reader.onload = (event_value) => {
        // Quando o arquivo terminar de ser carregado ele vai chamar a função de callback onload 
        // e devolve o arquivo pra fora do componente filho
        onChage({
          name: file_data.name,
          file: event_value.target?.result,
        });
      };
      //define o tipo de leitura do arquivo, neste caso vai ser base64 = readAsDataURL
      reader.readAsDataURL(file);
      //limpa a variável de erro
      setError("");
    } else {
      //caso o tipo esteja incorreta ele aciona a variável de erro com uma mensagem
      setError("Tipo de arquivo NÃO ACEITO!");
      //seta os dados do arquivo selecionado
      setSelected(null);
      //seta o noem do arquivo selecionado
      setNameFile("");
    }
  };

  // Evita os padrões de drag em drop do navegador (arrastar e soltar o arquivo dentro do navegador)
  const onDragOver = (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
  };
  // Evita os padrões de drag em drop do navegador (arrastar e soltar o arquivo dentro do navegador)
  const onDragLeave = (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
  };
  // Evita os padrões de drag em drop do navegador (arrastar e soltar o arquivo dentro do navegador)
  // chama o método de leitura de arquivos (arquivo foi arrastado pra div de upload)
  const onDrop = (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      reader(files[0]);
    }
  };

  return (
    <div
      id="uploadcomponent"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        onChange={onFileChange}
        hidden
        ref={uploadRef}
        accept={acceptTypes.join(",")}
      />
      <div className="filename">
        {namefile
          ? "Arquivo Selecionado: " + namefile
          : "Nenhum arquivo selecionado! "}
        <br />
        <br />
        {namefile
          ? null
          : "Para realizar Upload clique no botão abaixo, ou arraste o arquivo para esta janela!"}
        <br />
        <br />
        <b>
          {acceptTypes.length > 0 && !namefile
            ? "Tipos aceitos: " + acceptTypes.join(", ")
            : null}
        </b>
        <br/>
        
        {error
            ? <div className="errortype">{error}</div>
            : null}
      </div>
      <button onClick={(evt) => uploadRef.current.click()}>
        Selecionar Arquivo
      </button>
    </div>
  );
};
