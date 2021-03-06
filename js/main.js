// variables
var metodos = ['test', 'exec', 'match', 'search', 'replace', 'split'];

//funciones
function validarForm(){
    var errores = '', retorno = 1;
    
    if (jQuery.trim($('#texto').val()) === ''){
        errores += '<li>Ingrese el texto donde buscar.</li>';
    }
    
    //if (jQuery.trim($('#patron').val()) === ''){
    if ($('#patron').val() === ''){
        errores += '<li>Ingrese la expresion regular a buscar.</li>';
    }
    
    if (jQuery.trim($('#funcion').val()) === ''){
        errores += '<li>Seleccione un metodo para ejecutar.</li>';
    }
    
    $('#resultados_1').html('');
    $('#resultados_2').html('');
    
    if (errores !== ''){
        retorno = 0;
        errores = '<ul class="errores">' + errores + '</ul>';
        
        $('#resultados_1').html(errores);
    }
    
    return retorno;
}

function mostrarResultados2(er){
    mensaje = 'oer.lastIndex: ' + er.lastIndex + ' - oer.source: ' +
    er.source;
    
    $('#resultados_2').html(mensaje);
}

function codComunExecMatch(resultado, ind){
    if (resultado === null){
        mensaje = metodos[ind] + ': null';
    }else{
        mensaje = metodos[ind] + '.index: ' + resultado.index + '<br>' +
        metodos[ind] + '.input: ' + resultado.input + '<br>' +
        metodos[ind] + '[0]: ' + resultado[0] + '<br>' + metodos[ind] +
        ': ' + resultado;    
    }
    
    $('#resultados_1').html(mensaje);
}

function convertirCaracteresHtml(texto){
    var retorno = '';
    
    retorno = texto.replace(/ /g, '&nbsp;');
    /*
    retorno = retorno.replace('ñ', '&ntilde;');
    retorno = retorno.replace('Ñ', '&Ntilde;');
    retorno = retorno.replace('á', '&aacute;');
    retorno = retorno.replace('é', '&eacute;');
    retorno = retorno.replace('í', '&iacute;');
    retorno = retorno.replace('ó', '&oacute;');
    retorno = retorno.replace('ú', '&uacute;');
    retorno = retorno.replace('Á', '&Aacute;');
    retorno = retorno.replace('É', '&Eacute;');
    retorno = retorno.replace('Í', '&Iacute;');
    retorno = retorno.replace('Ó', '&Oacute;');
    retorno = retorno.replace('Ú', '&Uacute;');
    */
    return retorno;
}

// main
$(document).ready(function(){
    $('#procesar').click(function(){
        if (validarForm()){
            var expresion = $('#patron').val();
            var resultado, er, i, mensaje = '';
            var metodo = $('#funcion').val();
            var flags = '', texto = '';
            
            $('input.flag').each(function(){
                if ($(this).is(':checked')){
                    flags += $(this).val();
                }
            });
            
            er = new RegExp(expresion, flags);
            
            $('#resultados_1').html('');
            $('#resultados_2').html('');
            
            if (metodo == metodos[0]){
                resultado = er.test($('#texto').val());
                
                mensaje = metodos[0] + ': ' + ((resultado)?'true':'false');
                
                $('#resultados_1').html(mensaje);
                
                mostrarResultados2(er);
            }else if (metodo == metodos[1]){
                resultado = er.exec($('#texto').val());
                
                codComunExecMatch(resultado, 1);
                mostrarResultados2(er);
            }else if (metodo == metodos[2]){
                texto = $('#texto').val();
                
                resultado = texto.match(er);
                
                codComunExecMatch(resultado, 2);
            }else if (metodo == metodos[3]){
                texto = $('#texto').val();
                
                resultado = texto.search(er);
                
                mensaje = metodos[3] + ': ' + resultado;
                
                $('#resultados_1').html(mensaje);
            }else if (metodo == metodos[4]){
                texto = $('#texto').val();
                
                resultado = texto.replace(er, $('#nuevo').val());
                
                mensaje = metodos[4] + ': ' + convertirCaracteresHtml(resultado);
                
                $('#resultados_1').html(mensaje);
            }else if (metodo == metodos[5]){
                texto = $('#texto').val();
                
                resultado = texto.split(er);
                mensaje = metodos[5] + ':<br>';
                
                for (i = 0; i < resultado.length; i++){
                    mensaje += 'resultado[' + i + ']: ' + resultado[i] + '<br>';
                }
                
                $('#resultados_1').html(mensaje);
            }
        }
    });
    
    $('#funcion').change(function(){
        var clase = 'nuevo_texto';
        
        if ($(this).val() == 'replace'){
            if ($('#nuevo').parent().hasClass(clase)){
                $('#nuevo').parent().removeClass(clase);
            }
        }else{
            if (!$('#nuevo').parent().hasClass(clase)){
                $('#nuevo').parent().addClass(clase);
            }
        }
    });
    
    $('#texto').focus();
});