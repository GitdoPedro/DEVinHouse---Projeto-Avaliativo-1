import contadorCategoria from "./contador.js"
import cadastroDicas    from "./cadastroDicas.js"
const frm = document.querySelector('form') 
const card = document.getElementById('card')
card.innerHTML = ''
const cadastroDedicas = []
const categorias = new contadorCategoria()



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

function carregaCard(cadastro) {

    

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
    if (cadastro.url) {const url = criarElementosCard('button')}
    
        
    dados.appendChild(titulo)
    dados.appendChild(skill)
    dados.appendChild(categoria)
    dados.appendChild(descricao)
    container.appendChild(dados)
    li.appendChild(container)
    card.appendChild(li)

    console.log(card)

    
}

frm.btSalvar.addEventListener("click", () => {

    const titulo    = frm.inTitulo.value
    const skill     = frm.inSkill.value
    const categoria = Number(document.querySelector('option:checked').value)
    const descricao = frm.inDescricao.value
    const url       = validaURLYoutube(frm.inUrl.value)? frm.inUrl.value : null
    url == null ? alert("Cadastro efetuado sem url") : alert("Cadastro efetuado com sucesso!") 
    categorias.incrementaContador(categoria)
    
    
    
    //Atualiza o contador

    document.querySelector("#OutTotal").innerText = categorias.total
    document.querySelector("#OutFrontEnd").innerText = categorias.FrontEnd
    document.querySelector("#OutBackEnd").innerText = categorias.BackEnd
    document.querySelector("#OutFullStack").innerText = categorias.FullStack
    document.querySelector("#OutSkill").innerText = categorias.SoftSkill

    //Adiciona elemento ao array de cadastros

    let cadastroTemporario = new cadastroDicas(titulo,skill,selecionaCategoria(categoria),descricao,url)

    cadastroDedicas.push(cadastroTemporario)
    carregaCard(cadastroTemporario)


})

