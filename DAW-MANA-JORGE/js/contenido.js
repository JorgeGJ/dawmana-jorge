{
    //mostrar programa
    let mostrarPrograma = function (event) {
        $("main").html("<div id='contenidoPrograma'>" +
            "<h2 id='tituloPrograma'>Programa</h2>" +
            "<ul>" +
            "<li class='selectedMenuPrograma'><a id='Lunes' href='#'>Lunes</a></li>" +
            "<li><a id='Martes' href='#'>Martes</a></li>" +
            "<li><a id='Miercoles' href='#'>Miércoles</a></li>" +
            "<li><a id='Jueves' href='#'>Jueves</a></li>" +
            "<li><a id='Viernes' href='#'>Viernes</a></li>" +
            "</ul>" +
            "<div class='actividadesDia'>" +
            "" +
            "</div>" +
            "</div>");
        funcionalidadDias();
    };
    let $botonpulsado;
    let funcionalidadDias = function () {
        $("#contenidoPrograma a").on("click", function (event) {
            $botonpulsado=this.id;
            $.getJSON("informacion/actividades.json", {dia: this.id})
                .done(cargarDatos)
                .fail(mensajeError);
        })
            .on("focus", function () {
                $(this).parent().parent().find(".selectedMenuPrograma").removeClass("selectedMenuPrograma");
                $(this).parent().addClass("selectedMenuPrograma");
            });
            $("#Lunes").click();
    };
    let ponencias = function(dia){
        $.each(dia, function (indices, actividad) {
            $(".actividadesDia").append("" +
                "<h3 title='La actividad trata sobre " + actividad.nombreActividad + "'>" + actividad.nombreActividad + "</h3>" +
                "<div>" +
                "<img class='fotoPonente' src='" + actividad.foto + "'>" +
                "<p><i class='fa fa-user'></i> " + actividad.nombrePonentes + "</p>" +
                "<p><i class='fa fa-building'></i> " + actividad.procedencia + "</p>" +
                "<p><i class='fa fa-clock'></i> " + actividad.hora + "</p>" +
                "<p><i class='fa fa-comment'></i> " + actividad.descripcion + "</p>" +
                "<a class='asistire' href='#'>Asistiré</a>" +
                "</div>"
                );
        });;
    }
    let cargarDatos = function (data) {
        $(".actividadesDia").html("");
        $(".actividadesDia").remove();
        $("#contenidoPrograma").append("<div class='actividadesDia'></div>");
        $.each(data, function (indices, dia) {
            if (indices==$botonpulsado) {
                ponencias(dia);
            }
        });;
        $(".asistire").on("click", registroAsistente);
        $("h3[title]").tooltip({
            show: {
                effect: "slideDown",
                delay: 250
            }
        });
   
    };
    //Mostrar los ponenetes
    let mostrarPonentes = function (event) {
        $("main").html("");
        $.getJSON("informacion/actividades.json")
            .done(insertarPonentes)
            .fail(mensajeError);
    };
    let insertarPonentes = function (data) {
        $("main").append("<div id='contenidoPonentes'></div>");
        $("#contenidoPonentes").append("<h2>Ponentes</h2>" +
            "<div id='listadoPonentes'></div>");
        $.each(data, function (indice, dia) {
            $.each(dia, function (indice2, actividad) {
                $("#listadoPonentes").append("" +
                    "<div class='ponente'>" +
                    "<img src='" + actividad.foto + "' alt=''>" +
                    "<h3>" + actividad.nombrePonentes + "</h3>" +
                    "<p>" + actividad.nombreActividad + "</p>" +
                    "</div>");
            });
        });
    };
    //Mostrar las sysmanas
    let mostrarAntSysmanas = function (event) {
        event.preventDefault();
        $("main").html("");
        $.getJSON("informacion/carteles.json")
            .done(insertarSysmanas)
            .fail(mensajeError);
    };
    let insertarSysmanas = function (data) {
        $("main").append("<div id='contenidoCartelesSysmanas'></div>");
        $("#contenidoCartelesSysmanas").append("<h2>Anteriores Sysmanas</h2>" +
            "<div id='listadoSysmanas'></div>");
        $.each(data, function (indice, sysmana) {
            $("#listadoSysmanas").append("" +
                "<div class='cartel'>" +
                "<img class='fotoCartel' src='" + sysmana.foto + "' alt=''>" +
                "<h3>" + sysmana.nombre + "</h3>" +
                "</div>"
            );
        });
        $(".fotoCartel").on("click", function () {
            $("#modalCarrusel").remove();
            $("main").append("<div id='modalCarrusel'></div>");
            $("#modalCarrusel").append("<div id='carrusel'></div>");
            $.each(data, function (indice, actividad) {
                $("#carrusel").append("<div><img src='" + actividad.foto + "' alt=''></div>");
            });
            $("#carrusel").slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
            });
            $("#modalCarrusel").dialog({
                modal: true,
                resizable: false,
                draggable: false,
                width: 500,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                hide: {
                    effect: "explode",
                    duration: 1000
                }
            });
        });
    };
    //formalrio de registro
    let estilosRegistroAsistencia = function () {
        $("#nombre").css("animation", "desplazarDcha 2s");
        $("#apellidos").css("animation", "desplazarIzqda 2s");
        $("#dni").css("animation", "desplazarDcha 2s");
        $("#email").css("animation", "desplazarIzqda 2s");
        $("#procedencia").css("animation", "desplazarDcha 2s");
        $("#btnRegistroAsistencia, #btnCancelar").animate({
            opacity: "1"
        }, 2000);
        $("#nombre").on("focus", function () {
            $("#lblNombre").css("opacity", "1");
            $("#nombre").removeAttr("placeholder");
        })
            .on("blur", function () {
                $("#lblNombre").css("opacity", "0");
                $("#nombre").attr("placeholder", "Nombre:");
            });
        $("#apellidos").on("focus", function () {
            $("#lblApellidos").css("opacity", "1");
            $("#apellidos").removeAttr("placeholder");
        })
            .on("blur", function () {
                $("#lblApellidos").css("opacity", "0");
                $("#apellidos").attr("placeholder", "Apellidos:");
            });
        $("#dni").on("focus", function () {
            $("#lblDni").css("opacity", "1");
            $("#dni").removeAttr("placeholder");
        })
            .on("blur", function () {
                $("#lblDni").css("opacity", "0");
                $("#dni").attr("placeholder", "DNI:");
            });
        $("#email").on("focus", function () {
            $("#lblEmail").css("opacity", "1");
            $("#email").removeAttr("placeholder");
        })
            .on("blur", function () {
                $("#lblEmail").css("opacity", "0");
                $("#email").attr("placeholder", "Email:");
            });
        $("#procedencia").on("focus", function () {
            $("#lblProcedencia").css("opacity", "1");
            $("#procedencia").removeAttr("placeholder");
        })
            .on("blur", function () {
                $("#lblProcedencia").css("opacity", "0");
                $("#procedencia").attr("placeholder", "Procedencia:");
            });
    };
    let validarCampos = function () {
        switch ($(this)[0].id) {
            case "nombre":
            case "procedencia":
            case "observaciones":
            case "nombreActividad":
            case "descBreve":
            case "descExt":
                $("#error" + $(this)[0].id).html(validador.test(patrones.campo, $(this)));
                break;
            case "apellidos":
                $("#errorapellidos").html(validador.test(patrones.apellidos, $(this)));
                break;
            case "dni":
                $("#errordni").html(validador.testLetraDni($(this)));
                break;
            case "email":
                $("#erroremail").html(validador.test(patrones.email, $(this)));
                break;
            case "imagen":
                $("#errorimagen").html(validador.test(patrones.imagen, $(this)));
                break;
            case "materialPonente":
            case "materialAsistentes":
                $("#error" + $(this)[0].id).html(validador.test(patrones.material, $(this)));
                break;
            case "numAsistentes":
                $("#errornumAsistentes").html(validador.test(patrones.numAsistentes, $(this)));
                break;
        }
    };
    let validarTodo = function (event) {
        event.preventDefault();
        $("#errornombre").html(validador.test(patrones.campo, $("#nombre")));
        $("#errorprocedencia").html(validador.test(patrones.campo, $("#procedencia")));
        $("#errorapellidos").html(validador.test(patrones.apellidos, $("#apellidos")));
        $("#errordni").html(validador.testLetraDni($("#dni")));
        $("#erroremail").html(validador.test(patrones.email, $("#email")));
        $("#errorobservaciones").html(validador.test(patrones.campo, $("#observaciones")));
        $("#errornombreActividad").html(validador.test(patrones.campo, $("#nombreActividad")));
        $("#errordescBreve").html(validador.test(patrones.campo, $("#descBreve")));
        $("#errordescExt").html(validador.test(patrones.campo, $("#descExt")));
        $("#errorimagen").html(validador.test(patrones.imagen, $("#imagen")));
        $("#errormaterialPonente").html(validador.test(patrones.material, $("#materialPonente")));
        $("#errormaterialAsistentes").html(validador.test(patrones.material, $("#materialAsistentes")));
        $("#errornumAsistentes").html(validador.test(patrones.numAsistentes, $("#numAsistentes")));
    };
    let asignarFuncionalidadRegistro = function () {
        $("#nombre, #procedencia, #apellidos, #email, #dni").on("blur", validarCampos);
        $("#btnRegistroAsistencia").on("click", validarTodo);
    };
    let registroAsistente = function (event) {
        $("main").html("<div id=\"formRegistro\">\n" +
            "        <form action=\"\" method=\"post\">\n" +
            "            <h2>Registro</h2>\n" +
            "            <label id=\"lblNombre\" for=\"nombre\">Nombre:</label>\n" +
            "            <input class=\"formControl\" type=\"text\" name=\"nombre\" id=\"nombre\" placeholder=\"Nombre\">\n" +
            "            <span id='errornombre'></span>" +
            "            <label id=\"lblApellidos\" for=\"apellidos\">Apellidos</label>\n" +
            "            <input class=\"formControl\" type=\"text\" name=\"apellidos\" id=\"apellidos\" placeholder=\"Apellidos\">\n" +
            "            <span id='errorapellidos'></span>" +
            "            <label id=\"lblDni\" for=\"dni\">DNI:</label>\n" +
            "            <input class=\"formControl\" type=\"text\" name=\"dni\" id=\"dni\" placeholder=\"DNI\">\n" +
            "            <span id='errordni'></span>" +
            "            <label id=\"lblEmail\" for=\"email\">Email:</label>\n" +
            "            <input class=\"formControl\" type=\"text\" name=\"email\" id=\"email\" placeholder=\"Email\">\n" +
            "            <span id='erroremail'></span>" +
            "            <label id=\"lblProcedencia\" for=\"procedencia\">Procedencia</label>\n" +
            "            <input class=\"formControl\" type=\"text\" name=\"procedencia\" id=\"procedencia\"\n" +
            "                   placeholder=\"Procedencia\">\n" +
            "            <span id='errorprocedencia'></span>" +
            "            <div id=\"botonesForm\">\n" +
            "                <input type=\"submit\" name=\"registro\" id=\"btnRegistroAsistencia\" value=\"Registrarse\">\n" +
            "            </div>\n" +
            "        </form>\n" +
            "    </div>");
        estilosRegistroAsistencia();
        asignarFuncionalidadRegistro();
        $("#btnCancelar").on("click", mostrarPrograma);
    };
    //mensaje de error
    let mensajeError = function () {
        $(".actividadesDia").html("Error al obtener los datos");
    };
    //Cargar el menu
    let cargarAsidePrincipal = function () {
        $("main").html("");
        $("nav").html("<ul id=\"menuPrincipal\">\n" +
            "                <li><a id=\"botonPrograma\" href=\"#\">Programa</a></li>\n" +
            "                <li><a id=\"botonPonentes\" href=\"#\">Ponentes</a></li>\n" +
            "                <li><a id=\"botonAntSysmanas\" href=\"#\">Anteriores sysmanas</a></li>\n" +
            "            </ul>");
        efectosMenu();
        $("#botonPrograma").on("click", mostrarPrograma);
        $("#botonPonentes").on("click", mostrarPonentes);
        $("#botonAntSysmanas").on("click", mostrarAntSysmanas);
        $("#botonPrograma").trigger("click");
    };
    //Formulario de inicio de sesion
    let estilosModDatos = function () {
        $("#nombre").css("animation", "desplazarDcha 2s");
        $("#apellidos").css("animation", "desplazarIzqda 2s");
        $("#procedencia").css("animation", "desplazarDcha 2s");
        $("#diasPreferiblesFrom").css("animation", "desplazarIzqda 2s");
        $("#diasPreferiblesTo").css("animation", "desplazarDcha 2s");
        $("#observaciones").css("animation", "desplazarIzqda 2s");
        $("#patrocinio").css("animation", "desplazarDcha 2s");
        $("#btnRegistroAsistencia, #btnCancelar").animate({
            opacity: "1"
        }, 2000);
        $("#nombre").on("focus", function () {
            $("#lblNombre").css("opacity", "1");
            $("#nombre").removeAttr("placeholder");
        })
            .on("blur", function () {
                $("#lblNombre").css("opacity", "0");
                $("#nombre").attr("placeholder", "Nombre:");
            });
        $("#apellidos").on("focus", function () {
            $("#lblApellidos").css("opacity", "1");
            $("#apellidos").removeAttr("placeholder");
        })
            .on("blur", function () {
                $("#lblApellidos").css("opacity", "0");
                $("#apellidos").attr("placeholder", "Apellidos:");
            });
        $("#dni").on("focus", function () {
            $("#lblDni").css("opacity", "1");
            $("#dni").removeAttr("placeholder");
        })
            .on("blur", function () {
                $("#lblDni").css("opacity", "0");
                $("#dni").attr("placeholder", "DNI:");
            });
        $("#email").on("focus", function () {
            $("#lblEmail").css("opacity", "1");
            $("#email").removeAttr("placeholder");
        })
            .on("blur", function () {
                $("#lblEmail").css("opacity", "0");
                $("#email").attr("placeholder", "Email:");
            });
        $("#procedencia").on("focus", function () {
            $("#lblProcedencia").css("opacity", "1");
            $("#procedencia").removeAttr("placeholder");
        })
            .on("blur", function () {
                $("#lblProcedencia").css("opacity", "0");
                $("#procedencia").attr("placeholder", "Procedencia:");
            });
    };
    let modificarDatosPonente = function (event) {
        $("main").html("<div id=\"formRegistro\">\n" +
            "        <form action=\"\" method=\"post\">\n" +
            "            <h2>Modificar mis datos</h2>\n" +
            "            <label id=\"lblNombre\" for=\"nombre\">Nombre:</label>\n" +
            "            <input class=\"formControl\" type=\"text\" name=\"nombre\" id=\"nombre\" placeholder=\"Nombre\">\n" +
            "            <span id='errornombre'></span>" +
            "            <label id=\"lblApellidos\" for=\"apellidos\">Apellidos</label>\n" +
            "            <input class=\"formControl\" type=\"text\" name=\"apellidos\" id=\"apellidos\" placeholder=\"Apellidos\">\n" +
            "            <span id='errorapellidos'></span>" +       
            "            <label id=\"lblProcedencia\" for=\"procedencia\">Procedencia</label>\n" +
            "            <input class=\"formControl\" type=\"text\" name=\"procedencia\" id=\"procedencia\" placeholder=\"Procedencia\">\n" +
            "            <span id='errorprocedencia'></span>" +
            "            <label for='diasPreferibles'>Fecha inicio:</label>\n" +
            "            <input class=\"formControl\" type=\"text\" name=\"diasPreferiblesFrom\" id=\"diasPreferiblesFrom\" placeholder=\"Primer día\">\n" +
            "            <label for='diasPreferibles'>Fecha final:</label>\n" +
            "            <input class=\"formControl\" type=\"text\" name=\"diasPreferiblesTo\" id=\"diasPreferiblesTo\" placeholder=\"Día final\">\n" +
            "            <label for='observaciones'>Observaciones:</label>\n" +
            "            <textarea class=\"formControl\" name='observaciones' id='observaciones' cols='30' rows='6' placeholder='Observaciones'></textarea>" +
            "            <span id='errorobservaciones'></span>" +
            "            <label for='patrocinio' id='lblPatrocinio'>¿Puede patrocinarnos?</label>\n" +
            "            <input name='patrocinio' id='patrocinio' type='checkbox'>\n" +
            "            <div id=\"botonesForm\">\n" +
            "                <input type=\"submit\" name=\"modDatos\" id=\"btnRegistroAsistencia\" value=\"Modificar\">\n" +
            "            </div>\n" +
            "        </form>\n" +
            "    </div>");
        $.datepicker.regional['es'] = {
            closeText: 'Cerrar',
            prevText: '<Ant',
            nextText: 'Sig>',
            currentText: 'Hoy',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
            dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
            weekHeader: 'Sm',
            dateFormat: 'dd/mm/yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['es']);
        let dateFormat = "dd-mm-yy",
            from = $("#diasPreferiblesFrom")
                .datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    showAnim: "drop",
                    dateFormat: "dd-mm-yy",
                    minDate: new Date("January 29, 2018"),
                    maxDate: new Date("February 02, 2018")
                }).prop("readonly", "true")
                .on("change", function () {
                    to.datepicker("option", "minDate", getDate(this));
                }),
            to = $("#diasPreferiblesTo").datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                showAnim: "drop",
                dateFormat: "dd-mm-yy",
                minDate: new Date("January 29, 2018"),
                maxDate: new Date("February 02, 2018")
            }).prop("readonly", "true")
                .on("change", function () {
                    from.datepicker("option", "maxDate", getDate(this));
                });
        function getDate(element) {
            let date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            return date;
        }
        estilosModDatos();
        $("#nombre, #apellidos, #procedencia, #observaciones").on("blur", validarCampos);
        $("#btnRegistroAsistencia").on("click", validarTodo);
    };
    let estilosCrearPonencia = function () {
        $("#nombreActividad").css("animation", "desplazarDcha 2s");
        $("#descBreve").css("animation", "desplazarIzqda 2s");
        $("#descExt").css("animation", "desplazarDcha 2s");
        $("#imagen").css("animation", "desplazarIzqda 2s");
        $("#materialPonente").css("animation", "desplazarDcha 2s");
        $("#materialAsistentes").css("animation", "desplazarIzqda 2s");
        $("#numAsistentes").css("animation", "desplazarDcha 2s");
        $("#btnCrearPonencia").animate({
            opacity: "1"
        }, 2000);
    };
    let crearPonencia = function (event) {
        $("main").html("<div id='formRegistro'>" +
            "<form action='' method='post'>" +
            "<h2>Crear ponencia</h2>" +
            "<label for='nombreActividad'>Nombre de la actividad:</label>" +
            "<input class='formControl' type='text' id='nombreActividad' name='nombreActividad' placeholder='Nombre de la actividad...'>" +
            "<span id='errornombreActividad'></span>" +
            "<label for='descBreve'>Descripción breve</label>" +
            "<input class='formControl' type='text' id='descBreve' name='descBreve' placeholder='Breve descripción...'>" +
            "<span id='errordescBreve'></span>" +
            "<label for='descExt'>Descripción extensa:</label>" +
            "<textarea class='formControl' name='descExt' id='descExt' cols='30' rows='10' placeholder='Descripción extensa...'></textarea>" +
            "<span id='errordescExt'></span>" +
            "<label for='imagen'>Imagen:</label>" +
            "<input type='file' id='imagen' name='imagen'>" +
            "<span id='errorimagen'></span>" +
            "<label for='materialPonente'>Material para el ponente:</label>" +
            "<input class='formControl' type='text' id='materialPonente' name='materialPonente' placeholder='Proyector, Conexión WIFI, Conexión Ethernet, Software necesario...'>" +
            "<span id='errormaterialPonente'></span>" +
            "<label for='materialAsistentes'>Material para los asistentes:</label>" +
            "<input class='formControl' type='text' id='materialAsistentes' name='materialAsistentes' placeholder='Equipo, Windows/Linux, Eclipse, Navegador, Editor de textos...'>" +
            "<span id='errormaterialAsistentes'></span>" +
            "<label for='numAsistentes'>Número de asistentes recomendados:</label>" +
            "<input class='formControl' type='number' id='numAsistentes' name='numAsistentes' placeholder='Número de asistentes recomendados...'>" +
            "<span id='errornumAsistentes'></span>" +
            "<div id='botonesForm'>" +
            "<input type='submit' id='btnCrearPonencia' value='Crear ponencia'>" +
            "</div>" +
            "</form>" +
            "</div>");
        estilosCrearPonencia();
        $("#nombreActividad, #descBreve, #descExt, #imagen, #materialPonente, #materialAsistentes, #numAsistentes").on("blur", validarCampos);
        $("#btnCrearPonencia").on("click", validarTodo);
    };
    //Inicio de sesion
    let login = function (event) {
        event.preventDefault();
        if ($("#usuario").val() === "jorge" && $("#pass").val() === "jorge") {
            cargarMenuPonenteLogeado();
        } else {
            $("#errorLogin").html("El usuario o la contraseña no coinciden");
        }
    };
    let cargarIniciarSesion = function () {
        $("#iniciarSesion").html("<p id=\"errorLogin\"></p>\n" +
            "        <form action=\"\" method=\"post\">\n" +
            "            <label for=\"usuario\">Usuario</label>\n" +
            "            <input id=\"usuario\" name=\"usuario\" type=\"text\">\n" +
            "            <label for=\"pass\">Contraseña</label>\n" +
            "            <input type=\"password\" name=\"pass\" id=\"pass\">\n" +
            "            <input type=\"submit\" name=\"login\" id=\"login\" value=\"Entrar\">\n" +
            "        </form>");
    };
    let cerrarSesion = function () {
        cargarAsidePrincipal();
        cargarIniciarSesion();
    };
    //Menu de login
    let cargarMenuPonenteLogeado = function () {
        $("main").html("");
        $("nav").html("<ul id=\"menuPrincipal\">\n" +
            "                <li><a id=\"botonModificarDatos\" href=\"#\">Modificar mis datos</a></li>\n" +
            "                <li><a id=\"botonCrearPonencia\" href=\"#\">Crear ponencia</a></li>\n" +
            "            </ul>");
        efectosMenu();
        $("#iniciarSesion").html("<a id='cerrarSesion' href='#'>Cerrar sesión</a>");
        $("#cerrarSesion").on("click", cerrarSesion);
        $("#botonModificarDatos").on("click", modificarDatosPonente);
        $("#botonCrearPonencia").on("click", crearPonencia);
         $("#botonModificarDatos").click();
    };
    let efectosMenu = function () {
        $("#menuPrincipal a").on("focus", function () {
            $(this).parent().parent().find(".selected").removeClass("selected");
            $(this).parent().addClass("selected");
        });
    };
    //Validaciones
    let patrones = {
        campo: [/\w{3,}/, "El nombre debe tener una longitud mínima de 3 carácteres"],
        apellidos: [/\w{3,} \w{3,}/, "Los apellidos deben tener al menos 2 palabras de 3 carácteres"],
        dni: [/^(\d{8})[- ]?([a-z])$/i, 'Formatos válidos: 12345678Z, 12345678-Z, 12345678 Z'],
        email: [/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/, "El email es incorrecto"],
        imagen: [/.*\.png/, "El formato de la imagen no es correcto"],
        material: [/[\w\d]{3,},?/, "El formato no es correcto"],
        numAsistentes: [/[1-9]+/, "El número no es válido"]
    };
    let validador = {
        test: function (patron, elemento) {
            if (patron[0].test(elemento.val())) {
                return "";
            }
            return patron[1];
        },
        testLetraDni: function (dni) {
            let letras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E", "T"];
            let patron = patrones.dni[0];
            let letra;
            let numeroDni;
            let indiceLetra;
            if (dni.val() === '') {
                return " Introduce DNI";
            } else {
                if (!patron.test(dni.val())) {
                    return " Formato incorrecto";
                } else {
                    letra = dni.val().match(patron)[2];
                    numeroDni = dni.val().match(patron)[1];
                    indiceLetra = parseInt(numeroDni % 23);
                    if (letra.toUpperCase() !== letras[indiceLetra]) {
                        return " Letra incorrecta";
                    } else {
                        return '';
                    }
                }
            }
        },
    };
    //Funcion init
    $(function () {
        cargarAsidePrincipal();
        cargarIniciarSesion();
        $("#login").on("click", login);
    });
}