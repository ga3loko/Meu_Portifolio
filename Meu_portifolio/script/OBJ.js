var pincel = document.querySelector("canvas").getContext('2d');

class Geral {
    timer = 0;
    frame = 1;
    constructor(x,y,largura,altura,imagem){
        this.x=x;
        this.y=y;
        this.largura=largura;
        this.altura=altura;
        this.imagem=imagem;
    }
    desenha(){
        var img= new Image();
        img.src=this.imagem;
        pincel.drawImage(img,this.x,this.y,this.largura,this.altura)

    }
    
}

class Player extends Geral {
    direita = false;
    esquerda = false;
    baixo = false;
    TamBloco = 2;
    Sorteio = true;
    rotate90 = false;
    rotate180 = false;
    rotate270 = false;
    movimento = true;
    cooldown = 0;
    x2 = 0;
    y2 = 0;
    y3 = 0;
    x3 = 0;
    y4 = 0
    x4 = 0;
    tamy1 = 0;
    tamy2 = 0;
    interferetamy1 = 0;
    interferetamy2 = 0;
    tamtotalx1 = 0;
    tamtotaly1 = 0;
    tamtotalx2 = 0;
    tamtotaly2 = 0;
    tamtotalx3 = 0;
    tamtotaly3 = 0;
    tamtotalx4 = 0;
    tamtotaly4 = 0;
    Condicao = true;
    chegounochao = false;
    condParaColisao = false;
    TempoParaDescer = false;
    TempoDescerInt = 0;
    condParaDireita = true;
    condParaEsquerda = true;
    TimerDificuldade = 0;
    TempoDificuldade = 30;
    QuantosTemEmY = 0;
    podemudar = true;
    OneTime = true;
    pontos = 0;
    Pontuacao = true;
    confereosY = false;
    posdoy = 0;
    Tamanhoparaponto = 0;
    tamanhoparaA = 1;
    aleatório() {
        //aleatoriza o bloco que vai vir
        if (this.Sorteio) {
                this.TamBloco = Math.floor(Math.random() * 8);
                if (this.TamBloco == 0) this.TamBloco = 1; //se o valor do bloco for 0(nao tem nenhum correspondente) ele vira 1
                this.Sorteio = false;
        }
    }
    tamanho() {

        //condição para permitir fazer a rotação
        if (this.tamtotalx1 > 600 || this.tamtotalx2 > 600) this.Condicao = false;
        if (this.TamBloco == 3 && !this.rotate90 && !this.rotate270 && this.x > 400) this.Condicao = false;
        if(this.TamBloco==2&&this.x<50||this.TamBloco==6&&this.x<50)this.Condicao=false;
        else this.Condicao = true;
        //desenhando os blocos
        if (this.TamBloco == 1) {

            pincel.beginPath();
            pincel.fillStyle = 'purple';
            if (!this.rotate90 && !this.rotate180 && !this.rotate270) {
                this.y3 = 0;
                this.x3 = 0;
                this.y4 = 0
                this.x4 = 0;
                this.tamtotalx3 = 0;
                this.tamtotaly3 = 0;
                this.tamtotalx4 = 0;
                this.tamtotaly4 = 0;
                if (this.y < 800&&this.y2<800) {//faz com que n interfira no valor de x2,x3,x4 depois de ser deletado da tela
                    this.x2 = this.x + 50;//para blocos com duas partes
                    this.y2 = this.y - 50;
                    this.tamtotalx1 = this.x + 150;//pega o tamanho total do bloco em x;
                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 50;
                this.tamtotaly2 = this.y2 - 50;

                pincel.fillRect(this.x, this.y, 150, -50);
                pincel.fillRect(this.x2, this.y2, 50, -50);
            }
            if (this.rotate90) {//rotação

                this.y4 = 0;//para nao bugar a colisao é necessario zerar esse valor
                this.x4 = 0;
                this.tamtotalx4 = 0;
                this.tamtotaly4 = 0;
                if (this.y < 800) {
                    if(this.y2<800){
                    this.x2 = this.x;
                    this.y2 = this.y - 50;
                    if(this.y3<800){
                    this.x3 = this.x;
                    this.y3 = this.y - 100;}}
                    this.tamtotalx1 = this.x + 50;
                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 100;
                this.tamtotaly2 = this.y2 - 50;
                this.tamtotalx3 = this.x3 + 50;
                this.tamtotaly3 = this.y3 - 50;

                pincel.fillRect(this.x, this.y, 50, -50);
                pincel.fillRect(this.x2, this.y2, 100, -50);
                pincel.fillRect(this.x3, this.y3, 50, -50);
            }
            if (this.rotate180) {
                this.y3 = 0;
                this.x3 = 0;
                this.y4 = 0
                this.x4 = 0;
                this.tamtotalx3 = 0;
                this.tamtotaly3 = 0;
                this.tamtotalx4 = 0;
                this.tamtotaly4 = 0;
                if (this.y < 800&&this.y2<800) {
                    this.x2 = this.x - 50;
                    this.y2 = this.y - 50;
                    this.tamtotalx1 = this.x + 50;

                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 150;
                this.tamtotaly2 = this.y2 - 50;

                pincel.fillRect(this.x, this.y, 50, -50);
                pincel.fillRect(this.x2, this.y2, 150, -50);

            }
            if (this.rotate270) {

                this.y4 = 0
                this.x4 = 0;
                this.tamtotalx4 = 0;
                this.tamtotaly4 = 0;
                if (this.y < 800) {
                    if(this.y2<800){
                    this.x2 = this.x - 50;
                    this.y2 = this.y - 50;
                 if(this.y3<800){
                    this.x3 = this.x;
                    this.y3 = this.y - 100;}}
                    this.tamtotalx1 = this.x + 50;
                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 100;
                this.tamtotaly2 = this.y2 - 50;
                this.tamtotalx3 = this.x3 + 50;
                this.tamtotaly3 = this.y3 - 50;

                pincel.fillRect(this.x, this.y, 50, -50);
                pincel.fillRect(this.x2, this.y2, 100, -50);
                pincel.fillRect(this.x3, this.y3, 50, -50);
       
            }
        }
        if (this.TamBloco == 2) {

            pincel.beginPath();
            pincel.fillStyle = 'green';
            if (!this.rotate90 && !this.rotate270) {

                this.y4 = 0
                this.x4 = 0;
                this.tamtotalx4 = 0;
                this.tamtotaly4 = 0;
                if (this.y < 800) {
                    if(this.y2<800){
                    this.x2 = this.x;
                    this.y2 = this.y - 50;
                    if (this.y3<800){
                    this.x3 = this.x + 50;
                    this.y3 = this.y - 100;}}
                    this.tamtotalx1 = this.x + 50;
                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 100;
                this.tamtotaly2 = this.y2 - 50;
                this.tamtotalx3 = this.x3 + 50;
                this.tamtotaly3 = this.y3 - 50;

                pincel.fillRect(this.x, this.y, 50, -50);
                pincel.fillRect(this.x2, this.y2, 100, -50);
                pincel.fillRect(this.x3, this.y3, 50, -50);

            }
            if (this.rotate90 || this.rotate270) {//

                this.y4 = 0
                this.x4 = 0;
                this.tamtotalx4 = 0;
                this.tamtotaly4 = 0;
                if (this.y < 800) {
                    if(this.y2<800){
                    this.x2 = this.x + 50;
                    this.y2 = this.y + 50;
                    if(this.y3<800){
                    this.x3 = this.x ;
                    this.y3 = this.y - 50;}}
                    this.tamtotalx1 = this.x + 100;
                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 50;
                this.tamtotaly2 = this.y2 - 50;
                this.tamtotalx3 = this.x3 + 50;
                this.tamtotaly3 = this.y3 - 50;
                pincel.fillRect(this.x, this.y, 100, -50);
                pincel.fillRect(this.x2, this.y2, 50, -50);
                pincel.fillRect(this.x3, this.y3, 50, -50);

            }
        }
        if (this.TamBloco == 3) {
            pincel.beginPath();
            pincel.fillStyle = 'red';
            if (!this.rotate90 && !this.rotate270) {
                if (this.y < 800) {
                    if(this.y2<800){
                    this.x2 = this.x;
                    this.y2 = this.y - 50;
                    if(this.y3<800){
                    this.x3 = this.x;
                    this.y3 = this.y - 100;
                    if(this.y4<800){
                    this.x4 = this.x;
                    this.y4 = this.y - 150;}}}
                    this.tamtotalx1 = this.x + 50;
                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 50;
                this.tamtotaly2 = this.y2 - 50;
                this.tamtotalx3 = this.x3 + 50;
                this.tamtotaly3 = this.y3 - 50;
                this.tamtotalx4 = this.x4 + 50;
                this.tamtotaly4 = this.y4 - 50;
            }
            pincel.fillRect(this.x, this.y, 50, -50);
            pincel.fillRect(this.x2, this.y2, 50, -50);
            pincel.fillRect(this.x3, this.y3, 50, -50);
            pincel.fillRect(this.x4, this.y4, 50, -50);


            if (this.rotate90 || this.rotate270) {
                this.y2 = 0
                this.x2 = 0;
                this.y3 = 0;
                this.x3 = 0;
                this.y4 = 0
                this.x4 = 0;
                this.tamtotalx2 = 0;
                this.tamtotaly2 = 0;
                this.tamtotalx3 = 0;
                this.tamtotaly3 = 0;
                this.tamtotalx4 = 0;
                this.tamtotaly4 = 0;
                this.tamtotalx1 = this.x + 200;
                this.tamtotaly1 = this.y - 50;

                pincel.fillRect(this.x, this.y, 200, -50);
            }
        }
        if (this.TamBloco == 4) {

            pincel.beginPath();
            pincel.fillStyle = 'blue';
            if (!this.rotate90 && !this.rotate270) {
                this.y3 = 0;
                this.x3 = 0;
                this.y4 = 0
                this.x4 = 0;
                this.tamtotalx3 = 0;
                this.tamtotaly3 = 0;
                this.tamtotalx4 = 0;
                this.tamtotaly4 = 0;
                if (this.y < 800&&this.y2<800) {
                    this.x2 = this.x + 100;
                    this.y2 = this.y - 50;
                    this.tamtotalx1 = this.x + 150;
                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 50;
                this.tamtotaly2 = this.y2 - 50;

                pincel.fillRect(this.x, this.y, 150, -50);
                pincel.fillRect(this.x2, this.y2, 50, -50);
            }
            if (this.rotate90 || this.rotate270) {
                this.y3 = 0;
                this.x3 = 0;
                this.y4 = 0
                this.x4 = 0;
                this.tamtotalx3 = 0;
                this.tamtotaly3 = 0;
                this.tamtotalx4 = 0;
                this.tamtotaly4 = 0;
                if (this.y < 800&&this.y2<800) {
                    this.x2 = this.x;
                    this.y2 = this.y + 50;
                    this.tamtotalx1 = this.x + 150;
                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 50;
                this.tamtotaly2 = this.y2 - 50;
                pincel.fillRect(this.x, this.y, 150, -50);
                pincel.fillRect(this.x2, this.y2, 50, -50);
            }
        }
        if (this.TamBloco == 5) {

            pincel.beginPath();
            pincel.fillStyle = 'yellow';
            if (!this.rotate90 && !this.rotate270) {

                this.y4 = 0
                this.x4 = 0;
                this.tamtotalx4 = 0;
                this.tamtotaly4 = 0;
                if (this.y < 800) {
                    if(this.y2<800){
                    this.x2 = this.x;
                    this.y2 = this.y - 50;
                    if(this.y3<800){
                    this.x3 = this.x;
                    this.y3 = this.y - 100;}}
                    this.tamtotalx1 = this.x + 50;
                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 50;
                this.tamtotaly2 = this.y2 - 50;
                this.tamtotalx3 = this.x3 + 100;
                this.tamtotaly3 = this.y3 - 50;

                pincel.fillRect(this.x, this.y, 50, -50);
                pincel.fillRect(this.x2, this.y2, 50, -50);
                pincel.fillRect(this.x3, this.y3, 100, -50);

            }
            if (this.rotate90 || this.rotate270) {
                this.y3 = 0;
                this.x3 = 0;
                this.y4 = 0
                this.x4 = 0;
                this.tamtotalx3 = 0;
                this.tamtotaly3 = 0;
                this.tamtotalx4 = 0;
                this.tamtotaly4 = 0;
                if (this.y < 800&&this.y2<800) {
                    this.x2 = this.x + 100;
                    this.y2 = this.y + 50;
                    this.tamtotalx1 = this.x + 150;
                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 50;
                this.tamtotaly2 = this.y2 - 50;

                pincel.fillRect(this.x, this.y, 150, -50);
                pincel.fillRect(this.x2, this.y2, 50, -50);
            }

        }
        if (this.TamBloco == 6) {
            this.y3 = 0;
            this.x3 = 0;
            this.y4 = 0
            this.x4 = 0;
            this.tamtotalx3 = 0;
            this.tamtotaly3 = 0;
            this.tamtotalx4 = 0;
            this.tamtotaly4 = 0;
            if (!this.rotate90 && !this.rotate270) {
                if (this.y < 800&&this.x2<800) {
                    this.x2 = this.x + 50;
                    this.y2 = this.y - 50;
                    this.tamtotalx1 = this.x + 100;
                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 100;
                this.tamtotaly2 = this.y2 - 50;
                pincel.beginPath();
                pincel.fillStyle = 'brown';
                pincel.fillRect(this.x, this.y, 100, -50);
                pincel.fillRect(this.x2, this.y2, 100, -50);
            }
            if (this.rotate90 || this.rotate270) {
                if (this.y < 800&&this.x2<800) {
                    this.x2 = this.x - 50;
                    this.y2 = this.y - 50;
                    this.tamtotalx1 = this.x + 100;
                    this.tamtotaly1 = this.y - 50;
                }
                this.tamtotalx2 = this.x2 + 100;
                this.tamtotaly2 = this.y2 - 50;
                pincel.beginPath();
                pincel.fillStyle = 'brown';
                pincel.fillRect(this.x, this.y, 100, -50);
                pincel.fillRect(this.x2, this.y2, 100, -50);
            }
        }
        if (this.TamBloco == 7) {
            this.y3 = 0;
            this.x3 = 0;
            this.y4 = 0
            this.x4 = 0;
            this.tamtotalx3 = 0;
            this.tamtotaly3 = 0;
            this.tamtotalx4 = 0;
            this.tamtotaly4 = 0;
            if (this.y < 800&&this.x2<800) {
                this.x2 = this.x;
                this.y2 = this.y - 50;
                this.tamtotalx1 = this.x + 100;
                this.tamtotaly1 = this.y - 100;
            }
            this.tamtotalx2 = this.x + 100;
            this.tamtotaly2 = this.y - 100;
            pincel.beginPath();
            pincel.fillStyle = 'pink';
            pincel.fillRect(this.x, this.y, 100, -50);
            pincel.fillRect(this.x2, this.y2, 100, -50);

        }

    }
    moveAuto() {
        //movimenta automaticamente os blocos até a posição <700
        if (this.y < 700 && this.y2 < 700) {
            if (this.TempoParaDescer) {
                this.y += 50;
                this.TempoParaDescer = false;
            }

        }

        else {
            if (this.condParaColisao)
                this.chegounochao = true;
        }//condição para saber se tocou no chao



        if (this.tamtotalx1 >= 600 || this.tamtotalx2 >= 600||this.tamtotalx3 >= 600&&this.tamtotalx3!=0) this.direita = false;//restringe o movimento em x para a direita
        if (this.x <= 0 || this.x2 <= 0 && this.TamBloco != 3) this.esquerda = false;
        if (this.y < 0 && this.tamtotalx1 > 500 || this.y < 0 && this.tamtotalx2 > 500) {
            this.x = 350;
        }
        if (this.y < 0 && this.tamtotalx1 < 50 || this.y < 0 && this.tamtotalx2 < 50) {
            this.x = 100;
        }
        console.log("this.condParaDireita "+this.condParaDireita);
    
        if (this.movimento) {
            if (this.condParaDireita) {
                if (this.direita) {
                    this.x += 50;
                    this.movimento = false
                }
            }
            if (this.condParaEsquerda) {
                if (this.esquerda) {
                    this.x -= 50;
                    this.movimento = false
                }
            }

        }
        if (!this.movimento) {//Faz uma movimentação mais travada, porém que só permita andar 50px por vez, igual ao tetris original
            this.cooldown++;
            if (this.cooldown >= 10) {
                this.cooldown = 0;
                this.movimento = true;
            }
        }
        if (!this.TempoParaDescer) {
            this.TempoDescerInt++;
            if (this.TempoDescerInt >= this.TempoDificuldade && !this.baixo) {
                this.TempoDescerInt = 0;
                this.TempoParaDescer = true;
            }
            else if (this.TempoDescerInt >= (this.TempoDificuldade / 3) && this.baixo) {
                this.TempoDescerInt = 0;
                this.TempoParaDescer = true;
            }
        }
        this.TimerDificuldade++;
        if (this.TimerDificuldade == 1000 && this.TempoDificuldade > 20) {
            this.TempoDificuldade--;
            this.TimerDificuldade = 0;
        }

    }
}
class Escrita {
    draw(texto, x, y) {
        pincel.font = "40px Arial";
        pincel.fillStyle = "Black";
        pincel.fillText(texto, x, y);
    }
}

class Mapa {
    gx = -1;
    gy = 0;

    Grid() {
        pincel.fillStyle = 'black';
        pincel.fillRect(0, 700, 600, 20);
        for (var g = 0; g < 1000; g++) {
            if (this.gy <= 700) {
                pincel.lineWidth = 2;
                pincel.strokeStyle = "grey";
                pincel.strokeRect(this.gx, this.gy, 600, 2);
                this.gy += 50;
            } if (this.gy >= 700 && this.gx < 600) {
                this.gy = 0;
                pincel.lineWidth = 2;
                pincel.strokeStyle = "grey";
                pincel.strokeRect(this.gx, this.gy, 2, 699);
                this.gx += 50;
            } else if (this.gy >= 700 && this.gx >= 600) {
                this.gy = 0;
                this.gx = -1;
            }
        }

        pincel.strokeStyle = 'black';
        pincel.strokeRect(0, 0, 600, 2);

        pincel.strokeStyle = 'black';
        pincel.strokeRect(0, 0, 2, 720);

        pincel.strokeStyle = 'black';
        pincel.strokeRect(598, 0, 2, 720);
    }

}


class OBJ_2{
    constructor(endereco){
        this.endereco= "audio/" + endereco + ".wav";
    }
}

class Som extends OBJ_2{ 
    sound = new Audio();
    Toca(){
        this.sound.src = this.endereco;
        this.sound.volume = 0.2;
        this.sound.play();
    }
    Toca2(){
        this.sound.src = this.endereco;
        this.sound.loop = true;
        this.sound.volume = 0.2;
        this.sound.play();
    }
    Para(){
        this.sound.pause();
    } 
}