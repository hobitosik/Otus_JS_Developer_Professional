'use strict';

function maxItemAssociation( usersItems ){
    let allItems = usersItems.reduce(( acc, items )=>{
        items.forEach( item => { 
            if( !acc.includes( item ) )
                acc.push( item ) 
        })
        return acc
    }, []);
    let groupsArr = getСrossingArr( usersItems, allItems )
    let result = sortLengthLexic( groupsArr )[0].split('')
    console.log('maxItemAssociation:', result);
    alert(`maxItemAssociation: ${result}`);
    return result
}

function sortLengthLexic( arr ){
    let itemLexicArr = arr.map( itemArr => itemArr.sort().join('') ).sort();
    return itemLexicArr.sort(( a, b ) => a.length <= b.length ? 1 : -1 );
}

function getСrossingArr( usersItems, allItems ){
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

        if( isIncludesToArr( acum, joinUnionArr ) && !isContainsToArr( acum, joinUnionArr ) )
            acum.push( joinUnionArr )

        return acum
    }, []);

    // console.log('crossingArr', crossingArr)
    return crossingArr
}

function isIncludesToArr( arr, addedArr ){
    let joinArr = arr.map( item => item.sort().join(''))
    let joinAddedArr = addedArr.sort().join('')
    return joinArr.indexOf( joinAddedArr ) === -1
}

function isContainsToArr( arr, addedArr ){
    let joinArr = arr.map( item => item.sort().join(''))
    return addedArr.some( item => joinArr.some( str => ~str.indexOf( item ) ))
}
