import Telegraf, {ContextMessageUpdate, TelegrafOptions} from 'telegraf';
import {Abstract, DynamicModule, ForwardReference, Module, Type} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";
import {handlers, properties} from "../decorator/BotController";
import * as tt from "telegraf/typings/telegram-types";
import {TlsOptions} from "tls";


export type BotOptions = {
    polling?: { timeout?: number, limit?: number, allowedUpdates?: tt.UpdateType[] },
    webhook?: { webhookPath: string, tlsOptions: TlsOptions | null, port: number, host?: string }
} & TelegrafOptions;

@Module({})
export default class BotModule {

    public static forRootAsync({useFactory, inject, imports}: { useFactory: (...args: any[]) => Promise<{ token: string, options?: BotOptions, }> | { token: string, options?: BotOptions, }, inject?: Array<Type<any> | string | symbol>, imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>; }): DynamicModule {
        const providers = [
            {
                provide: Telegraf,
                useFactory: async (ref: ModuleRef, ...inject: Array<Type<any> | string | symbol>) => {
                    return Promise
                        .resolve()
                        .then(() => useFactory(...inject))
                        .then(({token, options}) => {
                            return this.init(ref, token, options);
                        })
                },
                inject: [ModuleRef, ...(inject || [])]
            }
        ];
        return {
            imports,
            module: BotModule,
            providers: providers,
            exports: providers,
        }
    }


    public static forRoot(token: string, options?: BotOptions): DynamicModule {
        const providers = [
            {
                provide: Telegraf,
                useFactory: async (ref: ModuleRef) => {
                    return this.init(ref, token, options);
                },
                inject: [ModuleRef]
            }
        ];
        return {
            module: BotModule,
            providers: providers,
            exports: providers,
        }
    }

    private static async init(ref: ModuleRef, token: string, options?: BotOptions) {
        const telegraf = new Telegraf(token, options);
        handlers.forEach((handler) => {
            const object: Object | undefined = ref.get(handler.class, {strict: false});
            if (!object) {
                return;
            }
            const func = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(object), handler.method);
            if (!func) {
                return;
            }
            if (handler.type === 'hears') {
                const triggers = handler.property[0];
                return telegraf.hears(triggers, (ctx: ContextMessageUpdate, next?: () => any) => {
                    const ctxProperty = properties.find((property) => {
                        return property.target === Object.getPrototypeOf(object) && property.propertyKey === func.value.name && property.type === 'context';
                    });
                    const nextProperty = properties.find((property) => {
                        return property.target === Object.getPrototypeOf(object) && property.propertyKey === func.value.name && property.type === 'next';
                    });
                    const args: any[] = [];
                    if (ctxProperty) {
                        args[ctxProperty.parameterIndex] = ctx;
                    }
                    if (nextProperty) {
                        args[nextProperty.parameterIndex] = next;
                    }
                    return func.value.apply(object, args)
                });
            }
            return;
        });

        await telegraf.launch(options);
        return telegraf;
    }


}