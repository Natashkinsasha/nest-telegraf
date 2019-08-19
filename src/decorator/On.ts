import Telegraf, {HearsTriggers} from "telegraf";
import * as tt from "telegraf/typings/telegram-types";


export default (updateTypes: tt.UpdateType | tt.UpdateType[] | tt.MessageSubTypes | tt.MessageSubTypes[]) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

}