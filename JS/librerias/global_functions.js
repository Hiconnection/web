// Útiles: ----------------------------------------------------------------------------------------------

function sanitizeString(string){
	string=string.trim();
	string=string.replace(/\</gi, '&lt;');
	string=string.replace(/\>/gi, '&gt;');
	string=string.replace(/\"/gi, '&quot;');
	return string;
}

function isLetter(char){
	let valid=false;
	if((char.charCodeAt(0)>64 && char.charCodeAt(0)<383) && ((char.charCodeAt(0)<91 || char.charCodeAt(0)>96) && char.charCodeAt(0)!=161 && char.charCodeAt(0)!=191)){
		valid=true;
	}

	return valid;
}

function sizeRecort(size){
	return Number(size.substring(0, size.length-2));
}

function hasClass(nodo, clase){
	let exist=false;
	
	for(let i=0; i<nodo[0].classList.length; i++){
		if(clase==nodo[0].classList[i]){
			exist=true;
			break;
		}
	}

	return exist;
}

function firstUpper(name){
	let complete='';

	for(let i=0;i<name.length;i++){
		if(i==0){
			complete=complete+name.charAt(i).toUpperCase();
		}else{
			complete=complete+name.charAt(i).toLowerCase();
		}
	}

	return complete;
}

function firstCharName(name){
	name=name.split(' ');

	for(let i=0;i<name.length;i++){
		name[i]=firstUpper(name[i]);
	}

	name=name.join(' ');

	return name;
}

function getTimeNow(){
	let date=new Date();

	return date.getTime();
}

function existInJSON(arreglo, json){
	let valid=true, extra=[];
	for(let i=0; i<arreglo.length; i++){
		if((arreglo[i] in json)!=true){
			extra.push(arreglo[i]);
		}
	}
	if(extra.length>0){
		valid=false;
	}
	return {
		extra,
		valid
	}
}


// Validación: -----------------------------------------------------------------------------------------

function validateName(name, type, obligatory){
	let error=null;
	name=name.trim();

	if(name.length>0){
		if(name.length>50){
			error='¡El '+type+' no debe contener más de 50 caracteres!';
		}else if(name.length<2){
			error='¡El '+type+' no debe contener menos de 2 caracteres!';
		}else if(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ][a-zA-ZáéíóúÁÉÍÓÚÑñ\-\_]*( [a-zA-ZáéíóúÁÉÍÓÚÑñ][a-zA-ZáéíóúÁÉÍÓÚÑñ\-\_]*)?$/gi.test(name)==false){
			error='¡El '+type+' debe contener solo caracteres alfabéticos!';
		}
	}else if(obligatory){
		error='¡Debe introducir el '+tipo+'!';
	}

	return error;
}

function validateDoubleName(name, type1, type2, obligatory){
	let error=null;
	name=name.trim();

	if(name.length>0){
		if(name.split(' ').length<2){
			error='¡Debe introducir tanto el '+type1+' como el '+type2+'!';
		}else if(name.length>101){
			error='¡El '+type1+' y el '+type2+' no deben contener más de 50 caracteres cada uno!';
		}else{
			let nombres=name.split(' ');
			for(let i=0; i<nombres.length; i++){
				if(nombres[i].length<2){
					error='¡Tanto el '+type1+' como el '+type2+' deben contener más de 2 caracteres!';
					break;
				}
			}

			if(error==null){
				if(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ][a-zA-ZáéíóúÁÉÍÓÚÑñ\-\_]* [a-zA-ZáéíóúÁÉÍÓÚÑñ][a-zA-ZáéíóúÁÉÍÓÚÑñ\-\_]*$/gi.test(name)==false){
					error='¡El '+type1+' y el '+type2+' deben contener solo caracteres alfabéticos!';
				}
			}
		}
	}else if(obligatory){
		error='¡Debe introducir el '+type1+' y el '+type2+'!';
	}

	return error;
}

function validateEmail(email, obligatory){
	let error=null;
	email=email.trim();
	if(email.length>0){
		if(email.length>131){
			error='¡El correo electrónico debe contener menos de 132 caracteres!';
		}else if(/^\w[\w\._\-\d]{0,97}\w@\w[\w\._\-\d]{0,18}\w\.\w{2,9}$/gi.test(email)==false){
			error='¡Formato de correo electrónico incorrecto!';
		}
	}else if(obligatory){
		error='¡Debe introducir un correo electrónico!';
	}

	return error;
}

