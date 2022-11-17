const frm = document.querySelector("form") 


const cadastroDedicas = []

class contadorCategoria  { //migrar para outro script
    constructor(){
    this.FrontEnd  =  0,
    this.BackEnd   =  0,
    this.FullStack =  0,
    this.SoftSkill =  0,
    this.total     =  0
}

    incrementaContador(categoria){
        this.total+=1
        switch(categoria) {
            case 0:
                this.FrontEnd+=1
                break
            case 1:
                this.BackEnd+=1
                break
            case 2:
                this.FullStack+=1
                break
            case 3:
                this.SoftSkill+=1
                break
          }

    }

}
const categorias = new contadorCategoria()



function validaURLYoutube(url) {
    const padrao = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    if(url.match(padrao)){
        return true
    }
    return false
}

function selecionaCategoria(option){
    categorias.incrementaContador(option)
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

frm.btSalvar.addEventListener("click", () => {

    const titulo    = frm.inTitulo.value
    const skill     = frm.inSkill.value
    const categoria = Number(document.querySelector('option:checked').value,categorias)
    const descricao = frm.inDescricao.value
    const url       = validaURLYoutube(frm.inUrl.value)? frm.inUrl.value : null
    categorias.incrementaContador(categoria)
    console.log(categorias.FrontEnd)
    
    //mudar pra outra função depois ex: função atualizaTela

    document.querySelector("#OutTotal").innerText = categorias.total
    document.querySelector("#OutFrontEnd").innerText = categorias.FrontEnd
    document.querySelector("#OutBackEnd").innerText = categorias.BackEnd
    document.querySelector("#OutFullStack").innerText = categorias.FullStack
    document.querySelector("#OutSkill").innerText = categorias.SoftSkill

})

