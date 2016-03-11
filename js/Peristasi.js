function teseo() {
        Inizializzazione();
        spero(document.getElementById('cerchio1').width, document.getElementById('cerchio1'), document.getElementById('dati1').value, document.getElementById('dati1').max);
        spero(document.getElementById('cerchio2').width, document.getElementById('cerchio2'), document.getElementById('dati2').value, document.getElementById('dati2').max);
        spero(document.getElementById('cerchio3').width, document.getElementById('cerchio3'), document.getElementById('dati3').value, document.getElementById('dati3').max);
}


function spero(d, canvas, val, max)
            {
                var Rmezzi=d/2;
                var deg= (2*Math.PI*val)/max;
                var ctx=canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle='rgba(17, 77, 133, 1)';
                ctx.font="38px Jura";
                ctx.beginPath();
                for (var a=0; a<=(deg); a+=0.001)
                {
                    ctx.moveTo(Rmezzi*0.75*Math.cos(a-Math.PI/2)+Rmezzi, Rmezzi*0.75*Math.sin(a-Math.PI/2)+Rmezzi);
                    ctx.lineTo(Rmezzi*Math.cos(a-Math.PI/2)+Rmezzi, Rmezzi*Math.sin(a-Math.PI/2)+Rmezzi);
                }
                ctx.stroke();
                ctx.closePath();
                ctx.fillStyle = 'rgba(17, 77, 133, 1)';
                
                // ctx.fillText(val, 28, 80);
                if (val==Math.floor(val)) {
                    if (val<10)
                        ctx.fillText(val,52,80);
                    else
                    { 
                        if (val<100)
                            ctx.fillText(val,42,80);
                        else
                            ctx.fillText(val,32,80);           
                    }  
                }
                else {
                     if (val<10)
                        ctx.fillText(val,40,80);
                    else
                        ctx.fillText(val,42,80); 
                }
                
}

function Griglia(ctx, NP, K) {
    var canvas = document.getElementById('canvas');
    var ALT = canvas.height;
    var LAR = canvas.width;
    ctx.strokeStyle='rgba(0,0,0,0.1)';
    
    var dY = ALT/NP;
    var dX = LAR/NP;
    
    ctx.beginPath();
    
    for(var i=0; i<NP+1; i++) {
        ctx.moveTo(i*dX,1);
        ctx.lineTo(i*dX,ALT);
    }

    for(var z=0; z<NP+1; z++) {
        ctx.moveTo(1,z*dY);
        ctx.lineTo(LAR,z*dY);
    }

    ctx.closePath();
    ctx.stroke();
}

function arrotonda(numero, nDec){ 
    var m = "1"; 
    for(var i=0;i<nDec;i++){ 
    m += "0"; 
    } 
    numero=numero * (parseInt(m,10)); 
    numero=Math.round((numero*100)/100); 
    var ris=numero/m; 
    return ris; 
}

function Grafico(NP, PART, LP) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var dati = new Array(NP);
    var L = new Array(PART);
    var LAR = canvas.width;
    
    var S=0;
    var TEMP=0;
    
    dati[0]=0;
    var max=dati[0];

    for (var u=1; u<NP; u++) {
        for (var i=0; i<PART; i++){
            L[i] = Math.floor(Math.random()*(LP+1));
            S=S+L[i];
        }
        dati[u]=(S+TEMP)/u;
        if (dati[u]>max) {max=dati[u];}
        TEMP=S;
    }
    // max/altezza=vera/grafica 
    var K=(canvas.height)/(max*1.25);
    var dX = LAR/NP;
    var ALT = canvas.height-dati[1];
    Griglia(ctx, NP, K);
    ctx.strokeStyle='rgba(0, 0, 0, 1)';
    ctx.font="18px Jura";
    
    ctx.beginPath();
    ctx.fillText("Scala (in u.m.): ",canvas.width-190,canvas.height-10);
    ctx.fillText(arrotonda(K, 2), canvas.width-70, canvas.height-10);
    
    ctx.moveTo(1, 1);
    ctx.lineWidth = 3;
    ctx.lineTo(1, canvas.height-1);
    ctx.lineTo(canvas.width, canvas.height);

    ctx.strokeStyle='rgba(200,100,100,1)';

    ctx.moveTo(0, canvas.height-dati[0]);
    for (var i=0; i<NP;i++) {
        ctx.lineTo(i*dX,          (max*1.25-dati[i])*(K)      );
    }

    ctx.stroke();
    ctx.closePath();     
}

function Inizializzazione() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var PART = document.getElementById('dati1').value;
    var NP = document.getElementById('dati2').value;
    var LP = document.getElementById('dati3').value;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;

    Grafico(NP, PART, LP);
}

