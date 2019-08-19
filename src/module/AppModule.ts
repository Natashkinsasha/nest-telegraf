import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import BotModule from "./BotModule";
import TestController from "../controller/TestController";


@Module({
    imports: [BotModule.forRoot('957352310:AAH2Dl2eV57a3c0e2KF7Jjybc9QOaCXl8dw')],
    providers: [TestController],
})
export default class AppModule implements NestModule {


    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        return undefined;
    }

}
