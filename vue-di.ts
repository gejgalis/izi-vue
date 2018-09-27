export function Module(options: ModuleOptions = {}) {
  return function (target: any) {
      return target
  }
}

export function OnInit() {
    return function (target: any) {
        return target
    }
}

export function OnDestroy() {
    return function (target: any) {
        return target
    }
}

export function Inject(target: object, propertyKey: string | symbol, parameterIndex: number);
export function Inject(target: object, propertyKey: string | symbol);
export function Inject(identifier: any);
export function Inject();
export function Inject(...args: any[]) {
}

export type Imports = any[];

export interface ModuleOptions {
    imports?: Imports;
    providers?: any[];
    autoBindInjectable?: boolean;
}

import {injectable} from 'inversify';

export function Injectable(target: object) {
    return injectable()(target);
}