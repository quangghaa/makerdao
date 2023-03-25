import { Characteristic } from "../components/tags/Characteristic"
import { ICharacteristic } from "../types/types"

export const mapCharacterristic: React.FC<ICharacteristic> = (ch: ICharacteristic) => {
    switch (ch.tipe) {
        case 'yellow':
            return <Characteristic text={ch.text} color={'yellow'} background={'yellow'} />
        case 'orange':
            return <Characteristic text={ch.text} color={'orange'} background={'yellow'} />
        case 'yellow-pink':
            return <Characteristic text={ch.text} color={'yellow-pink'} background={'yellow-pink'} />
        case 'pink':
            return <Characteristic text={ch.text} color={'pink'} background={'pink'} />
        case 'green':
            return <Characteristic text={ch.text} color={'green'} background={'lightgreen'} />
        case 'blue-green':
            return <Characteristic text={ch.text} color={'green-blue'} background={'lightblue'} />
        case 'blue':
            return <Characteristic text={ch.text} color={'blue'} background={'lightblue'} />
        case 'gray':
            return <Characteristic text={ch.text} color={'gray'} background={'gray'} />
        default:
            return <Characteristic text={ch.text} color={'yellow-pink'} background={'yellow-pink'} />
    }
}