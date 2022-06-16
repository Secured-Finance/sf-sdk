import { ethereum } from "@graphprotocol/graph-ts"

export function handleMultipleEvents(
    events: Array<ethereum.Event>,
    // eslint-disable-next-line no-unused-vars
    handler: (_: ethereum.Event) => void
): void {
    events.forEach(event => {
        handler(event)
    })
}
