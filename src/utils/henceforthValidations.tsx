
var EmailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var UserNameRegEx = /^[a-zA-Z_]{0,60}$/;
var NumericNumberRegEx = /^[0-9]{0,20}$/;
var NumericResultRegEx = /^(\d{0,2}(\.\d{1,2})?|100(\.00?)?)$/;
var NameRegEx = /^[a-zA-Z \s()-]{0,60}$/;
var NumberRegEx = /^[0]?[789]\d{9}$/;
var IndNumberRegEx = /^((\+91)?|91)?[789][0-9]{9}/;
var strongPasswordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,16}$/

const email = (email: string) => {
    return EmailRegEx.test(String(email).toLowerCase());
}
const numberDataTypeValidation = (str: string) => {
    return typeof (str) === "number";
}
const nameValidation = (str: string) => {
    return NameRegEx.test(String(str).trim());
}
const UserNameValidation = (str: string) => {
    return UserNameRegEx.test(String(str).trim());
}
const MobileNumberValidation = (str: string) => {
    return NumberRegEx.test(str);
}
const NumberValidation = (str: string) => {
    return NumericNumberRegEx.test(str);
}
const ResultValidation = (str: string) => {
    return NumericResultRegEx.test(str);
}
const MobileNumberWithInValidation = (str: string) => {
    return IndNumberRegEx.test(str);
}
const FoodLicenseValidation = (str: string) => {
    // return FoodLicenseRegEx.test(str);
    return str
}
const DrugLicenseValidation = (str: string) => {
    // return DrugLicenseRegEx.test(str);
    return str
}

const AddressValidation = (str: string) => {
    // return (String(str).length > 10) ? AddressRegEx.test(str) : false
    return (String(str).trim().length > 10) ? str : false
}





const StringValidation = (str: string) => {
    return (typeof (str) === 'undefined') ? false : (String(str).trim().length >= 3) ? nameValidation(str) : false
}
const ObjectValidation = (str: string) => {
    return (typeof (str) === 'object')
}
const LengthValidation = (str: string, length: number) => {
    return (String(str).trim().length > length)
}
const capitalizeFirstLetter = (string: string) => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        return `_`
    }
}
const uppercaseWords = (str: string) => str?.split("-")?.join(" ")?.toLowerCase()?.replace(/^(.)|\s+(.)/g, c => c?.toUpperCase())
const strongPassword = (str: string) => {
    return strongPasswordRegEx.test(str);
}

const stringReplace = (str: string) => {
    let newStr = str?.toLocaleLowerCase()
    newStr = newStr?.split("&")?.join("-")
    return newStr?.replace(/ /g, "-")
}








const toUppCase = (val:string) => {
    if(val){
        const newVal = val?.toUpperCase()
        return newVal
    }
}
const toLowCase = (val:string) => {
    if(val){
        const newVal = val?.toLowerCase()
        return newVal
    }
}

const henceforthValidations = {
    toUppCase,
    toLowCase,
    stringReplace,
    email,
    numberDataTypeValidation,
    nameValidation,
    UserNameValidation,
    MobileNumberValidation,
    NumberValidation,
    ResultValidation,
    MobileNumberWithInValidation,
    AddressValidation,
    StringValidation,
    ObjectValidation,
    LengthValidation,
    capitalizeFirstLetter,
    strongPassword, 
    uppercaseWords
}
export default henceforthValidations