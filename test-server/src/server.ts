import 'module-alias/register';

// Own
// Config
import app from './app';
// Constants
import { getCurrentEnvironment } from '@app/common/constants/environments';
import { SERVER } from '@app/common/constants/general';
// Utils
import getLogger from '@app/common/util/logger';

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  getLogger().info(
    `Server App is running at http://localhost:${
      SERVER.port
    } in ${getCurrentEnvironment()} mode`
  );
  getLogger().info('  Press CTRL-C to stop\n');
});
