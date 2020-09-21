const { assertSnapshotIntegrity } = require("./assertions");

describe('Metadata snapshot validation', function () {
  it('Should match the local snapshot', function () {
    assertSnapshotIntegrity();
  });
})