function convertPhoneNumber(phone: string) {
    const regExp = /^(\+98)?9\d{9}$/;
    let result = phone;
    const startWith98 = regExp.test(phone);

    if (startWith98) result = phone.replace(/^\+98/g, '0');

    return result;
}

export default convertPhoneNumber;