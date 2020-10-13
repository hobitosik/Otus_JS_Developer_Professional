'use strict';

const usersItemsArr = [["a", "b"], ["a", "c"], ["d", "e"]];

function maxItemAssociation( usersItems ){
    let result = [];
    let allItems = usersItems.reduce(( acc, items )=>{
        items.forEach( item => { 
            if( !acc.includes( item ) ) 
                acc.push( item ) 
        })
        return acc
    }, []);
    
    let groupsArr = getСrossingArr( usersItems, allItems );
    result = sortLengthLexic( groupsArr )[0].split('')
    console.log('maxItemAssociation:', result)
    return result
}

function sortLengthLexic( arr ){
    let itemLexicArr = arr.map( itemArr => itemArr.sort().join('') ).sort();
    return itemLexicArr.sort((a, b) => a.length <= b.length ? 1 : -1);
}

function getСrossingArr( usersItems, allItems ){ // [["a", "b"], ["a", "c"], ["d", "e"]]
    let crossingArr = allItems.reduce(( acum, itm ) => {

        let union = usersItems.reduce(( acc, counter )=>{
            if( counter.includes( itm ) && !acc.includes( counter )) acc.push( counter )
            return acc
        }, [])

        let joinUnionArr = union.reduce(( acc, items )=>{
            items.forEach( item => { 
                if( !acc.includes( item ) ) 
                    acc.push( item ) 
            })
            return acc
        }, []);
        if( isIncludesToArr( acum, joinUnionArr ) )
            acum.push( joinUnionArr )

        return acum
    }, []);

    // console.log('crossingArr', crossingArr)
    return crossingArr
}

function isIncludesToArr( arr, addedArr ){
    let joinArr = arr.map( item => item.sort().join(''))
    return joinArr.indexOf( addedArr.sort().join('') ) === -1
}

