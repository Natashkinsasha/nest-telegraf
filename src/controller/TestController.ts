import BotController from "../decorator/BotController";
import Hears from "../decorator/Hears";
import Context from "../decorator/Context";
import {ContextMessageUpdate} from "telegraf";
import {Injectable} from "@nestjs/common";
@BotController()
@Injectable()
export default class TestController{


    @Hears('/test')
    public test(@Context() ctx: ContextMessageUpdate){
        ctx.reply('hi')
    }

}