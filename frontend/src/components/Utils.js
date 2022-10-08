/*------------Date Parser*/
export default function dateParser(num) {
    let options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }

    let timestamp = Date.parse(num)

    let date = new Date(timestamp).toLocaleDateString('fr-Fr', options)

    return date.toString()
}


/*------------Is Empty*/
export function isEmpty(value) {

    return value === undefined || value === null
}