import PasswordValidator from "password-validator";
var schema = new PasswordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase(1)                              // Must have at least 1 uppercase letters
.has().lowercase(1)                              // Must have at least 1 lowercase letters
.has().digits(1)                                // Must have at least 1 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123','Admin@123','Password@123']); // Blacklist these values

export default function formValidator(e) {
    let { name, value } = e.target
    console.log(name);
    switch (name) {
        case "name":
        case "color":
        case "username":
        case "subject":
            if (!value || value.length === 0) {
                return name + " Field is Mandatory"
            }

            else if (value.length < 3 || value.length > 50) { return name + "Field length Must be 3-50 Characters" }
            else { return "" }

        case "email":
            if (!value || value.length === 0) {
                return name + "Field is Mandatory"
            }

            else if (value.length < 3 || value.length > 50) { return name + "Field length Must be 13-50 Characters" }
            else { return "" }

            case "password":
                if(!value || value.length === 0)
                    return "Password Field is Mendatory"
                else if(!schema.validate(value))
                    return "Invalid Password, it Must Contains 8-100 Characters, At Least 1 Upper Case Characters, 1 Lower Case Character, 1 Digit and Doesn't Include any Special case"
                else {return ""}

            case "phone":
            if (!value || value.length === 0) {
                return name + "Field is Mandatory"
            }

            else if (value.length < 10 || value.length > 10) { return name + "Field length Must be 10 Characters" }
            else if(!(value.startsWith("6")||value.startsWith("7")||value.startsWith("8")||value.startsWith("9"))){ return "Invalid Phone Number, It Must Start With 6,7,8 or 9" }
            else { return "" }




        case "size":
            if (!value || value.length === 0) {
                return name + "Field is Mandatory"
            }

            else if (value.length > 10) { return name + "Field length Must Upto 10 Characters" }
            else { return "" }

        case "basePrice":
            if (!value || value.length === 0) {
                return name + "Field is Mandatory"
            }

            else if (value < 1) { return name + "Base Price Must be More then 0" }
            else { return "" }

        case "discount":
            if (!value || value.length === 0) {
                return name + "Field is Mandatory"
            }

            else if (value < 0 || value > 100) { return name + "Discount Must Be 0-100" }
            else { return "" }

        case "stockQuantity":
            if (!value || value.length === 0) {
                return name + "Field is Mandatory"
            }

            else if (value < 0) { return name + "Stock Quantity Must Not Be Negative" }
            else { return "" }

        case "message":
            if (!value || value.length === 0) {
                return name + "Field is Mandatory"
            }

            else if (value.length < 50) { return name + "Field length Must be More than 50 Characters" }
            else { return "" }
        default:
            { return "" }
    }

}