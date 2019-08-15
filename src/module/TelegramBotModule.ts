import Telegraf, {ContextMessageUpdate, Middleware, TelegrafOptions} from 'telegraf';
import {TelegramBotMiddlewareConsumer} from "../interfaces/TelegramBotMiddlewareConsumer";
import {Module} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";
import TestController from "../controller/TestController";

@Module({})
export default abstract class TelegramBotModule {

    private telegraf: Telegraf<ContextMessageUpdate>;

    constructor(private readonly moduleRef: ModuleRef){

    }

    public init(token: string, options?: TelegrafOptions){
        this.telegraf = new Telegraf(token, options);
        this.configure(new TelegramBotMiddlewareConsumer((middleware: Middleware<ContextMessageUpdate>) => {
            this.telegraf.use(middleware)
        }));
    }

    public configure(consumer: TelegramBotMiddlewareConsumer): any {}

}