import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import BotModule from "./BotModule";
import TestController from "../controller/TestController";
import TunnelModel from "./TunnelModel";
import {Tunnel} from "localtunnel";
import {ModuleRef} from "@nestjs/core";
import Telegraf from "telegraf";
import TestModule from "./TestModule";


@Module({
    imports: [TestModule, TunnelModel.forRoot(3000), BotModule.forRootAsync({
        useFactory: (tunnel: Tunnel) => {
            console.log(tunnel);
            return {
                token: '957352310:AAH2Dl2eV57a3c0e2KF7Jjybc9QOaCXl8dw',
            }
        },
        inject: ['Tunnel']
    })],
    providers: [TestController],
})
export default class AppModule implements NestModule {

    constructor(ref: ModuleRef) {
        console.log({tmp1: ref.get('Test', {strict: false})})
        console.log({tmp2: ref.get(Telegraf, {strict: false})})
        console.log({tmp3: ref.get('Tunnel', {strict: false})})
    }


    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        return undefined;
    }

}
