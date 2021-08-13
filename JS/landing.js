var window_width=window.innerWidth;

function showElement(button, element, on, off, maxsize){
	let over=false, funcion=()=>{
		if(on){
			on();
		}else{
			element.slideDown(500);
		}
	}, overFuntion=(node)=>{
		node.mouseover(()=>{
			over=true;
		}).mouseout(()=>{
			over=false;
		});
	}, offFunction=()=>{
		if(off){
			off();
		}else if(window.innerWidth<=maxsize){
			element.slideUp(500);
		}
	};

	button.click(()=>{
		if(element.css('display')=='none'){
			funcion();
		}
	});

	element.click(()=>{
		offFunction();
	});

	button.mouseover(()=>{
		over=true;
	}).mouseout(()=>{
		over=false;
	});
	element.mouseover(()=>{
		over=true;
	}).mouseout(()=>{
		over=false;
	});

	$(window).click(()=>{
		if(over==false && element.css('display')!='none'){
			offFunction();
		}
	});
}

/*function showLi(list){
	let idList='', count=250, existId=false;

	if(list[0].id==''){
		list[0].id='list'+new Date.getTime;
	}else{
		existId=true;
	}
	idList=list[0].id;

	list.show();

	for(let i=0; i<$('#'+idList+' li').lenght; i++){
		item=$('#'+idList+' li:nth-child('+(i+1)+')');

		item.animate({
			display: 'block',
			width: '100%'
		}, count);

		count=count+50;
	}

	if(existId==false){
		idList='list'+new Date.getTime;
	}
}

function hideLi(list){
	let idList='', count=250;

	if(list[0].id==''){
		list[0].id='list'+new Date.getTime;
	}else{
		existId=true;
	}
	idList=list[0].id;

	for(let i=0; i<$('#'+idList+' li').lenght; i++){
		item=$('#'+idList+' li:nth-child('+(i+1)+')');

		item.animate({
			width: '0%'
		}, count, ()=>{
			item.hide();
		});

		count=count+50;
	}

	setTimeout(()=>{
		list.hide();
	}, count);

	if(existId==false){
		idList='list'+new Date.getTime;
	}
}*/

function windowScroll(portadaHeight){
	if(window.scrollY>portadaHeight){
		$('#navegacion').css('position', 'fixed');
		$('#header').css('margin-bottom', $('#navegacion').css('height'));
		//window.scrollY=portadaHeight+1;
	}else{
		$('#navegacion').css('position', 'relative');
		$('#header').css('margin-bottom', '0%');
	}
}

function goSection(button){
	let id='', section='';
	if((typeof button.attr('id'))!='undefined'){
		id=button.attr('id');
		section=id.match(/\w*-/gi);

		if(section!=null){
			section=section[0];
			section=section.substring(0, section.length-1);

			button.click(()=>{
				if($('#'+section).length){
					$('html').animate({
						scrollTop: $('#'+section).offset().top
					}, 500);
				}
			});
		}
	}
}

function showList(li){
	let over=false, id='', interval=null;

	li.mouseover(()=>{
		let date=new Date;
		id='li_'+date.getTime();
		if(li[0].id!=''){
			id=li[0].id;
		}else{
			li[0].id=id;
		}

		over=true;

		$('#'+id+' ul').show();

		clearInterval(interval);

	}).mouseout(()=>{
		over=false;

		interval=setTimeout(()=>{
			$('#'+id+' ul').hide();
		}, 250);
	});
}

/*function loadWifi(load, funcion){
	let id=load[0].id;

	if(id==''){
		id=asignId('_load_');
	}
	load[0].id=id;

	interval=setInterval(()=>{
		$('#'+id+' .token').animate({
			background: 'white'
		}, 250, ()=>{
			$('#'+id+' .load-3').animate({
				'border-top-color': 'white'
			}, 1000, ()=>{
				$('#'+id+' .load-2').animate({
					'border-top-color': 'white'
				}, 1000, ()=>{
					$('#'+id+' .load-1').animate({
						'border-top-color': 'white'
					}, 1000;
				});
			});
		});

		setTimeout(()=>{
			$('#'+id+' div').animate({
				'border-top-color': 'transparent',
				'background': 'transparent'
			}, 250);
		});
	}, 3500);
}*/

