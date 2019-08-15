import BotController from "../decorator/BotController";
import Hears from "../decorator/Hears";
import Context from "../decorator/Context";
import {ContextMessageUpdate} from "telegraf";
import {Injectable} from "@nestjs/common";

@BotController()
export default class TestController{

    @Hears('/^\\/tasks$/m')
    public test(@Context() ctx: ContextMessageUpdate){

    }

}