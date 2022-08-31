import Libhoney from "libhoney"; 

let hny = new Libhoney({
    writeKey: "wP7lABNHvOTjcvDcekuOqG",
    dataset: "snapshop-app-events"
});

export const sendHoneyEvent = (eventType, searchInput, timeLapse) => {
    let ev = hny.newEvent();
    ev.addField("event_type", eventType);
    ev.addField("search_term", searchInput);
    ev.addField("duration_ms", timeLapse);
    ev.send();
}