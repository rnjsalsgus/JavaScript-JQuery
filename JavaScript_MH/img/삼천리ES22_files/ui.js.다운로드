if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var CustomUi = (function(cui) {
    
    var filter   = 'win16|win32|win64|mac|macintel';
    
    
    var uiRdCh = function(){
        //input radio, checkbox

        var _inp    = document.querySelectorAll('input[type=radio], input[type=checkbox]');

        _inp.forEach(function(el) {
            
            var _wrap = el.parentNode, 
                    _wrap_tag = _wrap.tagName.toLowerCase();
                    
            if( _wrap_tag  == 'label' && _wrap.querySelector('._icon') == null ){

                var span = document.createElement("span");
                    span.setAttribute('class', '_icon');

                insertAfter(el, span);
            }

        });
    }


    var uiNumber = function() {

        //input number 

        var _inp    = document.querySelectorAll('[type=number]');

        if ( navigator.platform ) {

            if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {

                _inp.forEach(function(el) {

                    var inpType = el.getAttribute('type');

                    //mobile
                    if(inpType != 'number'){

                        _inp.setAttribute('type', 'number').setAttribute('inputmode', 'numeric');

                    }

                    //pc
                    _inp.setAttribute('pattern', '[0-9]*');

                });

            }

        }

        _inp.forEach(function(el) {

            el.addEventListener('input', function() {

                var maxLen = el.getAttribute('maxlength') || -1,

                    val    = el.value.replace(/[^0-9]/g,'') ;

                if(maxLen < 0){

                    el.value = val;

                }else{
                    
                    el.value = val.substr(0, maxLen) ;

                }

            });

        }); 
    }

    var uiSel = function() {
        //input select
        
        var _sel    = document.querySelectorAll('select.sel'),
                
        placeholder = function(el){ 

            var val     = el.value;
            var place   = el.getAttribute('data-placeholder');

            if(val == '' || val == null || val ==  place ){

                if(!el.classList.contains('placeholder')){

                    el.classList.add('placeholder');

                }

            }else{

                if(el.classList.contains('placeholder')){

                    el.classList.remove('placeholder');

                }

            }
        }

        _sel.forEach(function(el) {
            var _wrap = el.parentNode; 
                
            if(!_wrap.classList.contains('sel_box')){
                var div = document.createElement("div");
                    div.setAttribute('class', 'sel_box');

                insertAfter(el, div);
                div.appendChild(el);
            }

            placeholder(el);

            if(!el.classList.contains('__customUi')){

                el.classList.add('__customUi');

                el.addEventListener('change', function() {

                    placeholder(el);

                });
            }

        });
        
    }

    function init(tt){

        uiRdCh();

        uiNumber();

        //uiSel();

    }
    
    return {
       'init'   : init,
       'rdCh '  : uiRdCh,
       'number' : uiNumber,
       'sel'    : uiSel,
    };
})();


window.addEventListener('load', function(){

    CustomUi.init();

});