import {properties} from "./BotController";


export default () => (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    properties.push({target, propertyKey, parameterIndex, type: 'next'})
}