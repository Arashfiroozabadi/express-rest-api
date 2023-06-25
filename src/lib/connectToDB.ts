import * as mongoose from 'mongoose';

const db_url= process.env.MONGODB_URL as string;

const connectToDB = mongoose.connect(db_url);

export default connectToDB;
