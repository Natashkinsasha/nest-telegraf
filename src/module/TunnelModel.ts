import {DynamicModule, Module, Type} from "@nestjs/common";
import * as localtunnel from 'localtunnel';
import {Tunnel} from "localtunnel";
import {ModuleRef} from "@nestjs/core";


@Module({})
export default class TunnelModel {

    public static forRoot(port: number, opt?: localtunnel.TunnelConfig): DynamicModule {
        const providers = [
            {
                provide: 'Tunnel',
                useFactory: async () => {
                    return this.init(port, opt);
                },
            }
        ];
        return {
            module: TunnelModel,
            providers: providers,
            exports: providers,
        }
    }

    public static forRootAsync({useFactory, inject}: { useFactory: (...args: any[]) => Promise<{ port: number, opt?: localtunnel.TunnelConfig }> | { port: number, opt?: localtunnel.TunnelConfig }, inject?: Array<Type<any> | string | symbol> }): DynamicModule {
        const providers = [
            {
                provide: 'Tunnel',
                useFactory: async (ref: ModuleRef) => {
                    const objects = (inject || []).map((item) => {
                        return ref.get(item, {strict: false})
                    });
                    return Promise
                        .resolve()
                        .then(() => useFactory(...objects))
                        .then(({port, opt}) => {
                            return this.init(port, opt);
                        })
                },
                inject: [ModuleRef]
            }
        ];
        return {
            module: TunnelModel,
            providers: providers,
            exports: providers,
        }
    }

    private static init(port: number, opt?: localtunnel.TunnelConfig): Promise<Tunnel> {
        return new Promise((resolve, reject) => {
            if (!opt) {
                return localtunnel(port, async (err, tunnel) => {
                    if (err) {
                        return reject(err);
                    }
                    if (tunnel) {
                        return resolve(tunnel);
                    }
                });
            }
            return localtunnel(port, opt, async (err, tunnel) => {
                if (err) {
                    return reject(err);
                }
                if (tunnel) {
                    return resolve(tunnel);
                }
            });
        });
    }
}