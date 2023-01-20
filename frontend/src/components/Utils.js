/*------------Date Parser*/
export default function dateParser(num) {
    let options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }

    let timestamp = Date.parse(num)

    let date = new Date(timestamp).toLocaleDateString('fr-Fr', options)

    return date.toString()
}

/*------------Timestamp Parser*/
export function timestampParser(num) {
    let options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }

    let date = new Date(num).toLocaleDateString('fr-FR', options)

    return date.toString()
}