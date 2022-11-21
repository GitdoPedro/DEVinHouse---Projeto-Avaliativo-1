import contadorCategoria from "./contador.js"
import cadastroDicas    from "./cadastroDicas.js"

const frm = document.querySelector('form') 
const card = document.getElementById('card')
const pesquisa = document.getElementById('pesquisa')
const btnPesquisa = document.getElementById('btnPesquisa')
const btnLimparPesquisa = document.getElementById('btnLimparPesquisa')

let cadastroDedicas = []
let emEdicao = false
let termoPesquisa = ""
const categorias = new contadorCategoria()

localStorage.clear()
const dadosJson = localStorage.getItem('chave-dados')
if (dadosJson) {cadastroDedicas = JSON.parse(dadosJson)}

function salvarDadosLocalStorage(){
    const dadosJson = JSON.stringify(cadastroDedicas)
    localStorage.setItem('chave-dados',dadosJson)
}


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

function editarElemento(item){
    const elemento = cadastroDedicas.find(i => i.id === item) 
    if(item){

        document.getElementById('inTitulo').value = elemento.titulo
        document.getElementById('inSkill').value = elemento.linguagem
        document.getElementById('inDescricao').value = elemento.descricao
        document.getElementById('inUrl').value = elemento.url
        categorias.decresceContador(selecionaCategoria(Number(document.querySelector('option:checked').value)))
        atualizaContador()
        emEdicao = elemento
    }

    carregaCard()
    salvarDadosLocalStorage()



}



function resetarAtributos(btnAtualizar,btnCancelar){
    formEdicao = false
    frm.reset()
    btnAtualizar.setAttribute("hidden","hidden")
    btnCancelar.setAttribute("hidden","hidden")
    document.getElementById('btLimpar').removeAttribute("hidden")
    document.getElementById('btSalvar').removeAttribute("hidden")
}




function carregaCard() {
    card.innerHTML = ''
    
        const termoPesquisado = cadastroDedicas.filter(item =>{
            return item.titulo.toLowerCase().includes(termoPesquisa)
        })
        
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
            excluir.addEventListener('click', () => removerElemento (cadastro,cadastro.categoria) )
            editar.addEventListener('click', ()  => editarElemento(cadastro.id))
        if (cadastro.url) {
            const url = criarElementosCard('a','URL')
            url.href = cadastro.url
            url.setAttribute('target', '_blank')
            url.innerHTML = '<button>URL</button>'
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
        
})    
}



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



frm.btSalvar.addEventListener("click", (e) => {  
    
        
        const titulo    = frm.inTitulo.value
        const skill     = frm.inSkill.value
        const categoria = selecionaCategoria(Number(document.querySelector('option:checked').value))
        const descricao = frm.inDescricao.value
        const url       = validaURLYoutube(frm.inUrl.value)? frm.inUrl.value : null       
        if (titulo != '' && skill != '' ){

            if (emEdicao){
                emEdicao.titulo     = frm.inTitulo.value
                emEdicao.skill      = frm.inSkill.value
                emEdicao.categoria  = selecionaCategoria(Number(document.querySelector('option:checked').value))
                emEdicao.descricao  = frm.inDescricao.value
                emEdicao.url        = validaURLYoutube(frm.inUrl.value)? frm.inUrl.value : null  
                
                url == null ? alert("Cadastro atualizado sem url") : alert("Atualização efetuada com sucesso!") 
                categorias.incrementaContador(categoria)
                atualizaContador()
                carregaCard()
                salvarDadosLocalStorage()

            
            }else{
                cadastroDedicas.push(new cadastroDicas(titulo,skill,categoria,descricao,url))
                categorias.incrementaContador(categoria)
                atualizaContador()
                carregaCard()
                salvarDadosLocalStorage()
  
                url == null ? alert("Cadastro efetuado sem url") : alert("Cadastro efetuado com sucesso!") 
        }}else{
            alert('Preencha os campos obrigatórios!')
}
       
})