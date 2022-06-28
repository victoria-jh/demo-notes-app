const { StorageStack } = require('./StorageStack')
const { ApiStack } = require('./ApiStack')

export default function main(app: any) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app.stack(StorageStack).stack(ApiStack);
}