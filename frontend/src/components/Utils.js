function dateParser(num) {
    let options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }

    let timestamp = Date.parse(num)

    let date = new Date(timestamp).toLocaleDateString('fr-Fr', options)

    return date.toString()
}

export default dateParser