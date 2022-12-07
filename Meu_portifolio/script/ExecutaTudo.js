var tela = document.querySelector("canvas");
var pincel = tela.getContext('2d');
var player = new Player(250, 0, 800, 400);
var escrita = new Escrita();
var Menu = new Geral(0, 0, 600, 720, "img/Tretris_Menu.png");
var Game0ver = new Geral(0, 0, 600, 720, "img/Tretris_GO.png");
var Instrucoes = new Geral(0, 0, 600, 720, "img/Tretris_HTP.png");
var mapa = new Mapa();
var posy = [];
var posy1 = [];
var posx = [];
var posx1 = [];
var posy3 = [];
var posy4 = [];
var posx3 = [];
var posx4 = [];
var tamanhox1 = [];
var tamanhox2 = [];
var tamanhox3 = [];
var tamanhox4 = [];
var tamanhoy1 = [];
var tamanhoy2 = [];
var tamanhoy3 = [];
var tamanhoy4 = [];
var tamy11 = [];
var tamy22 = [];
var Bloco = [];
var rot90 = [];
var rot180 = [];
var rot270 = [];
var jaComp = [];
var quantosY = [0, 0, 0, 0, 0];
var posicaoy = 0;
var posicaoy1 = 0;
var posicaox = 0;
var posicaox1 = 0;
var posicaoy3 = 0;
var posicaoy4 = 0;
var posicaox3 = 0;
var posicaox4 = 0;
var tamanhodex1 = 0;
var tamanhodex2 = 0;
var tamanhodex3 = 0;
var tamanhodex4 = 0;
var tamanhodey1 = 0;
var tamanhodey2 = 0;
var tamanhodey3 = 0;
var tamanhodey4 = 0;
var tamyde1 = 0
var tamyde2 = 0;
var Bloco1 = 0;
var rotacao90 = false;
var rotacao180 = false;
var rotacao270 = false;
var inicio = false;
var fim = false;
var Interv;
var Interv1;
var Interv2;
var Interv3;
var ControlaArray;
var guardavalory = 0;
var BG_Jogo = new Som("Fundo");
var BG_Menu = new Audio();
var BG_GO = new Som("GameOver"); 
var HIT = new Som("Hit");
var Perdeu_Aux = false;
var howtoplay = false;
var Entrouaqui=false;
var PodeVoltarDireita=false;

document.addEventListener("keydown", function (event) {
   if (event.key === "d" || event.key === "D" || event.key === 'ArrowRight') {
      player.direita = true;
   }

   if (event.key === "a" || event.key === "A" || event.key === 'ArrowLeft') {
      player.esquerda = true;
   }

   if (event.key === "s" || event.key === "S" || event.key === 'ArrowDown') {
      player.baixo = true;
   }
   if (event.key === "t" || event.key === "T") {//um debug(pausa o codigo)
      alert("Aperte Ok ou enter para voltar para o jogo");
   }
});
document.addEventListener("keyup", function (event) {
   if (event.key === "d" || event.key === "D" || event.key === 'ArrowRight') {
      player.direita = false;
   }

   if (event.key === "a" || event.key === "A" || event.key === 'ArrowLeft') {
      player.esquerda = false;
   }
   if (event.key === "w" || event.key === "W" || event.key === 'ArrowUp') {
      if (player.Condicao) {
         if (!player.rotate90 && !player.rotate180 && !player.rotate270)
            player.rotate90 = true;

         else if (player.rotate90 && !player.rotate180 && !player.rotate270) {
            player.rotate90 = false;
            player.rotate180 = true;
         }
         else if (!player.rotate90 && player.rotate180 && !player.rotate270) {
            player.rotate180 = false;
            player.rotate270 = true;
         }
         else if (!player.rotate90 && !player.rotate180 && player.rotate270) {
            player.rotate180 = false;
            player.rotate270 = false;
         }

      }

   }
   if (event.key === "s" || event.key === "S" || event.key === 'ArrowDown') {
      player.baixo = false;
   }
});
function SomBugado(){
   BG_Menu.src = "audio/Menu.wav";
}
SomBugado();

