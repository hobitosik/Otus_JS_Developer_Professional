'use strict';

class PathService {

    getPath( htmlEl ){
        let selector = htmlEl.tagName.toLowerCase();
    
        // TODO: Если есть атрибут id, то возвращаем путь начиная с #ID
        if( htmlEl.hasAttribute('id') ) return `#${htmlEl.id}`;
    
        // TODO: добавляем псевдоклассы
        selector = this.getPseudoClass( htmlEl )
    
        // TODO: если есть класс, то добавляем к селектору
        if( htmlEl.hasAttribute('class') ) 
            selector = `${selector}.${htmlEl.className.split(' ').join('.')}`
    
        while( htmlEl = htmlEl.parentElement ){
            // TODO: если дошли до body, то дальше ничего не ищем и возвращаем полученный путь
            if( htmlEl.tagName === 'BODY' ){
                selector = `body>${selector}`;
                break
            }else{
                let _selector;
    
                // TODO: Если есть атрибут id, то возвращаем путь начиная с #ID
                if( htmlEl.hasAttribute('id') ){
                    selector = `#${htmlEl.id}>${selector}`;
                    break
                }
                // TODO: добавляем псевдоклассы
                _selector = this.getPseudoClass( htmlEl )
    
                // TODO: если есть класс, то добавляем к селектору
                _selector = htmlEl.hasAttribute('class') ? `${_selector}.${htmlEl.className.split(' ').join('.')}` : _selector;
    
                selector = `${_selector}>${selector}`
            }
            
            // console.log( 'while: ->', selector);
        }
    
        return selector
    }
    
    getPseudoClass( el ){
        if( !el.parentElement ) return el.tagName.toLowerCase();
        let childArr = Array.from( el.parentElement.children );
        let typeChildArr = childArr.filter( child => el.tagName === child.tagName )
    
        if( 
            el.previousElementSibling == null && el.nextElementSibling == null
            || typeChildArr.length === 1 
            || childArr.filter( child => el.className === child.className ).length === 1
        ) return el.tagName.toLowerCase()
        if( el.previousElementSibling == null ) return `${el.tagName.toLowerCase()}:first-child`
        if( el.nextElementSibling == null ) return `${el.tagName.toLowerCase()}:last-child`
    
        // TODO: nth-child(index) / nth-of-type(index)
        let index, nth;
        if( typeChildArr.length === childArr.length ){
            nth = ':nth-child'
            index = childArr.findIndex(child => child == el)
        }else{
            nth = ':nth-of-type'
            index = typeChildArr.findIndex(child => child == el);
        }
        
        return `${el.tagName.toLowerCase()}${nth}(${index+1})`
    }
}

const service = new PathService()

//
document.querySelector("*").addEventListener("click", ev => {
    ev.stopPropagation();
    ev.preventDefault();
    const uniqueEl = service.getPath( ev.target );
    console.log( 'getPath: ->', uniqueEl );
    console.log( 'length ->', document.querySelectorAll( uniqueEl ).length )
});

if( typeof module !== "undefined" ) module.exports = PathService
