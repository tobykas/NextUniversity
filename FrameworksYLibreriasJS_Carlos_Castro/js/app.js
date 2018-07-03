$(document).ready(function(){
	animacionTitulo();
	//setInterval(function(){Dulces()},600);
	llenarTablero();
});

var i=0;
var intervalo=0;
var score=0;
var movimientos=0;
var tiempo = 0;
var segundos = 0;
var minutos = 2;
var horizontal=0;
var vertical=0;
var eliminar=0;
var lencol=["","","","","","",""];
var lenres=["","","","","","",""];
var matriz=0;
var bnewDulces=0;
var newDulces=0;//Nuevos Dulces
var maximo =0;
var contador =0;
var espera=0;

//Funcion Cambiar el Titulo de color
function animacionTitulo(){
	var titulo = $(".main-titulo");
	var color1 = "#DCFF0E";
	var color2 = "#FFFFFF";

	titulo.animate({color: color1}, 1000, function(){
		titulo.animate({color: color2}, 1000, function(){
			animacionTitulo();
		})
	})
}

//Boton de Inicio del Juego
$(".btn-reinicio").on("click", function(){
	i=0;
	score=0;
	movimientos=0;
	$(".panel-score").css("width","25%");
	$(".panel-tablero").show();
	$(".time").show();

	$("#score-text").html("0")
	$("#movimientos-text").html("0")
	mostrarPuntaje();
	$(this).html("REINICIAR")
	clearInterval(intervalo);
	clearInterval(eliminar);
	clearInterval(newDulces);
	clearInterval(tiempo);

	minutos=2;
	segundos=0;
	BorrarTodo();
	intervalo=setInterval(function(){llenarTablero()},600)
	tiempo=setInterval(function(){timer()},1000)

})

//Funcion de tiempo
function timer(){
	if(segundos !=0){
		segundos = segundos-1;
	}if(segundos ==0){
		if(minutos==0){
			clearInterval(eliminar);
			clearInterval(newDulces);
			clearInterval(intervalo);
			clearInterval(tiempo);
			$(".panel-tablero").hide("drop","slow", callback);
			$(".time").hide();
		}
		segundos=59;
		minutos=minutos-1
	}
	$("#timer").html("0"+minutos+":"+segundos)
}

//Funcion para el cambio de pnael con el Score al 100% de la pantalla
function callback(){
	$(".panel-score").animate({width:'100%'},4000);
}

//Funcion BorrarTodo
function BorrarTodo(){
	for(var j=1; j<8; j++){
		$(".col-"+j).children("img").detach()
	}
}

//Funcion para determinar columnas con el proposito de llenar el tablero
function llenarTablero(){
	i=i+1
	var numero=0;
	var imagen=0;

	$(".elemento").draggable({disabled: true});
	if(i<8){
		for(var j=1; j<8; j++){
			if($(".col-"+j).children("img:nth-child("+i+")").html()==null){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content", "flex-start") 
			}
		}
	}
	if(i==8){
		clearInterval(intervalo);
		eliminar=setInterval(function(){EliminarDulces()},150)
	}
}

//Eliminacion de Dulces por medio Draggable
function EliminarDulces(){
	matriz=0;
	horizontal=dulcesHorizontal()
	vertical=dulcesVertical()

	for(var j=1; j<8; j++){
		matriz=matriz+$(".col-"+j).children().length;
	}
	if(horizontal==0 && vertical==0 && matriz!=49){
		clearInterval(eliminar);
		bnewDulces=0;
		newDulces=setInterval(function(){
			nuevosDulces()
		},600)

	}
	if(horizontal==1 || vertical==1){
		$(".elemento").draggable({disabled: true});
		$("div[class^='col']").css("justify-content","flex-end")
		$(".activo").hide("pulsate",1000,function(){
			var scoretmp=$(".activo").length;
			$(".activo").remove("img")
			score=score+scoretmp;
			$("#score-text").html(score)
			//Llamar a la funcion puntaje y mostrarlo en la pantalla
			mostrarPuntaje();
		})
	}
	if(horizontal==0 && vertical==0 && matriz==49){
		$(".elemento").draggable({
			disabled: false,
			containment: ".panel-tablero",
			revert: true,
			revertDuration: 0,
			snap:".elemento",
			snapMode:"inner",
			snapTolerance:40,
			start:function(event,ui){
				movimientos=movimientos+1;
				$("#movimientos-text").html(movimientos)
			}
		});
	}

	$(".elemento").droppable({
		drop:function(event,ui){
			var dropped = ui.draggable;
			var droppedOn = this;
			espera=0;
			do{
				espera=dropped.swap($(droppedOn));
			}while(espera==0){
				horizontal=dulcesHorizontal()
				vertical=dulcesVertical()
				if(horizontal==0 && vertical==0){
					dropped.swap($(droppedOn));
				}
				if(horizontal==1 || vertical==1){
					clearInterval(newDulces);
					clearInterval(eliminar);
					eliminar=setInterval(function(){EliminarDulces()},150)
				}
			}
		}
	});
}