function DesenhaBlocoChao() {

   if (player.chegounochao && !Perdeu_Aux) {
      HIT.Toca();
      posy.push(player.y);//salva o valor das peças no momento em que colide no chao
      posy1.push(player.y2);
      posx.push(player.x);
      posx1.push(player.x2);
      posy3.push(player.y3);
      posy4.push(player.y4);
      posx3.push(player.x3);
      posx4.push(player.x4);
      tamanhox1.push(player.tamtotalx1);
      tamanhox2.push(player.tamtotalx2);
      tamanhox3.push(player.tamtotalx3);
      tamanhox4.push(player.tamtotalx4);
      tamanhoy1.push(player.tamtotaly1);
      tamanhoy2.push(player.tamtotaly2);
      tamanhoy3.push(player.tamtotaly3);
      tamanhoy4.push(player.tamtotaly4);
      Bloco.push(player.TamBloco);
      rot90.push(player.rotate90);
      rot180.push(player.rotate180);
      rot270.push(player.rotate270);
      tamy11.push(player.interferetamy1);
      tamy22.push(player.interferetamy2);
      player.y = -50;//"cria" um novo bloco
      player.Sorteio = true;//sorteia o novo bloco
      player.chegounochao = false;

   }
   posicaoy = player.y;//salva o valor do bloco em movimento 
   posicaoy1 = player.y2;
   posicaox = player.x;
   posicaox1 = player.x2;
   posicaoy3 = player.y3;
   posicaoy4 = player.y4;
   posicaox3 = player.x3;
   posicaox4 = player.x4;
   tamanhodex1 = player.tamtotalx1;
   tamanhodex2 = player.tamtotalx2;
   tamanhodex3 = player.tamtotalx3;
   tamanhodex4 = player.tamtotalx4;
   tamanhodey1 = player.tamtotaly1;
   tamanhodey2 = player.tamtotaly2;
   tamanhodey3 = player.tamtotaly3;
   tamanhodey4 = player.tamtotaly4;
   Bloco1 = player.TamBloco;//qual o bloco em movimento
   rotacao90 = player.rotate90;
   rotacao180 = player.rotate180;
   rotacao270 = player.rotate270;


   
   player.condParaColisao = false;
   for (var i = 0; i <= posy.length; i++) {//aqui acontece a magica. Nesse for que as colisoes são feitas e é desenhado os blocos que ja foram
      quantosY = [0, 0, 0, 0, 0];
     
      player.y = posy[i];
      player.y2 = posy1[i];
      player.x = posx[i];//desenha os blocos que já foram
      player.x2 = posx1[i];
      player.y3 = posy3[i];
      player.y4 = posy4[i];
      player.x3 = posx3[i];
      player.x4 = posx4[i];
      player.tamtotalx1 = tamanhox1[i];
      player.tamtotalx2 = tamanhox2[i];
      player.tamtotalx3 = tamanhox3[i];
      player.tamtotalx4 = tamanhox4[i];
      player.tamtotaly1 = tamanhoy1[i];
      player.tamtotaly2 = tamanhoy2[i];
      player.tamtotaly3=tamanhoy3[i];
      player.tamtotaly4=tamanhoy4[i];
      player.TamBloco = Bloco[i];
      player.rotate90 = rot90[i];
      player.rotate180 = rot180[i];
      player.rotate270 = rot270[i];
      player.interferetamy1 = tamy11[i];
      player.interferetamy2 = tamy22[i];
      player.QuantosTemEmY = 0;
      tamanhoy1[i]=posy[i]-50;
      tamanhoy2[i]=posy1[i]-50;
      tamanhoy3[i]=posy3[i]-50;
     tamanhoy4[i]=posy4[i]-50;


     
  

     if (tamanhoy1[i] <= posicaoy && posy[i] >= posicaoy && posicaoy >= 0 && tamanhoy1[i] > 0 && posicaox == tamanhox1[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy1[i] <= posicaoy1 && posy[i] >= posicaoy1 && posicaoy1 >= 0 && tamanhoy1[i] > 0 && posicaox1 == tamanhox1[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy1[i] <= posicaoy3 && posy[i] >= posicaoy3 && posicaoy1 >= 0 && tamanhoy1[i] > 0 && posicaox3 == tamanhox1[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy1[i] <= posicaoy4 && posy[i] >= posicaoy4 && posicaoy1 >= 0 && tamanhoy1[i] > 0 && posicaox4 == tamanhox1[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy2[i] <= posicaoy && posy1[i] >= posicaoy && posicaoy1 >= 0 && tamanhoy2[i] > 0 && posicaox == tamanhox2[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy2[i] <= posicaoy1 && posy1[i] >= posicaoy1 && posicaoy1 >= 0 && tamanhoy2[i] > 0 && posicaox1 == tamanhox2[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy2[i] <= posicaoy3 && posy1[i] >= posicaoy3 && posicaoy1 >= 0 && tamanhoy2[i] > 0 && posicaox3 == tamanhox2[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy2[i] <= posicaoy4 && posy1[i] >= posicaoy4 && posicaoy1 >= 0 && tamanhoy2[i] > 0 && posicaox4 == tamanhox2[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy3[i] <= posicaoy && posy3[i] >= posicaoy && posicaoy1 >= 0 && tamanhoy3[i] > 0 && posicaox == tamanhox3[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy3[i] <= posicaoy1 && posy3[i] >= posicaoy1 && posicaoy1 >= 0 && tamanhoy3[i] > 0 && posicaox1 == tamanhox3[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy3[i] <= posicaoy3 && posy3[i] >= posicaoy3 && posicaoy1 >= 0 && tamanhoy3[i] > 0 && posicaox3== tamanhox3[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy3[i] <= posicaoy4 && posy3[i] >= posicaoy4 && posicaoy1 >= 0 && tamanhoy3[i] > 0 && posicaox4 == tamanhox3[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy4[i] <= posicaoy && posy4[i] >= posicaoy && posicaoy1 >= 0 && tamanhoy4[i] > 0 && posicaox == tamanhox4[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy4[i] <= posicaoy1 && posy4[i] >= posicaoy1 && posicaoy1 >= 0 && tamanhoy4[i] > 0 && posicaox1 == tamanhox4[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy4[i] <= posicaoy3 && posy4[i] >= posicaoy3 && posicaoy1 >= 0 && tamanhoy4[i] > 0 && posicaox3== tamanhox4[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy4[i] <= posicaoy4 && posy4[i] >= posicaoy4 && posicaoy1 >= 0 && tamanhoy4[i] > 0 && posicaox4 == tamanhox4[i] && posicaoy1 >= 0&& !player.chegounochao) {
        
     player.condParaEsquerda=false;
     Entrouaqui=true;
   }
   if(!Entrouaqui){
     player.condParaEsquerda=true;
   }
   console.log("AQUI ESTOU "+ posx1[i]);
   if (tamanhoy1[i] <= posicaoy && posy[i] >= posicaoy && posicaoy >= 0 && tamanhoy1[i] > 0 && tamanhodex1 == posx[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy1[i] <= posicaoy1 && posy[i] >= posicaoy1 && posicaoy1 >= 0 && tamanhoy1[i] > 0 && tamanhodex2 == posx1[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy1[i] <= posicaoy3 && posy[i] >= posicaoy3 && posicaoy1 >= 0 && tamanhoy1[i] > 0 && tamanhodex3 == posx3[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy1[i] <= posicaoy4 && posy[i] >= posicaoy4 && posicaoy1 >= 0 && tamanhoy1[i] > 0 && tamanhodex4 == posx4[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy2[i] <= posicaoy && posy[i] >= posicaoy && posicaoy1 >= 0 && tamanhoy2[i] > 0 && tamanhodex1 == posx[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy2[i] <= posicaoy1 && posy[i] >= posicaoy1 && posicaoy1 >= 0 && tamanhoy2[i] > 0 &&tamanhodex2 == posx1[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy2[i] <= posicaoy3 && posy[i] >= posicaoy3 && posicaoy1 >= 0 && tamanhoy2[i] > 0 && tamanhodex3 == posx3[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy2[i] <= posicaoy4 && posy[i] >= posicaoy4 && posicaoy1 >= 0 && tamanhoy2[i] > 0 && tamanhodex4 == posx4[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy3[i] <= posicaoy && posy[i] >= posicaoy && posicaoy1 >= 0 && tamanhoy3[i] > 0 && tamanhodex1 == posx[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy3[i] <= posicaoy1 && posy[i] >= posicaoy1 && posicaoy1 >= 0 && tamanhoy3[i] > 0 && tamanhodex2 == posx1[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy3[i] <= posicaoy3 && posy[i] >= posicaoy3 && posicaoy1 >= 0 && tamanhoy3[i] > 0 && tamanhodex3 == posx3[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy3[i] <= posicaoy4 && posy[i] >= posicaoy4 && posicaoy1 >= 0 && tamanhoy3[i] > 0 && tamanhodex4 == posx4[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy4[i] <= posicaoy && posy[i] >= posicaoy && posicaoy1 >= 0 && tamanhoy4[i] > 0 && tamanhodex1 == posx[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy4[i] <= posicaoy1 && posy[i] >= posicaoy1 && posicaoy1 >= 0 && tamanhoy4[i] > 0 && tamanhodex2 == posx1[i] && posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy4[i] <= posicaoy3 && posy[i] >= posicaoy3 && posicaoy1 >= 0 && tamanhoy4[i] > 0 && tamanhodex3 == posx3[i]&& posicaoy1 >= 0&& !player.chegounochao||
      tamanhoy4[i] <= posicaoy4 && posy[i] >= posicaoy4 && posicaoy1 >= 0 && tamanhoy4[i] > 0 && tamanhodex4 == posx4[i] && posicaoy1 >= 0&& !player.chegounochao) {
       // console.log("AQUI ESTOU EU");
     player.condParaDireita=false;
     PodeVoltarDireita=true;
   }
   if(!PodeVoltarDireita){
     player.condParaDireita=true;
   }

        

      //colisao acontece aqui
      if (tamanhoy1[i] <= posicaoy && posy[i] >= posicaoy && posicaoy >= 0 && tamanhoy1[i] > 0 && posicaox < tamanhox1[i] && tamanhodex1 > posx[i] && !player.chegounochao && posicaoy1 >= 0) {
         player.direita = false;
         player.esquerda = false;
         player.chegounochao = true;
         //HIT.Toca();

      }
      else if (tamanhoy1[i] <= posicaoy1 && posy[i] >= posicaoy1 && posicaoy1 >= 0 && tamanhoy1[i] > 0 && posicaox1 < tamanhox1[i] && tamanhodex2 > posx[i] && !player.chegounochao && posicaoy1 >= 0) {
         player.chegounochao = true;
         player.direita = false;
         player.esquerda = false;
         //HIT.Toca();
      
      }
      else if (tamanhoy1[i] <= posicaoy3 && posy[i] >= posicaoy3 && posicaoy >= 0 && tamanhoy3[i] > 0 && posicaox3 < tamanhox1[i] && tamanhodex3 > posx[i] && !player.chegounochao && posicaoy1 >= 0) {
         player.chegounochao = true;
         player.direita = false;
         player.esquerda = false;
         //HIT.Toca();

      }
      else if (tamanhoy1[i] <= posicaoy4 && posy[i] >= posicaoy4 && posicaoy >= 0 && tamanhoy3[i] > 0 && posicaox4 < tamanhox1[i] && tamanhodex4 > posx[i] && !player.chegounochao && posicaoy1 >= 0) {
         player.chegounochao = true;
         player.direita = false;
         player.esquerda = false;
         //HIT.Toca();

      }
      if (posy1[i] != 0) {//isso é para não interferencia caso o bloco seja "pequeno", ai o valor de posy1 pode ser 0, nisso a colisao buga
        // console.log("Entrou aqui");
         if (tamanhoy2[i] <= posicaoy1 && posy1[i] >= posicaoy1 && posicaoy >= 0 && tamanhoy2[i] > 0 && posicaox1 < tamanhox2[i] && tamanhodex2 > posx1[i] && !player.chegounochao && posicaoy1 >= 0) {
            player.direita = false;
            player.esquerda = false;
            player.chegounochao = true;
            //HIT.Toca();

         }
         else if (tamanhoy2[i] <= posicaoy && posy1[i] >= posicaoy && posicaoy >= 0 && tamanhoy2[i] > 0 && posicaox < tamanhox2[i] && tamanhodex1 > posx1[i] && !player.chegounochao && posicaoy1 >= 0) {
            player.chegounochao = true;
            player.direita = false;
            player.esquerda = false;
            //HIT.Toca();
   
         }
         else if (tamanhoy2[i] <= posicaoy3 && posy1[i] >= posicaoy3 && posicaoy3 >= 0 && tamanhoy2[i] > 0 && posicaox3 < tamanhox2[i] && tamanhodex3 > posx1[i] && !player.chegounochao && posicaoy1 >= 0) {
            player.chegounochao = true;
            player.direita = false;
            player.esquerda = false;
            //HIT.Toca();

         }
         else if (tamanhoy2[i] <= posicaoy4 && posy1[i] >= posicaoy4 && posicaoy4 >= 0 && tamanhoy2[i] > 0 && posicaox4 < tamanhox2[i] && tamanhodex4 > posx1[i] && !player.chegounochao && posicaoy1 >= 0) {
            player.chegounochao = true;
            player.direita = false;
            player.esquerda = false;
            //HIT.Toca();

         }
       
      }
      
      if (posy3[i] != 0) {

         if (tamanhoy3[i] <= posicaoy && posy3[i] >= posicaoy && posicaoy >= 0 && tamanhoy3[i] > 0 && posicaox < tamanhox3[i] && tamanhodex1 > posx3[i] && !player.chegounochao && posicaoy1 >= 0) {//
            player.direita = false;
            player.esquerda = false;
            player.chegounochao = true;
           // HIT.Toca();

         }

         else if (tamanhoy3[i] <= posicaoy1 && posy3[i] >= posicaoy1 && posicaoy >= 0 && tamanhoy3[i] > 0 && posicaox1 < tamanhox3[i] && tamanhodex2 > posx3[i] && !player.chegounochao && posicaoy1 >= 0) {
            player.direita = false;
            player.esquerda = false;
            player.chegounochao = true;
           // HIT.Toca();

         }
         else if (tamanhoy3[i] <= posicaoy3 && posy3[i] >= posicaoy3 && posicaoy >= 0 && tamanhoy3[i] > 0 && posicaox3 < tamanhox3[i] && tamanhodex3 > posx3[i] && !player.chegounochao && posicaoy1 >= 0 && posicaoy3 != 0) {
            player.chegounochao = true;
            player.direita = false;
            player.esquerda = false;
           // HIT.Toca();

         }
         else if (tamanhoy3[i] <= posicaoy4 && posy3[i] >= posicaoy4 && posicaoy >= 0 && tamanhoy3[i] > 0 && posicaox4 < tamanhox3[i] && tamanhodex4 > posx3[i] && !player.chegounochao && posicaoy1 >= 0 && posicaoy3 != 0) {
            player.chegounochao = true;
            player.direita = false;
            player.esquerda = false;
           // HIT.Toca();

         }
      }
      if (posy4[i] != 0) {
         if (tamanhoy4[i] <= posicaoy && posy4[i] >= posicaoy && posicaoy >= 0 && tamanhoy4[i] > 0 && posicaox < tamanhox4[i] && tamanhodex1 > posx4[i] && !player.chegounochao && posicaoy1 >= 0) {//
            player.chegounochao = true;
           // HIT.Toca();

         }

         else if (tamanhoy4[i] <= posicaoy1 && posy4[i] >= posicaoy1 && posicaoy >= 0 && tamanhoy4[i] > 0 && posicaox1 < tamanhox4[i] && tamanhodex2 > posx4[i] && !player.chegounochao && posicaoy1 >= 0) {
            player.chegounochao = true;
           // HIT.Toca();

         }
         else if (tamanhoy4[i] <= posicaoy3 && posy4[i] >= posicaoy3 && posicaoy >= 0 && tamanhoy4[i] > 0 && posicaox3 < tamanhox4[i] && tamanhodex3 > posx4[i] && !player.chegounochao && posicaoy1 >= 0 && posicaoy3 != 0) {
            player.chegounochao = true;
           // HIT.Toca();

         }
         else if (tamanhoy4[i] <= posicaoy4 && posy4[i] >= posicaoy4 && posicaoy >= 0 && tamanhoy4[i] > 0 && posicaox4 < tamanhox4[i] && tamanhodex4 > posx4[i] && !player.chegounochao && posicaoy1 >= 0 && posicaoy4 != 0) {
            player.chegounochao = true;
           // HIT.Toca();

         }
      }





      for (var k = 0; k < posy.length; k++) {//confere se os blocos estão na mesma linha
         if (posy[i] == posy[k]) {//nao é preciso fazer uma condicao para ele nao verificar ele mesmo, pois ele também entra na conta
            quantosY[0] += (tamanhox1[k] - posx[k]);
         }
         if (posy[i] == posy1[k]) {
            quantosY[0] += (tamanhox2[k] - posx1[k]);
         }
         if (posy[i] == posy3[k]) {
            quantosY[0] += (tamanhox3[k] - posx3[k]);
         }
         if (posy[i] == posy4[k]) {
            quantosY[0] += (tamanhox4[k] - posx4[k]);
         }
         if (posy1[i] == posy[k]) {
            quantosY[1] += (tamanhox1[k] - posx[k]);
         }
         if (posy1[i] == posy1[k]) {
            quantosY[1] += (tamanhox2[k] - posx1[k]);
         }
         if (posy1[i] == posy3[k]) {
            quantosY[1] += (tamanhox3[k] - posx3[k]);
         }
         if (posy1[i] == posy4[k]) {
            quantosY[1] += (tamanhox4[k] - posx4[k]);
         }
         if (posy3[i] == posy[k]) {
            quantosY[2] += (tamanhox1[k] - posx[k]);
         }
         if (posy3[i] == posy1[k]) {
            quantosY[2] += (tamanhox2[k] - posx1[k]);
         }
         if (posy3[i] == posy3[k]) {
            quantosY[2] += (tamanhox3[k] - posx3[k]);
         }
         if (posy3[i] == posy4[k]) {
            quantosY[2] += (tamanhox4[k] - posx4[k]);
         }
         if (posy4[i] == posy[k]) {
            quantosY[3] += (tamanhox1[k] - posx[k]);
         }
         if (posy4[i] == posy1[k]) {
            quantosY[3] += (tamanhox2[k] - posx1[k]);
         }
         if (posy4[i] == posy3[k]) {
            quantosY[3] += (tamanhox3[k] - posx3[k]);
         }
         if (posy4[i] == posy4[k]) {
            quantosY[3] += (tamanhox4[k] - posx4[k]);
         }

      }
  
      if (quantosY[0] >= 600 && quantosY[0] <= 700) {//aqui ele verifica qual linha está completa
         guardavalory = posy[i];
         player.confereosY = true;
      }
      if (quantosY[1] >= 600 && quantosY[1] <= 700) {
         guardavalory = posy1[i];
         player.confereosY = true;
      }
      if (quantosY[2] >= 600 && quantosY[2] <= 700) {
         guardavalory = posy3[i];
         player.confereosY = true;
      }
      if (quantosY[3] >= 600 && quantosY[3] <= 700) {
         guardavalory = posy4[i];
         player.confereosY = true;
      }
      if (player.confereosY && guardavalory < 750) {//se alguma linha estiver completa e o valor do y for dentro do mapa, entra aqui

         for (var j = 0; j < posy.length; j++) {
            if (posy[j] == guardavalory) {
               posy[j] = 5000;//a linha completa deve desaparecer, como fazer isso? jogar para longe(por isso é necessario conferir para ver se está no mapa)
               tamanhoy1[j] = 5000;
            }
            if (posy1[j] == guardavalory) {
               posy1[j] = 5000;
               tamanhoy2[j] = 5000;
            }
            if (posy3[j] == guardavalory) {
               posy3[j] = 5000;
               tamanhoy3[j] = 5000;
            }
            if (posy4[j] == guardavalory) {
               posy4[j] = 5000;
               tamanhoy4[j] = 5000;

            }
            if (posy[j] < guardavalory && posy[j] > 0) {
               posy[j] += 50;
               tamanhoy1[j] = posy[j]-50;
               if(player.Pontuacao){player.pontos++;
                  player.Pontuacao=false;}
            }
            if (posy1[j] < guardavalory && posy1[j] > 0) {
               posy1[j] += 50;
               tamanhoy2[j] =posy1[j] - 50;
               if(player.Pontuacao){player.pontos++;
                  player.Pontuacao=false;}
            }
            if (posy3[j] < guardavalory && posy3[j] > 0) {
               posy3[j] += 50;
               tamanhoy3[j] = posy3[j] -50;
               if(player.Pontuacao){player.pontos++;
                  player.Pontuacao=false;}
            }
            if (posy4[j] < guardavalory && posy4[j] > 0) {
               posy4[j] += 50;
               tamanhoy4[j] =posy4[j] - 50;
               if(player.Pontuacao){player.pontos++;
               player.Pontuacao=false;}
            }

            if (j == posy.length - 1) {//quando acaba o for aqui deve ficar sem executar

               player.confereosY = false;
            }
       
         }
      }
   
    
      // else {
      //    player.condParaDireita = true;
      //    player.condParaEsquerda = true;
      // }
   
      player.tamanho();//executa a funçao que desenha os blocos


      player.condParaColisao = true;
      player.Pontuacao=true;
   }
}
function ChamaBloco() {
   player.y = posicaoy;//devolve os valores do bloco em movimento para a funcao desenha
   player.y2 = posicaoy1;
   player.x = posicaox;
   player.x2 = posicaox1;
   player.y3=posicaoy3;
   player.y4=posicaoy4;
   player.tamtotalx1 = tamanhodex1;
   player.tamtotalx2 = tamanhodex2;
   player.tamtotalx3 = tamanhodex3;
   player.tamtotalx4 = tamanhodex4;
   player.tamtotaly = tamanhodey1;
   player.tamtotaly2 = tamanhodey2;
   player.tamtotaly3 = tamanhodey3;
   player.tamtotaly4 = tamanhodey4;
   player.TamBloco = Bloco1;
   player.rotate90 = rotacao90;
   player.rotate180 = rotacao180;
   player.rotate270 = rotacao270;
   player.interferetamy1 = tamyde1;
   player.interferetamy2 = tamyde2;
}
function Start() {
   if (!inicio && !howtoplay) {//menu principal
      
      pincel.clearRect(0, 0, 600, 720);
      Menu.desenha();
      BG_Menu.play();
      BG_Menu.volume = 0.2;
      
   } else if (howtoplay && !inicio){
      pincel.clearRect(0, 0, 600, 720);
      Instruc_Aux();
   }
   else if (inicio && !howtoplay) {
      Jogo();
   }
}

function Jogo() {
   BG_Menu.pause();
   clearInterval(Interv);
   BG_Jogo.volume = 0.2;
   BG_Jogo.Toca2();
   Interv1 = setInterval(Main, 10);
}
function Jogo2() {
   clearInterval(Interv2);
   fim = false;
   BG_Jogo.Toca2();
   Interv1 = setInterval(Main, 10);
   Perdeu_Aux = false;
}
function Instruc_Aux(){
   clearInterval(Interv);
   Interv3 = setInterval(Instruc, 10);
}
function Instruc(){
   Instrucoes.desenha();
   if (inicio && howtoplay) {
      
      Jogo();
      clearInterval(Interv3);
   }
}
function Perdeu() {
   if(posy.length>0){
   for(var x=0;x<posy.length;x++){
      

   if (tamanhoy1[x]==0&&player.chegounochao||tamanhoy2[x]==0&&player.chegounochao||tamanhoy3[x]==0&&player.chegounochao) {
      Perdeu_Aux = true;
      player.x = -1000;
      player.y = 1000;
      clearInterval(Interv1);
      Interv2 = setInterval(GameOver, 10);
      BG_Jogo.Para();
      BG_GO.volume = 0.2;
      BG_GO.Toca();
      
   }
}}
}
function GameOver() {
   if (!fim) {
      pincel.clearRect(0, 0, 600, 720);
      Game0ver.desenha();
   }
   if (fim) {
      player.pontos=0;
      posy = [];
      posy1 = [];
      posx = [];
      posx1 = [];
      posy3 = [];
      posy4 = [];
      posx3 = [];
      posx4 = [];
      tamanhox1 = [];
      tamanhox2 = [];
      tamanhox3 = [];
      tamanhox4 = [];
      tamanhoy1 = [];
      tamanhoy2 = [];
      tamanhoy3 = [];
      tamanhoy4 = [];
      tamy11 = [];
      tamy22 = [];
      Bloco = [];
      rot90 = [];
      rot180 = [];
      rot270 = [];
      jaComp = [];
      quantosY = [0, 0, 0, 0, 0];
      posicaoy = 0;
      posicaoy1 = 0;
      posicaox = 0;
      posicaox1 = 0;
      posicaoy3 = 0;
      posicaoy4 = 0;
      posicaox3 = 0;
      posicaox4 = 0;
      tamanhodex1 = 0;
      tamanhodex2 = 0;
      tamanhodex3 = 0;
      tamanhodex4 = 0;
      tamanhodey1 = 0;
      tamanhodey2 = 0;
      tamanhodey3 = 0;
      tamanhodey4 = 0;
      tamyde1 = 0
      tamyde2 = 0;
      Bloco1 = 0;
      player.x2 = 0;
      player.y2 = 0;
      player.y3 = 0;
      player.x3 = 0;
      player.y4 = 0
      player.x4 = 0;
      player.tamy1 = 0;
      player.tamy2 = 0;
      player.interferetamy1 = 0;
      player.TempoDificuldade=30;
      player.interferetamy2 = 0;
      player.tamtotalx1 = 0;
      player.tamtotaly1 = 0;
      player.tamtotalx2 = 0;
      player.tamtotaly2 = 0;
      player.tamtotalx3 = 0;
      player.tamtotaly3 = 0;
      player.tamtotalx4 = 0;
      player.tamtotaly4 = 0;
      i = 0;
      j = 0;
      k = 0;
      x = 0;
      Jogo2();
   }
}
function Drawn() {
   //  player.desenha();
   player.tamanho();
  
}
function Update() {
   //player.move();

   player.aleatório();
  
   player.moveAuto();
   PodeVoltarDireita=false;
   Entrouaqui=false;
   DesenhaBlocoChao();
   //player.tamanho();
   ChamaBloco();
   mapa.Grid();
   escrita.draw("Pontos " + player.pontos, 100, 50);
   //player.tamanho();
}
function Main() {
   pincel.clearRect(0, 0, 2000, 720);
   Drawn();
   Update();
   Perdeu();
}

function click(evento){ 
   var x_click = evento.pageX - tela.offsetLeft;
   var y_click = evento.pageY - tela.offsetTop;
   if(evento.which == 1 && x_click > 106 && x_click < 500 && y_click > 336 && y_click < 414 && !inicio){
      inicio = true;
   }
   else if(evento.which == 1 && x_click > 106 && x_click < 500 &&y_click > 489 && y_click < 564 && !inicio && !howtoplay){
      howtoplay = true;
   }
   else if(evento.which == 1 && x_click > 106 && x_click < 500 &&y_click > 587 && y_click < 666 && !inicio && howtoplay){
      inicio = true;
   }
   else if(evento.which == 1 && x_click > 109 && y_click > 469 && x_click < 500 && y_click < 551 && Perdeu_Aux && !fim){
      fim = true;
   }

}

var Interv = setInterval(Start, 10);

tela.onclick = click;