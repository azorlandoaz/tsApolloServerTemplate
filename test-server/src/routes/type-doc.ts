import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import getLogger from '@app/common/util/logger';

const router = express.Router();

const options = {
  dotfiles: 'ignore',
  etag: true,
  redirect: true
};

const typeDocsDistFolder = 'docs';

router.use(express.static(path.resolve(typeDocsDistFolder), options));
router.get('*', (_: Request, res: Response, __: NextFunction) => {
  res.sendFile(path.resolve(`${typeDocsDistFolder}index.html`), err => {
    if (err) {
      getLogger().error(`There was an error serving typedoc. Details: ${err}`);
      res.sendStatus(404);
    }
  });
});

export default router;
