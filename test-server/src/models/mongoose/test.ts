import { Document, Schema, model } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

// Own
// Constants
import { HASH_SECRET_KEY } from '@app/common/constants/general';
// Services
import { getMongooseUtils } from 'mdk-services-interface';

const testSchema = new Schema(
  {
    testname: { type: String, required: true, unique: true },
    tenantId: { type: String },
    updateBy: { type: String },
    hash: { type: String }
  },
  {
    // The createAt and updatedAt fields
    timestamps: true
  }
);

// Optionally add the functional objectives field to this schema
getMongooseUtils().addFunctionalObjectivesField(testSchema);
// To add a functional objective use:
// - getMongooseUtils().addFunctionalObjective(...)
// - getMongooseUtils().addFunctionalObjectiveAndSave(...) to save at same time
// To get a functional objective use:
// - getMongooseUtils().hasFunctionalObjective(...)
// To remove a functional objective use:
// - getMongooseUtils().removeFunctionalObjective(...)
// - getMongooseUtils().removeFunctionalObjectiveAndSave(...) to save at same time

testSchema.methods.addHash = function() {
  // Call this function everytime the document is saved to update the hash
  const hash = getMongooseUtils().createDocumentHash(this, HASH_SECRET_KEY);
  (this as Test).hash = hash;
};

testSchema.plugin(mongoosePaginate.default);

export interface Test extends Document {
  testname: string;
  tenantId: string;
  updateBy: string;
  createdAt: Date;
  updatedAt: Date;
  hash: string;
  addHash: () => void;
}

export default model<Test>('Tests', testSchema);
