import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";
//環境変数は、Firebase CLIの機能を使って保存する。
//環境変数の保存・初期化方法、アクセスの仕方等は以下を参照すると分かり易い。
//https://firebase.google.com/docs/functions/config-env?hl=ja

const cert = {
    projectId: functions.config().main.project_id,
    clientEmail: functions.config().main.client_email,
    privateKey: functions.config().main.private_key.replace(/\\n/g, "\n"),
};
//private_keyは,-----BEGIN RSA PRIVATE KEY-----\nABCDEFG==\\n-----END PRIVATE KEY-----\\n
//のように\nが含まれているので、.replace(/\\n/g, "\n")で直す必要がある
const MainAdmin = admin.initializeApp(
    {
        credential: admin.credential.cert(cert),
        storageBucket:functions.config().main.storagebucket
        //StorageやRealtimeDBにアクセスしたい場合は、このように設定が必要
    },
    'Main'
    //複数のAdminを使用する場合、上記のように個々に名前を付ける
);

export default MainAdmin