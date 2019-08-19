import {Injectable, InjectableOptions, Type} from "@nestjs/common";

type HandlerType = 'hears' | 'start' | 'on' | 'help';

type PropertyType = 'context' | 'next'

const handlers: Array<{class: Type<any>, method: string, type: HandlerType, property: any[]}> = [];

const properties: Array<{target: Object, propertyKey: string | symbol, parameterIndex: number, type: PropertyType}> = [];

export {handlers, properties} ;

export default (options?: InjectableOptions) => {
    return (constructor: Function) => {
    }
}