$('#header').ready(()=>{
	let portadaHeight=sizeRecort($('#header').css('height'));

	windowScroll(portadaHeight);
	$(window).scroll(()=>{
		windowScroll(portadaHeight);
	});
});

$('#navegacion').ready(()=>{
	var menu=$('#menu'), menu_list=$('#menu-list');
	//showElement(menu, menu_list, null/*showLi($('#menu-list'))*/, null/*hideLi($('#menu-list'))*/, 650);
	showElement(menu, menu_list, null, null, 650);

	$(window).resize(()=>{
		if(window.innerWidth>650){
			menu_list.show();
		}else{
			menu_list.hide();
		}

		window_width=window.innerHeight;
	});

	/*for(let i=0; i<$('#menu-list li').length; i++){
		let li=$('#menu-list li:nth-child('+(i+1)+')');
		goSection($('#menu-list li:nth-child('+(i+1)+') button:nth-child(1)'));
	}*/
	for(let i=0; i<$('#menu-list li').length; i++){
		goSection($('li:nth-child('+(i+1)+') button'));
	}

	/*for(let i=0; i<$('.listLi').length; i++){
		showList($('.listLi:nth-child('+(i+1)+')'));

		for(let j=0; j<$('.listLi:nth-child('+(i+1)+') .link').length; j++){

		}
	}*/
});

$('#contacto').ready(()=>{
	floatLabel($('#nombre'));
	floatLabel($('#email'));
	floatLabel($('#telefono'));
	floatLabel($('#mensaje'));
	/*for(let i=1; i<=$('#contact-form .float-label').length; i++){
		floatLabel($('#contact-form .float-label:nth-child('+i+') input'));
		floatLabel($('#contact-form .float-label:nth-child('+i+') textarea'));
	}*/
});

$('#servicios .carrusel').ready(()=>{
	let screen=$('#servicios .carrusel .screen'), nav=$('#servicios .carrusel .nav'), contenido=$('#servicios .carrusel .screen .contenido');
	let itemsLength=$('#servicios .carrusel .screen .contenido .item').length, selected=0, countSelected=0, interval=null,
	next=(item, i)=>{
		let button=$('#servicios .carrusel .nav div button:nth-child('+i+')');

		$('#servicios .carrusel .nav div button').css('background', 'none');
		button.css('background', 'white');
		screen.css({
			'background-image':item.attr('image'),
			'transition':"background 500ms"
		});
		nav.css({
			'background':item.attr('color'),
			'transition':'250ms'
		});
		contenido.css({
			'box-shadow':'.05em 0 .1em '+item.attr('color'),
			'opacity': '.9',
			'background': item.attr('color'),
			'transition':'250'
		});
		selected.fadeOut(250);
		selected=item;
		countSelected=i;

		setTimeout(()=>{
			item.fadeIn(250);
		}, 250);
	}, startInterval=()=>{
		if($('#servicios .carrusel .screen .contenido .item').length>1){
			interval=setInterval(()=>{
				let count=0;
				if(countSelected<itemsLength){
					count=countSelected+1;
				}else{
					count=1;
				}

				next($('#servicios .carrusel .screen .contenido .item:nth-child('+count+')'), count);
			}, 5000);
		}
	};

	for(let i=1; i<=itemsLength; i++){
		$('#servicios .carrusel .nav div').append('<button contenido="'+i+'"></button>');
		let button=$('#servicios .carrusel .nav div button:nth-child('+i+')'),
		item=$('#servicios .carrusel .screen .contenido .item:nth-child('+i+')');

		if(i==1){
			selected=$('#servicios .carrusel .screen .contenido .item:nth-child('+i+')');
			countSelected=1;
			screen.css('background-image', selected.attr('image'));
			$('#servicios .carrusel .nav div button:nth-child('+i+')').css('background', 'white');
		}

		button.mouseover(()=>{
			if(item!=selected && countSelected!=i){
				button.css('background', 'rgb(255,255,255,0.25)');
			}
		}).mouseout(()=>{
			if(item!=selected && countSelected!=i){
				button.css('background', 'none');
			}
		});

		button.focus(()=>{
			clearInterval(interval);
			if(item!=selected && countSelected!=i){
				next(item, i);
			}
		}).blur(()=>{
			startInterval();
		});

		if(i!=1){
			//$('#servicios .carrusel .screen .contenido:nth-child('+i+')').css('display', 'none');
		}
	}

	startInterval();
});

