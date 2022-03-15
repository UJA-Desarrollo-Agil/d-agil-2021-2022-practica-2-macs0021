// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "89353480-ec80-11e1-aff1-0800200c9a66"; // GEnerado por http://www.famkruithof.net/uuid/uuidgen

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

// En modo depuración, que no haya efectos de jquery
jQuery.fx.off=false

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    start: new undum.SimpleSituation(
        "<h1></h1>\
        <p></p>",
        {
            enter: function(character, system, from) {
                system.doLink('inicio');
            }

        }
    ),
    salida: new undum.SimpleSituation(
        "<h1>Salida</h1>\
        <p>Abres la puerta y miras al exterior.</p>\
         <p>tu compañero de piso está detrás de ti. Bajas la mirada para mirar a tus pies.</p>",
        {
            enter:function( character, system, from ) {
                if( character.qualities.calcetin ) {
                    system.doLink( "salidacalcetines");
                } else {
                    system.doLink( "salidanocalcetin");
                }
            }
        }
    ),
    inicio: new undum.SimpleSituation (
        "<p>La alarma aún suena cuando recuerdas que tienes habías quedado con tus colegas para ir al circo.\
        Te levantas aún medio dormido y te dispones a vestirte. Al acabar de vestirte te encuentras con tu compañero de piso,\
        quien te pregunta si puede ir con vosotros</p>\
        <p>Tu compañero es un poco rarito, aunque es normal ya que es ingeniero informático. Rarito o no, tienes que decidir si \
        <a href='incorrecta01'>inventarte alguna excusa</a> para que no tener que invitarle o <a href='hasdichosi'>decirle que si</a> \</p>"
        ),
        incorrecta01: new undum.SimpleSituation(
        "<p>Le has dicho que no a tu compañero de piso, entra en cólera y te encierra en tu cuarto. No puedes salir y decides esperar a que\
         tus amigos se den cuenta de que te ha pasado algo. Pasan los días y nadie ha ido en tu búsqueda. Tal vez deberías buscarte otros amigos</p>\
        <p>Si te arrepientes de tus decisiones puedes probar a<a href='inicio'>intentarlo de nuevo</a> o si eres un cabezota que no admite que\
        se ha equivocado puedes\
        <a href='finalizar'>finalizar la partida</a>.</p>"
        ),

    finalizar: new undum.SimpleSituation(
        "<h1>Fin de la historia</h1>\
        <p>Has decidido terminar la historia, ¡espero que pruebes a finalizarla en otro momento!</p>\
        <h1>Fin</h1>"
    ),
    hasdichosi: new undum.SimpleSituation(
        "<h1>Compañero invitado</h1>\
        <p>Has invitado a tu compañero al circo,</p>\
        <p>En agradecimiento tu compañero te recuerda que no llevas calcetines. Miras a tus pies y compruebas que es cierto, desde pequeño\
        siempre te olvidas de los calcetines. Decides ir en su búsqueda, así que deberías<a href='pasillo'> salir al pasillo</a></p>"
    ),
    pasillo: new undum.SimpleSituation(
        "<h1>En el pasillo</h1>\
        <img width=500 height=600 class='img-situation' src='./media/img/pasillo.jpg'>\
        <p>Has salido al pasillo,</p>\
        <p>Te encuentras en el pasillo y puedes elegir entre <a href='cocina'> entrar a la cocina</a>, <a href='bano'> entrar en el baño</a> o  <a href='salida'> salir de casa</a></p>"
    ),

    bano: new undum.SimpleSituation(
        "<h1>En el baño</h1>\
        <p>Has entrado al baño,</p>\
        <p>No ves nada fuera de lo normal y tampoco necesitas usarlo. <a href='pasillo'> Volver al pasillo</a> </p>"
    ),

    cocina: new undum.SimpleSituation(
        "<h1>La cocina</h1>\
        <p>Entras en la cocina y con un simple viztado logras divisar todo tipo de ropa, no recuerdas por qué toda la ropa está tirada por la cocina, pero tampoco quieres preguntar.</p>\
        <p> Entre toda la ropa encuentras\
        un <a href='./casco' class='once'>casco de caballero</a>, una <a href='./camiseta' class='once'>camiseta de un grupo de rock anticuado</a>, \
         y un par de <a href='./calcetines' class='once'>calcetines de unicornio</a>. También puedes <a href='pasillo'> salir al pasillo</a></p>\
    ",
        {
            actions: {
                'casco': function( character, system, action) {
                    system.setCharacterText( "<p> Has recogido el casco! No creo que sea lo suficientemente calentito para tus pies.</p>" );
                },
                'camiseta': function( character, system, action) {
                    system.setCharacterText( "<p>Has recogido la camiseta! este grupo tiene temazos pero no creo que te sirva para tus desnudos pies</p>" );
                },
                'calcetines': function(character, system, action) {
                    system.setCharacterText("<p>¡Genial, unos calcetines! y además de unicornio, tus favoritos</p>" );
                    system.setQuality( "calcetin", true );
                }

            }
        }
    ),

    salidacalcetines: new undum.SimpleSituation(
        "<p>Tus pies están calentitos y seguros, te colocas los zapatos en la entrada y tu y tu compañero de piso pedís un taxi que os deja en la puerta del circo.</p>",
         {
            enter: function (character, system, from) {
                system.doLink('puertacirco');
            }

        }

    ),

    puertacirco: new undum.SimpleSituation(
        "<h1>Puerta del circo</h1>\
        <img width=500 height=600 class='img-situation' src='./media/img/circo.jpg'>\
        <p>El circo está lleno de gente, hay una cola gigante de personas que esperan para entrar. No ves a tus amigos por ninguna parte. Pasa el tiempo y tus amigos no llegan, así que debes decidir si <a href='dentrocirco'> entrar al circo</a> o abandonar a tus amigos a su suerte y <a href='salidacirco'>volver a casa</a></p >"
    ),
    dentrocirco: new undum.SimpleSituation(
        "<h1>Interior del circo</h1>\
        <img width=500 height=600 class='img-situation' src='./media/img/payasos.jpg'>\
        <p>Has decidido entrar en el circo. tu compañero de piso se sienta a tu lado. Comienza el espectáculo y tus amigos aún no han aparecido. Además de eso tu compañero informático\
        no para de quejarse de que tiene que entregar una práctica de desarrollo ágil, le quedan dos días para entregarla y aún no ha empezado. En el escenario aparecen tres payasos que comienzan a hacer piruetas\
        y movimientos extraños. Uno de ellos pide un voluntario y tu estás pensando si <a href='./ofrecerte'> ofrecerte voluntario</a> con tal de separarte de tu compañero o <a href='./esconderte'>hacerte el distraido</a> como\
        cuando tu profesor de primaria pedía un voluntario para corregir un ejercicio</p >",
        {
            actions: {
                'ofrecerte': function( character, system, action ) {
                    system.write( '<p> Decides presentarte voluntario. Los payasos te hacen saltar sobre un trampolín, nunca lo habías hecho antes así que te caes y te haces daño. Mucho daño. Al menos no tienes que estar escuchando las quejas de tu compañero. Puedes <a href="inicio">volver a empezar</a> o <a href="finalizar">finalizar</a>.</p>');
                },
                'esconderte': function( character, system, action ) {
                    system.write( '<p> Decides hacerte el despistado y esperar a que otra persona salga voluntaria. Un chico levanta la mano, sale al escenario y los payasos le hacen saltar en un trampolín.' +
                        ' Se ve que el chico maneja porque hace piruetas mientras salta. Tú nunca has saltado en un trampolín pero piensas que lo más seguro es que lo hicieras mejor que el. De repente un león se escapa ' +
                        ' y ataca a tu compañero de piso. Se vé que el también estaba harto de que hablara tanto. Cierras los ojos para no ver lo que está ocurriendo pero por el sonido ya te lo imaginas. Cuando vuelves a abrir los ojos ' +
                        'ves al león un poco más gordo de lo normal. Escuchando más de cerca se escucha una voz: ' +
                        '<p class=\'dialogo personaje\'>- ¡Encima la práctica es en JavaScript!¡El peor lenguaje de programación que existe!</p>' +'<p>Crees que ya has tenido suficiente, es hora de <a href=salidacirco>volver a casa</a></p>');
                }

            }
        }
    ),

    salidacirco: new undum.SimpleSituation(
        "<h1>Vuelta a casa</h1> <img width=500 height=600 class='img-situation' src='./media/img/circo.jpg'> <p> Has decidido volver a casa. Puedes elegir entre <a href='./taxi'>llamar a un taxi</a> o <a href='./caminar'>volver caminando</a>, lo cual es muy peligroso y nada aconsejable</p >",
        {
            actions: {
                'taxi': function( character, system, action ) {
                    system.write( '<p>Decides llamar a un taxi. El taxi llega y el taxista es muy majo, te da conversación durante todo el trayecto. Te quedas dormido en el taxi, cuando el taxista llega coge las llaves de tu bolsillo y sin despertarte te lleva a la cama como tu padre cuando eras pequeño y te dormias en el sofá (Un poco extraño). Has llegado a tu casa sano y salvo, esperemos que mañana sea un día más tranquilo.</p>' +
                        '<h1>FIN</h1>');
                },
                'caminar': function( character, system, action ) {
                    system.write( '<p>Decides ir caminando con tal de ahorrarte un par de euros. En cuanto das tres pasos unos chicos de aproximadamente 12 años te asaltan y te amenazan con pegarte, asi que al verte en inferioridad númerica no te queda más remedio que darles todas tus pertencias. Solo te dejan con tus calcetines de unicornio porque piensan que son muy feos. Al menos tienes los pies calentitos así que aún puedes andar, la única opción es <a href=vueltacasaandando> seguir caminando </a> hasta llegar a casa </p>');
                }
            }
        }
    ),

    vueltacasaandando: new undum.SimpleSituation(
        "<h1>Puerta de casa</h1>  \<img width=500 height=600 class='img-situation' src='./media/img/puerta.jpg'><p> ¡Has llegado a casa!, usas la llave para entrar. piensas en si <a href='alarma'>ponerte una alarma</a> para ir mañana a clases o <a href='descanso'>tomarte un dia de descanso</a></p >"
    ),

    alarma: new undum.SimpleSituation(
        "<h1>Día siguiente</h1> <p> Suena la alarma y te despiertas. Te das cuenta de que todo ha sido un sueño y que está historia tiene ese ya cansino giro argumental que se ve venir en cuanto se habla de sueños. Te cabreas mucho y acabas la historia</p >" +
        "<h1>FIN</h1>"
    ),

    descanso: new undum.SimpleSituation(
        "<h1>Día siguiente</h1> <p>Te despiertas y miras por la ventana. Ves que hace un día estupendo y te dan ganas de ir a la piscina, así que avisas a tus amigos para pasar un día de natación ya que siempre que quedas con tus amigos te lo pasas genial... más o menos </p>" +
        "<h1>FIN</h1>"
    ),

    salidanocalcetin: new undum.SimpleSituation(

        "<p>Salir sin calcetines es peligroso, además tus pies no son especialmente bonitos. Puedes pensar todo lo que quieras, pero sabes que deberás  <a href='pasillo'>volver a por tus calcetines</a></p>"
    ),
};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "start";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
    calcetin: new undum.OnOffQuality(
        "calcetin", {priority:"0001", group:'inventario', onDisplay:"&#10003;"}
    ),
    llave: new undum.OnOffQuality(
        "Llave", {priority:"0002", group:'inventario', onDisplay:"&#10003;"}
    )
};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    inventario: new undum.QualityGroup('Inventario', {priority:"0001"})
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
    system.setQuality( "calcetin" , false )
    system.setCharacterText("<p>Visita al circo</p>");
};

