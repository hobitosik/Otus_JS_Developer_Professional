type SONType = string | number;

interface IError extends Error {
    code: number
}

function validateBik( bik:SONType, error:IError ):boolean {
    let result:boolean = false;
    bik = ( typeof bik === 'number' ) ? bik.toString() : bik;
    if( !bik.length ){
        error.code = 1;
        error.message = 'БИК пуст';
    }else if( /[^0-9]/.test(bik) ){
        error.code = 2;
        error.message = 'БИК может состоять только из цифр';
    }else if( bik.length !== 9 ){
        error.code = 3;
        error.message = 'БИК может состоять только из 9 цифр';
    }else result = true;
    return result;
}

function validateInn( inn:SONType, error:IError ):boolean {
    let result:boolean = false;
    inn = ( typeof inn === 'number' ) ? inn.toString() : inn;
    if( !inn.length ){
        error.code = 1;
        error.message = 'ИНН пуст';
    }else if( /[^0-9]/.test(inn) ){
        error.code = 2;
        error.message = 'ИНН может состоять только из цифр';
    }else if( [10, 12].indexOf(inn.length) === -1 ){
        error.code = 3;
        error.message = 'ИНН может состоять только из 10 или 12 цифр';
    }else{
        function checkDigitFn( _inn:string, coefficients: number[] ):number {
            let n:number = 0;
            coefficients.forEach( ( coeff, index )=> n += coeff * Number(_inn[ index ]));
            return parseInt( String( n % 11 % 10 ) );
        }
        let checkDigit:( inn:string, coefficients: number[] ) => number = checkDigitFn;
        switch( inn.length ){
            case 10:
                let n10:number = checkDigit( inn, [2, 4, 10, 3, 5, 9, 4, 6, 8] );
                if( n10 === parseInt(inn[9]) ){
                    result = true;
                }
                break;
            case 12:
                let n11:number = checkDigit( inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8] );
                let n12:number = checkDigit( inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8] );
                if(( n11 === parseInt(inn[10]) )&&( n12 === parseInt(inn[11]) )){
                    result = true;
                }
                break;
        }
        if( !result ){
            error.code = 4;
            error.message = 'Неправильное контрольное число';
        }
    }
    return result;
}

function validateKpp( kpp:SONType, error:IError ):boolean {
    let result:boolean = false;
    kpp = ( typeof kpp === 'number' ) ? kpp.toString() : kpp;
    if( !kpp.length ){
        error.code = 1;
        error.message = 'КПП пуст';
    }else if( kpp.length !== 9 ){
        error.code = 2;
        error.message = 'КПП может состоять только из 9 знаков (цифр или заглавных букв латинского алфавита от A до Z)';
    }else if( !/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test(kpp) ){
        error.code = 3;
        error.message = 'Неправильный формат КПП';
    }else result = true;
    return result;
}

function validateKs( ks:SONType, bik:SONType, error:IError ):boolean {
    let result:boolean = false;
    if( this.validateBik( bik, error )){
        ks = ( typeof ks === 'number' ) ? ks.toString() : ks;
        if( !ks.length ){
            error.code = 1;
            error.message = 'К/С пуст';
        }else if( /[^0-9]/.test(ks) ){
            error.code = 2;
            error.message = 'К/С может состоять только из цифр';
        }else if( ks.length !== 20 ){
            error.code = 3;
            error.message = 'К/С может состоять только из 20 цифр';
        }else{
            let bikKs:string = '0' + bik.toString().slice(4, 6) + ks;
            let checksum:number = 0;
            let coefficients:number[] = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
            coefficients.forEach( ( coeff, index )=> checksum += coeff * Number( bikKs[ index ] ));
            if( checksum % 10 === 0 ) result = true
            else{
                error.code = 4;
                error.message = 'Неправильное контрольное число';
            }
        }
    }
    return result;
}

