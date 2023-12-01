

listaStorage = [];
var contador = 1;

function addListaStorage(nome, sobrenome, senha, gen) {
  var NovoElemento = { id: contador++, nome: nome, sobrenome: sobrenome, senha: senha, genero: gen}; 
  listaStorage.push(NovoElemento); 
  localStorage.setItem('listaStorage', JSON.stringify(listaStorage));
  AtualizarLista();
}

function DadosLista() {
  listaStorage = JSON.parse(localStorage.getItem('ListaStorage'));
}

function AtualizarLista(){
  var Lista = document.getElementById('Lista');
  Lista.innerHTML = '';
  
  const dia = new Date();
  const DataEnvio = dia.toDateString();

  listaStorage.forEach(function (user) {
    var ListaItens = document.createElement('li');
    ListaItens.innerHTML = DataEnvio + " | " + user.nome + " " + user.sobrenome + " | " + '<button onclick="DelItem('+ user.id +')" class="btnApagar"> Apagar </button>' ;
    Lista.appendChild(ListaItens);
  });
}

function DelItem(UsuarioID){
  var NovaLista = listaStorage.filter(function (user) {
    return user.id !== UsuarioID;
  });

    listaStorage = NovaLista;
    localStorage.setItem('listaStorage', JSON.stringify(listaStorage)); 
    AtualizarLista();
}

function DelAll(){
  var NovaLista = [];

  listaStorage = NovaLista;
  localStorage.setItem('listaStorage', JSON.stringify(listaStorage)); 
  AtualizarLista();
     
}

function receberValores(){
       
    if(Ipt_nome.value != "" && Ipt_sobrenome.value != "" && ipt_Senha.value != ""){

      var NomeInput = document.getElementById('Ipt_nome');
      var SobrenomeInput = document.getElementById('Ipt_sobrenome');
      var SenhaInput= document.getElementById('ipt_Senha');

      let genero = document.querySelectorAll(".gen");
      let gen;
      if(genero[0].checked == true){
          gen = "Masculino";
      }else if(genero[1].checked == true){
          gen = "Feminino";
      }else{
          gen = "Outro";
      }

      addListaStorage(NomeInput.value, SobrenomeInput.value, parseInt(SenhaInput.value), gen);
      Ipt_nome.value = null;
      Ipt_sobrenome.value = null;
      ipt_Senha.value = null;
      let rad =  document.querySelectorAll(".gen");
      var i = 0;
      for( i = 0; i < rad.length; i++){
          rad[i].checked = null; 
      }     
    }
 
};

function Pesquisa(){
  lista = JSON.parse(localStorage.getItem('ListaStorage'));
  var Texto = document.getElementById('iptPesq').value; 
  listaStorage = FiltrarItens(lista.value, Texto.value);
  AtualizarLista();

  function FiltrarItens(lista, Texto) {
    return lista.filter((el) => el.toLowerCase().includes(Texto.toLowerCase()));
  }
}


/* Fiz uso do button type = "reset", devido ao fato de que não há valores fixos nas inputs, essa seria uma solução em JS.
function DelCamp(){
  Ipt_nome.value = null;
  Ipt_sobrenome.value = null;
  ipt_Senha.value = null;
  let rad =  document.querySelectorAll(".gen");
  var i = 0;
  for( i = 0; i < rad.length; i++){
      rad[i].checked = null; 
  }     
}
*/




