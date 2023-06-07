function validateInputName(inputName) {
    if(typeof inputName !== 'string' || inputName.length > 30 || inputName.length < 4) {
        return false;
    }

    const regExRuLetters = /^[А-я]+$/;

    if(!regExRuLetters.test(inputName)) {
        return false;
    }

    return true;
}

function validateLDAP(LDAP) {
    if(typeof LDAP !== 'string' || LDAP.length !== 8 || LDAP[0] !== '6') {
        return false;
    }

    const regExOnlyNumbers = /^[0-9]+$/;

    if (!regExOnlyNumbers.test(LDAP)) {
        return false;
    }

    return true;
}

function validatePassword(password) {
    if (typeof password !== 'string' || password.length < 6 || password.length > 50) {
        return false;
    }
    return true;
}

function validateSubdivision(subdivision) {
    if(typeof subdivision !== 'string' || (subdivision !== 'Коммерция' && subdivision !== 'Логистика')) {
        return false;
    }
    return true;
}

function validateDepartment(department) {
    if(typeof department !== 'number' || department < 0 || department > 15) {
        return false;
    }
    return true;
}

export function validateUserOnRegister(firstName, lastName, LDAP, department, subdivision, password) {
    if (
        validateInputName(firstName) &&
        validateInputName(lastName) &&
        validateLDAP(LDAP) &&
        validateDepartment(department) &&
        validateSubdivision(subdivision) &&
        validatePassword(password)
    ) {return ({message: "OK"})} else {
        return ({message: "Некорректно введены пользовательские данные"})
    }
}