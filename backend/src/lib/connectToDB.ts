import * as mongoose from 'mongoose';

const db_url = process.env.MONGODB_URL;

const connectToDB = mongoose.connect(db_url);

export default connectToDB;
