import {ContextMessageUpdate, Middleware} from "telegraf";

export class TelegramBotMiddlewareConsumer {

    constructor(private readonly func: (middleware: Middleware<ContextMessageUpdate>) => void){}

    public apply<TContext extends ContextMessageUpdate>(middleware: Middleware<TContext>, ...middlewares: Array<Middleware<TContext>>): TelegramBotMiddlewareConsumer {
        [middleware, ...middlewares].forEach((middleware) => {
            this.func(middleware);
        });
        return this;
    }
}
