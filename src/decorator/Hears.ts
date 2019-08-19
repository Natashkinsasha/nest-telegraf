import {HearsTriggers} from "telegraf";
import {handlers} from "./BotController";


export default (triggers: HearsTriggers) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    handlers.push({class: target.constructor, method: propertyKey, type: 'hears', property: [triggers]})
}