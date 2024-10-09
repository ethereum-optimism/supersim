import { Config } from '@react-native-community/cli-types';
import { BuilderCommand } from '../../types';
/**
 * Starts Apple device syslog tail
 */
type Args = {
    interactive: boolean;
};
declare const createLog: ({ platformName }: BuilderCommand) => (_: Array<string>, ctx: Config, args: Args) => Promise<void>;
export default createLog;
//# sourceMappingURL=createLog.d.ts.map