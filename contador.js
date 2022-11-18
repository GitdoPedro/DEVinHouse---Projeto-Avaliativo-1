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