function validatePhone(tlf, obligatory){
	let error=null, match=tlf.trim().match(/^(\+\d{2}[-, ]?)?0?\d{10}$/gi);

	if(tlf.length>0){
		if(match==null){
			error='¡Formato de número telefónico incorrecto!';
		}
	}else if(obligatory){
		error='¡Debe introducir un número telefónico!';
	}

	return error;
}

function validateSimpleText(text, type, max, obligatory){
	let error=null;
	text=text.trim();

	if(text.length>0){
		if(text.length<5){
			error='¡El '+type+' debe contener, como mínimo, 5 caracteres!';
		}else if(text.length>max){
			error='¡El '+type+' no debe contener más de '+max+' caracteres!';
		}
	}else if(obligatory){
		error='¡Debe introducir un '+type+'!';
	}

	return error;
}


// Cliente: --------------------------------------------------------------------------------------------
function floatLabel(input){

	input.attr('placeholder', '');

	let getLabel=()=>{
		let inputName=input.attr('id');
		if(inputName.length<1){
			inputName=input.attr('name');
			input.attr('id')=inputName;
		}

		if(inputName.length<1){
			let i=0;
			inputName='float_label_'+getTimeNow();

			if($('#'+inputName).length>0){
				let exist=true;
				do{
					if($('#'+inputName+i).length>0){
						i++;
					}else{
						exist=false;
						inputName=inputName+i;
					}
				}while(exist==true);
			}
		}

		if(input[0].previousElementSibling.htmlFor!=inputName){
			input[0].previousElementSibling.htmlFor=inputName;
		}

		return $('label[for="'+inputName+'"]');

	}, hasContent=(ms)=>{
		let label=getLabel();
		label.animate({
			top: '.25em',
			left: '.75em',
			'font-size': '1vw',
			opacity: 1
		}, ms);
	};

	if(input.val().trim().length>0){
		hasContent(0);
	}

	input.focus(()=>{
		hasContent(500);
	});

	input.blur(()=>{
		let label=getLabel();
		if(input.val().trim().length<1){
			label.animate({
				top: '1.5em',
				left: '1em',
				'font-size': '1.25vw',
				opacity: 0.75
			}, 500);
		}
	});
}

function asignId(text){
	let id=text+getTimeNow(), count=0, exist=true;

	if($('#'+id).length>0){
		do{
			if($('#'+id+count).length>0){
				count++;
			}else{
				id=id+count;
				exist=false;
			}
		}while(exist==true);
	}

	return id;
}

function removeFloatLabelError(input){
	let parent=input[0].parentNode;

	if(parent.id==''){
		parent.id=asignId('_float_label');
	}

	input.keydown(()=>{
		if(hasClass($('#'+parent.id), 'float-label-error')){
			$('#'+parent.id).removeClass('float-label-error');
		}
	}).keyup(()=>{
		if(input.val()==''){
			$('#'+parent.id+' .error').html('');
		}
	});
}

function createNotification(title, message, type, image){	
	let date=new Date(), id=asignId('notification');
	let img='', over=false, plantilla='',
	deleted=()=>{
		$('#'+id).slideUp(500);
		setTimeout(()=>{
			$('#'+id).remove();
		}, 500);
	},
	difumed=()=>{
		difumedError=setTimeout(()=>{
			deleted();
		}, 10000);
	};
	type=type.toLowerCase();

	if(image){
		img=image;
	}else if(type=='fail'){
		img='/IMG/iconos/fail.svg';
	}else{
		img='/IMG/iconos/success.svg';
	}

	plantilla=`
		<figure id="`+id+`" class="notificacion bettwenFlex `+type+`">
			<img src="`+img+`">
			<figcaption>
				<h1>
					`+title+`
				</h1>
				<div class="text">
					`+message+`
				</div>
			</figcaption>

			<button type="button" class="close" title="Cerrar">
				<i class="fa fa-times"></i>
			</button>
		</figure>
	`;

	$('#notification-section').append(plantilla);

	$('#'+id).css('display', 'flex').slideDown(250);
	$('#'+id).css({
		'opacity': '1',
		'transform': 'none',
		'transition': '500ms'
	});

	difumed();

	$('#'+id).mouseover(()=>{
		clearInterval(difumedError);
	});

	$('#'+id).mouseout(()=>{
		difumed();
	});

	$('#'+id+' .close').click(()=>{
		deleted();
	});
}

module.exports= {
	sanitizeString,
	isLetter,
	getTimeNow,
	firstUpper,
	firstCharName,
	existInJSON,
	validateName,
	validateDoubleName,
	validateEmail,
	validatePhone,
	validateSimpleText
};