$('#contacto').ready(()=>{
	let valid=true, contactProccess=false;
	removeFloatLabelError($('#nombre'));
	removeFloatLabelError($('#email'));
	removeFloatLabelError($('#telefono'));
	removeFloatLabelError($('#mensaje'));

	$('#contact-form').submit((e)=>{
		e.preventDefault();
		valid=true;
		$('#contact-form .float-label').removeClass('float-label-error');
		$('#contact-form .float-label p').html('');

		let errores={}, nombres=$('#nombre').val().trim(), email=$('#email').val().trim(), tlf=$('#telefono').val().trim(), message=$('#mensaje').val().trim(),
		addErrors=(input, error)=>{
			if(error){
				input[0].parentNode.className=input[0].parentNode.className+' float-label-error';
				input[0].nextElementSibling.nextElementSibling.innerHTML=error;
				valid=false;
			}
		};

		addErrors($('#nombre') ,validateDoubleName(nombres, 'nombre', 'apellido', true));
		addErrors($('#email') ,validateEmail(email, true));
		addErrors($('#telefono') ,validatePhone(tlf));
		addErrors($('#mensaje'), validateSimpleText(message, 'mensaje', 1500, true));
		
		if(valid==true && contactProccess==false){
			contactProccess=true;
			let data= new FormData(), habiliteBtn=()=>{
				$('#contact-form button[type="submit"]').css('cursor', 'pointer').removeAttr('disabled').attr('title', 'Enviar');
			};

			$('#contact-form button[type="submit"]').css('cursor', 'no-drop').attr('disabled', '').attr('title', '¡Espere mientras el formulario se envía!');
			$('#contacto .second-loader').fadeIn(250);

			data.append('names', sanitizeString(nombres));
			data.append('email', sanitizeString(email));
			data.append('tlf', sanitizeString(tlf));
			data.append('message', sanitizeString(message));

			$.ajax({
				url: '/contacto/',
				type:'post',
				dataType:'json',
				data:data,
				cache:false,
				contentType:false,
				processData:false,
				timeout: 30000
			}).fail((reason)=>{
				contactProccess=false;
				habiliteBtn();
				$('#contacto .second-loader').fadeOut(250);
				createNotification('¡Error de conexión!', 'El envío del formulario de contacto no se ha realizado porque no se pudo establecer conexión con el servidor.', 'fail');
			}).then((response)=>{
				contactProccess=false;
				habiliteBtn();
				$('#contacto .second-loader').fadeOut(250);

				if('success' in response){
					createNotification('¡Envío realizado!', 'Se ha enviado el formulario de contacto correctamente.', 'success', '/IMG/iconos/sent-mail.svg');
				}else if(response.errno){
					switch (response.errno){
						case 'NOT EXIST VALUES':
							if(response.errores.names){
								addErrors($('#nombre'), response.errores.names);
							}
							if(response.errores.email){
								addErrors($('#email'), response.errores.email);
							}
							if(response.errores.tlf){
								addErrors($('#telefono'), response.errores.tlf);
							}
							if(response.errores.message){
								addErrors($('#message'), response.errores.message);
							}
							createNotification('¡Datos faltantes!', 'Se ha enviado el formulario con valores incompletos. Por favor, evite manipular el método de envío del formulario.', 'fail');
							break;

						case 'ERROR IN VALUES':
							if(response.errores.names){
								addErrors($('#nombre'), response.errores.names);
							}
							if(response.errores.email){
								addErrors($('#email'), response.errores.email);
							}
							if(response.errores.tlf){
								addErrors($('#telefono'), response.errores.tlf);
							}
							if(response.errores.message){
								addErrors($('#mensaje'), response.errores.message);
							}
							break;

						default:
							createNotification('¡Error de envío!', 'Se ha producido un error al enviar el formulario. Por favor, inténtelo más tarde.', 'fail');
							break;
					}
				}
			});
		}
	});
});

$(document).ready(()=>{
	createNotification('¡Atención!', 'Está usted viendo una versión de prueba de la página, por ello, no se realizan peticiones al servidor.', 'fail');

	// Preloader:
	$('#general-loader').fadeOut(500);
});