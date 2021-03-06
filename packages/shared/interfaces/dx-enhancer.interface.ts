import { EnhancerSupportInterface } from './dx-effect-support.interface';
import { DisguiserStatic } from './dx-disguiser.interface';
import { GuardInterface } from './dx-guard.interface';
import { SentinelInterface } from './dx-sentinel.interface';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ReducerEnhancer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): any;
}

export interface EnhancerFilter<T> {
  include?: string | RegExp;
  exclude?: string | RegExp;
  enhancer: T;
}

export type Enhancer<T> = EnhancerFilter<T> | T;

export interface DxEnhancer {
  reducerEnhancer?: Enhancer<ReducerEnhancer>[];
  sentinels?: Enhancer<EnhancerSupportInterface<SentinelInterface>>[];
  disguisers?: Enhancer<DisguiserStatic>[];
  guards?: Enhancer<EnhancerSupportInterface<GuardInterface>>[];
}