//Funcion mostrar puntaje puesto en pantalla en la funcion EliminarDulces()
function mostrarPuntaje(score){
	$("#score-text").html(score);
}

//funcion mover raton para eliminar dulces
jQuery.fn.swap = function(b){
	b = jQuery(b)[0];
	var a=this[0];
	var t = a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a, b);
	t.parentNode.insertBefore(b, t);
	t.parentNode.removeChild(t);
	return this;
};

//Funcion Nuevos Dulces
function nuevosDulces(){
	$(".elemento").draggable({disabled: true});
	$("div[class^='col']").css("justify-content", "flex-start")
	for(var j=1; j<8; j++){
		lencol[j-1]=$(".col-"+j).children().length;
	}if(bnewDulces==0){
		for(var j=0; j<7; j++){
			lenres[j]=(7-lencol[j]);
		}
		maximo=Math.max.apply(null,lenres);
		contador=maximo;
	}
	if(maximo!=0){
		if(bnewDulces==1){
			for(var j=1; j<8; j++){
				if(contador>(maximo-lenres[j-1])){
					$(".col-"+j).children("img:nth-child("+(lenres[j-1])+")").remove("img")
				}
			}
		}
		if(bnewDulces==0){
			bnewDulces=1;
			for(var k=1; k<8; k++){
				for(var j=0; j<(lenres[k-1]-1); j++){
					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>")
				}
			}
		}
		for(var j=1; j<8; j++){
			if(contador>(maximo-lenres[j-1])){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>")
			}
		}
	}
	if(contador==1){
		clearInterval(newDulces);
		eliminar = setInterval(function(){EliminarDulces()},150)
	}
	contador=contador-1;
}


//Funcion encontrar Dulces Horizontal
function dulcesHorizontal(){
	var horizontal = 0;
	for(var j=1; j<8;j++){
		for(var k=1; k<6; k++){
			var res1 = $(".col-"+k).children("img:nth-last-child("+j+")").attr("src")
			var res2 = $(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src")
			var res3 = $(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src")
			if((res1==res2)&&(res2==res3)&&(res1!=null)&&(res2!=null)&&(res3!=null)){
				$(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
				$(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class", "elemento activo")
				$(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class", "elemento activo")
				horizontal=1;
			}
		}
	}
	return horizontal;
}

//Funcion encontrar Dulces Vertical
function dulcesVertical(){
	var vertical = 0;
	for(var l=1; l<6; l++){
		for(var k=1; k<8; k++){
			var res1 = $(".col-"+k).children("img:nth-last-child("+l+")").attr("src")
			var res2 = $(".col-"+k).children("img:nth-last-child("+(l+1)+")").attr("src")
			var res3 = $(".col-"+k).children("img:nth-last-child("+(l+2)+")").attr("src")
			if((res1==res2)&&(res2==res3)&&(res1!=null)&&(res2!=null)&&(res3!=null)){
				$(".col-"+k).children("img:nth-last-child("+(l)+")").attr("class","elemento activo")
				$(".col-"+k).children("img:nth-last-child("+(l+1)+")").attr("class","elemento activo")
				$(".col-"+k).children("img:nth-last-child("+(l+2)+")").attr("class","elemento activo")
				vertical=1;
			}
		}
	}
	return vertical;
}