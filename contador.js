export default class contadorCategoria  { 
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
            case 'FrontEnd':
                this.FrontEnd+=1
                break
            case 'BackEnd':
                this.BackEnd+=1
                break
            case 'FullStack':
                this.FullStack+=1
                break
            case 'SoftSkill':
                this.SoftSkill+=1
                break
          }

    }

    decresceContador(categoria){
        this.total-=1
        switch(categoria) {
            case 'FrontEnd':
                this.FrontEnd-=1
                console.log(this.FrontEnd)
                break
            case 'BackEnd':
                this.BackEnd-=1
                console.log(categoria)
                break
            case 'FullStack':
                this.FullStack-=1
                console.log(categoria)
                break
            case 'SoftSkill':
                this.SoftSkill-=1
                console.log(categoria)
                break
          }

    }

}