import { Config } from '@react-native-community/cli-types';
import { BuildFlags } from './buildOptions';
import { BuilderCommand } from '../../types';
declare const createBuild: ({ platformName }: BuilderCommand) => (_: Array<string>, ctx: Config, args: BuildFlags) => Promise<string>;
export default createBuild;
//# sourceMappingURL=createBuild.d.ts.map