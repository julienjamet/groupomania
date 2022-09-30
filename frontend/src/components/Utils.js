function dateParser(num) {
    let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }

    let timestamp = Date.parse(num)

    let date = new Date(timestamp).toLocaleDateString('fr-Fr', options)

    return date.toString()
}

export function isEmpty(value) {
    return value === undefined || value === null
}

export default dateParser