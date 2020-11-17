require('./components/my-tree');
require('./components/my-leaf');

const tree = require('../tree.json');

function drawingTree( tree, el ){
    let textNodeId = tree.id;

    if( tree.items ){
        let branch = document.createElement('my-tree')
        branch.setAttribute('treeId', textNodeId)
        el.appendChild(branch)

        tree.items.forEach( item => {
            drawingTree( item, branch )
        });
    }else{
        let leaf = document.createElement('my-leaf')
        leaf.setAttribute('leafId', textNodeId)
        el.appendChild(leaf)
    }
}

drawingTree( tree, root )
