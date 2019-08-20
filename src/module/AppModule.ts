import {Inject, MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import BotModule from "./BotModule";
import TestController from "../controller/TestController";
import TunnelModel from "./TunnelModel";
import {Tunnel} from "localtunnel";
import {ModuleRef} from "@nestjs/core";
import Telegraf, {ContextMessageUpdate} from "telegraf";
import TestModule from "./TestModule";
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
    imports: [
        BotModule.forRootAsync({
            imports: [TunnelModel.forRoot(3000)],
            useFactory: (tunnel: Tunnel) => {
                console.log(`${tunnel.url}/bot${'957352310:AAH2Dl2eV57a3c0e2KF7Jjybc9QOaCXl8dw'}`);
                return {
                    token: '957352310:AAH2Dl2eV57a3c0e2KF7Jjybc9QOaCXl8dw',
                    options: {webhook: {webhookPath: `${tunnel.url}/bot${'957352310:AAH2Dl2eV57a3c0e2KF7Jjybc9QOaCXl8dw'}`, tlsOptions: null, port: 3000}}
                }
            },
            inject: ['Tunnel']
        })],
    providers: [TestController],
})
export default class AppModule implements NestModule {

    constructor(private readonly telegraf: Telegraf<ContextMessageUpdate>) {
    }

    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(this.telegraf.webhookCallback(`/bot${'957352310:AAH2Dl2eV57a3c0e2KF7Jjybc9QOaCXl8dw'}`));
    }

}