function validateOgrn( ogrn:SONType, error:IError ):boolean {
    let result:boolean = false;
    ogrn = ( typeof ogrn === 'number' ) ? ogrn.toString() : ogrn;
    if( !ogrn.length ){
        error.code = 1;
        error.message = 'ОГРН пуст';
    }else if( /[^0-9]/.test(ogrn) ){
        error.code = 2;
        error.message = 'ОГРН может состоять только из цифр';
    }else if( ogrn.length !== 13 ){
        error.code = 3;
        error.message = 'ОГРН может состоять только из 13 цифр';
    }else{
        let n13:number = parseInt( (parseInt( ogrn.slice(0, -1)) % 11 ).toString().slice(-1) );
        if( n13 === parseInt(ogrn[12]) ) result = true
        else{
            error.code = 4;
            error.message = 'Неправильное контрольное число';
        }
    }
    return result;
}

function validateOgrnip( ogrnip:SONType, error:IError ):boolean {
    let result:boolean = false;
    ogrnip = ( typeof ogrnip === 'number' ) ? ogrnip.toString() : ogrnip;
    if( !ogrnip.length ){
        error.code = 1;
        error.message = 'ОГРНИП пуст';
    }else if( /[^0-9]/.test(ogrnip) ){
        error.code = 2;
        error.message = 'ОГРНИП может состоять только из цифр';
    }else if( ogrnip.length !== 15 ){
        error.code = 3;
        error.message = 'ОГРНИП может состоять только из 15 цифр';
    }else{
        let n15:number = parseInt( (parseInt( ogrnip.slice(0, -1)) % 13 ).toString().slice(-1) );
        if( n15 === parseInt(ogrnip[14]) ) result = true
        else{
            error.code = 4;
            error.message = 'Неправильное контрольное число';
        }
    }
    return result;
}

function validateRs( rs:SONType, bik:SONType, error:IError ):boolean {
    let result:boolean = false;
    if( this.validateBik( bik, error ) ){
        rs = ( typeof rs === 'number' ) ? rs.toString() : rs;
        if( !rs.length ){
            error.code = 1;
            error.message = 'Р/С пуст';
        }else if( /[^0-9]/.test(rs) ){
            error.code = 2;
            error.message = 'Р/С может состоять только из цифр';
        }else if( rs.length !== 20 ){
            error.code = 3;
            error.message = 'Р/С может состоять только из 20 цифр';
        }else{
            let bikRs:string = bik.toString().slice(-3) + rs;
            let checksum:number = 0;
            let coefficients:number[] = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
            coefficients.forEach( ( coeff, index )=> checksum += coeff * Number( bikRs[ index ] ));
            if( checksum % 10 === 0 ) result = true
            else{
                error.code = 4;
                error.message = 'Неправильное контрольное число';
            }
        }
    }
    return result;
}

function validateSnils( snils:SONType, error:IError ):boolean {
    let result:boolean = false;
    snils = ( typeof snils === 'number' ) ? snils.toString() : snils;
    if( !snils.length ){
        error.code = 1;
        error.message = 'СНИЛС пуст';
    }else if( /[^0-9]/.test(snils) ){
        error.code = 2;
        error.message = 'СНИЛС может состоять только из цифр';
    }else if( snils.length !== 11 ){
        error.code = 3;
        error.message = 'СНИЛС может состоять только из 11 цифр';
    }else{
        let sum:number = 0;
        for( let i = 0; i < 9; i++ ){
            sum += parseInt( snils[i] ) * (9 - i);
        }
        let checkDigit:number = 0;
        if( sum < 100 ) checkDigit = sum
        else if( sum > 101 ){
            checkDigit = parseInt( String(sum % 101) );
            if( checkDigit === 100 ) checkDigit = 0
        }
        if( checkDigit === parseInt( snils.slice(-2) )) result = true
        else{
            error.code = 4;
            error.message = 'Неправильное контрольное число';
        }
    }
    return result;
}
