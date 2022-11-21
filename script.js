import contadorCategoria from "./contador.js"
import cadastroDicas    from "./cadastroDicas.js"
const frm = document.querySelector('form') 
const card = document.getElementById('card')
const pesquisa = document.getElementById('pesquisa')
const btnPesquisa = document.getElementById('btnPesquisa')
const btnLimparPesquisa = document.getElementById('btnLimparPesquisa')
let cadastroDedicas = []
let termoPesquisa = ""
localStorage.clear();
const dadosJson = localStorage.getItem('chave-dados')
if (dadosJson) {cadastroDedicas = JSON.parse(dadosJson)}
const categorias = new contadorCategoria()



frm.btLimpar.addEventListener("click", () => {
    frm.reset()

})


function atualizaContador() {

    document.querySelector("#OutTotal").innerText = categorias.total
    document.querySelector("#OutFrontEnd").innerText = categorias.FrontEnd
    document.querySelector("#OutBackEnd").innerText = categorias.BackEnd
    document.querySelector("#OutFullStack").innerText = categorias.FullStack
    document.querySelector("#OutSkill").innerText = categorias.SoftSkill
}



function validaURLYoutube(url) {
    const padrao = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    if(url.match(padrao)){
        return true
    }
    return false
}

function selecionaCategoria(option){
    
    switch(option) {
        case 0:
            return 'FrontEnd'
            break
        case 1:
            return 'BackEnd'
            break
        case 2:
            return 'FullStack'
            break
        case 3:
            return 'SoftSkill'
            break
      }
}


const criarElementosCard = (tag, conteudo) =>{
    const elemento = document.createElement(tag)
    elemento.innerText = conteudo
    return elemento
}



function removerElemento(itemId,categoria){
    
    if (confirm('Deseja confirmar a exclusão?')) {
        categorias.decresceContador(categoria)
        atualizaContador()
        cadastroDedicas = cadastroDedicas.filter(i => i.id !== itemId)
        carregaCard()
        salvarDadosLocalStorage()
    }
    
    
    
}


function salvarDadosLocalStorage(){
    const dadosJson = JSON.stringify(cadastroDedicas)
    localStorage.setItem('chave-dados',dadosJson)
}


function carregaCard() {

    card.innerHTML = ''
    cadastroDedicas
        const termoPesquisado = cadastroDedicas.filter(item =>{
            return item.titulo.toLowerCase().includes(termoPesquisa)
        })
        console.log(termoPesquisado)
        termoPesquisado.forEach(cadastro => {
        
    
        const li = document.createElement('li')
        const container = document.createElement('div')
        const dados = document.createElement('div')
        const botoes = document.createElement('p')

        li.classList.add('cartao')
        container.classList.add('container')
        dados.classList.add('dados')
        botoes.classList.add('botoesCard')



        const titulo = criarElementosCard('h2',cadastro.titulo)
        const skill = criarElementosCard('p',`Linguagem/Skill: ${cadastro.linguagem}`)
        const categoria = criarElementosCard('p',`Categoria:   ${cadastro.categoria}`)
        const descricao = criarElementosCard('p',cadastro.descricao)
        const editar   = criarElementosCard('button','EDITAR')
        const excluir   = criarElementosCard('button','EXCLUIR')
        excluir.addEventListener('click', () => removerElemento (cadastro.id,cadastro.categoria) )
        if (cadastro.url) {
            const url = criarElementosCard('button','URL')
            botoes.appendChild(url)
        }
        
        botoes.appendChild(editar)
        botoes.appendChild(excluir)        
        dados.appendChild(titulo)
        dados.appendChild(skill)
        dados.appendChild(categoria)
        dados.appendChild(descricao)
        dados.appendChild(botoes)
        container.appendChild(dados)
        li.appendChild(container)
        card.appendChild(li)
        

});


    
}

frm.btSalvar.addEventListener("click", () => {


        
    if (frm.inTitulo.value != '' && frm.inSkill.value != '' ){
        const titulo    = frm.inTitulo.value
        const skill     = frm.inSkill.value
        const categoria = selecionaCategoria(Number(document.querySelector('option:checked').value))
        const descricao = frm.inDescricao.value
        const url       = validaURLYoutube(frm.inUrl.value)? frm.inUrl.value : null
        url == null ? alert("Cadastro efetuado sem url") : alert("Cadastro efetuado com sucesso!") 
        categorias.incrementaContador(categoria)
        atualizaContador()
        
        //Atualiza o contador


        //Adiciona elemento ao array de cadastros

        cadastroDedicas.push(new cadastroDicas(titulo,skill,categoria,descricao,url))
        
        
        carregaCard()
        salvarDadosLocalStorage()
}   else{
        alert('Preencha os campos obrigatórios!')
}
   // console.log(JSON.stringify(cadastroTemporario))
    


})


function pesquisaResultado(){
    termoPesquisa = pesquisa.value.toLowerCase()
    carregaCard()

}

function limparPesquisa(){
    pesquisa.value = ""
    termoPesquisa = ""
    carregaCard()

}

btnPesquisa.addEventListener('click',pesquisaResultado)
btnLimparPesquisa.addEventListener('click',limparPesquisa)