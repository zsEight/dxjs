/* eslint-disable @typescript-eslint/no-explicit-any */
import { DxModelContstructor } from '@dxjs/shared/interfaces/dx-model.interface';
import { MODEL_NAME } from '@dxjs/shared/symbol';
import { store } from '../../helper/store';
import { DxModel } from '../../dx-model/model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-var-requires
const invariant = require('invariant');

export function collectFactory(inst: symbol) {
  return (name?: string) => {
    return function Decorate<T extends DxModelContstructor>(ModelTarget: T): T {
      if (__DEV__) {
        invariant(
          ModelTarget.prototype instanceof DxModel,
          'collect model 必须继承自 DxModel, 当前 model 类型为 %s',
          typeof ModelTarget.prototype,
        );

        invariant(!store.reduxStore.get(inst), 'store 已经存在, 不能再 store 创建之后增加 model');
      }

      const models = store.getModels(inst);
      const _name = name || ModelTarget.name;
      Reflect.defineMetadata(MODEL_NAME, _name, ModelTarget);
      models.map[_name] = ModelTarget;
      models.set.add(ModelTarget);
      return ModelTarget;
    };
  };
}
