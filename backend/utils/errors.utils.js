/*Operation----------------------------------------------------------------------------------------------------------*/
module.exports = (error) => { /*Runs a function that handles errors*/
    let errors = { pseudo: "", email: "" }

    if (error.message.includes("pseudo")) {
        errors.pseudo = "Ce pseudo est déjà utilisé !"
    }
    if (error.message.includes("email")) {
        errors.email = "Cette adresse email est déjà utilisée !"
    }

    return errors
}
/*-------------------------------------------------------------------------------------------------------------------*/