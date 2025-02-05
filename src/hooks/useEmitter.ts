type EmitterPayload = unknown
type Listener<T = EmitterPayload> = (payload: T) => void

class Emitter {
    private events: Map<string, Array<Listener<unknown>>>

    constructor() {
        this.events = new Map()
    }

    on<T = EmitterPayload>(event: string, listener: Listener<T>): void {
        if (!this.events.has(event)) {
            this.events.set(event, [])
        }
        this.events.get(event)!.push(listener as Listener<unknown>)
    }

    emit<T = EmitterPayload>(event: string, payload: T): void {
        const listeners = this.events.get(event)
        if (listeners) {
            listeners.forEach((listener) => listener(payload))
        }
    }
}

const emitterInstances = new Map<string, Emitter>()

function useEmitter() {
    const emitter = (eventName: string) => {
        if (!emitterInstances.has(eventName)) {
            emitterInstances.set(eventName, new Emitter())
        }
        return emitterInstances.get(eventName)!
    }

    return {
        emitter,
    }
}

export { useEmitter }
