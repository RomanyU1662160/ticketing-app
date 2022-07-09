import EventEmitter from "events";

const Emitter = new EventEmitter();

export const triggerEvent = (eventName: string): void => {
    Emitter.emit(eventName)
}

export const listenTo = (eventName: string) => {
    Emitter.on(eventName, () => {
        console.log(`Event ${eventName} been triggered.`);
    })
}

