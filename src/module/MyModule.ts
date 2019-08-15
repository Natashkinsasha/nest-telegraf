import TelegramBotModule from "./TelegramBotModule";
import {Module} from "@nestjs/common";
import TestController from "../controller/TestController";

@Module({
    providers: [TestController]
})
export default class MyModule extends TelegramBotModule {

    public onModuleInit(){
        this.init('token');
    }

}