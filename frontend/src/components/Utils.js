function dateParser(num) {
    let options = {
        year: "numeric", month: "short", weekday: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    }

    let timestamp = Date.parse(num)

    let date = new Date(timestamp).toLocaleDateString('fr-Fr', options)

    return date.toString()
}

export default dateParser