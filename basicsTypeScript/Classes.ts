import Interface from './BasicInterfaceCode';

class myClass implements Interface {

  private atributo: number;
  public atributo2: boolean;
  protected atributo3: Object;  

  constructor(params: number) {
    this.atributo = params;
  }


  imprimir(message: string): void {
    console.log(message);
  }

  soma(a: number, b: number ): void {
    console.log(a + b);
  }
}

const novo = new myClass(12);

novo.imprimir('teste');


export default myClass;