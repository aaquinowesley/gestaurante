import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemCardapio } from 'src/app/models/ItemCardapio';
import { ItemPedido } from 'src/app/models/ItemPedido';
import { Pedido } from 'src/app/models/Pedido';
import { ItemCardapioService } from 'src/app/services/itemCardapio.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {

  //Validar se o login foi feito por um gerente
  @Input() isGerente: boolean = true;
  @Input() mostrarCardapio!: boolean;

  public title = 'Cardápio';

  pratoSelected!: string;
  public filterCardapio: boolean = false;
  public categoriaSelected: string = '';

  public cardapio: ItemCardapio[] = []

  public itensPedido: ItemPedido [] = []
  public itemPedido!: ItemPedido;

  constructor(
    public modal: MatDialog,
    public itemCardapioService: ItemCardapioService
    ) 
    { }

  ngOnInit(): void {
    this.carregarItensCardapio()
  }

  carregarItensCardapio(){
    this.itemCardapioService.getAll().subscribe(
      (cardapio: ItemCardapio[]) => {
        this.cardapio = cardapio;
      }
    ),
    (error: any) => {
      console.error(error);
    }
  }


  pratoSelect(prato: any){
    this.pratoSelected = prato.nome;
  }

  voltar(){
    this.pratoSelected = '';
  }

  openModalVisualizarPedidoMesa(){
    this.modal.open(ModalVisualizarPedidoMesa)
  }

  addItemPedido(itemCardapio: ItemCardapio) {
    var itemPedidoId = String(Math.floor(Math.random() * (99 - 10) * 10) )
    this.itemPedido = {id: itemPedidoId, qtd: 1, itensCardapio: itemCardapio}
    this.itensPedido.push(this.itemPedido)
  }
}

//Modal de visualizar pedidos de mesa
@Component({
  selector: 'modal-visualizar-pedido-mesa',
  templateUrl: './modal-visualizar-pedido-mesa/modal-visualizar-pedido-mesa.html',
  styleUrls: ['./modal-visualizar-pedido-mesa/modal-visualizar-pedido-mesa.scss']
})

export class ModalVisualizarPedidoMesa {
  constructor(public modalRef: MatDialogRef<ModalVisualizarPedidoMesa>) {}

  onNoClick(): void {
    this.modalRef.close();
  }
}

export class ListSelectionExample {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}

