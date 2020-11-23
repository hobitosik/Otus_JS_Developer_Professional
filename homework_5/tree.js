const fs = require('fs');
const PATH = require('path');

let filesArr = [];
let dirsArr = [];
let tree = {
    files: filesArr,
    dirs: dirsArr
}
const printPath = process.argv[2] ? process.argv[2] : './src/foo';
const pathToFolder = PATH.dirname( printPath )

async function getFolderTree( path ){

    await printDirname( path ).catch( console.error );
    await console.log('tree:', tree);
}

async function printDirname( path ){

    const dir = await fs.promises.opendir( path );
    for await ( const dirent of dir ){
        const newPath = path + '/'+ dirent.name;
        if( dirent.isDirectory() ){
            dirsArr.push( newPath.slice( pathToFolder.length+1 ) );
            printDirname( newPath ).catch( console.error );
        }else{
            filesArr.push( newPath.slice( pathToFolder.length+1 ) )
        }
    }
}

getFolderTree( printPath ).catch( console.error );
