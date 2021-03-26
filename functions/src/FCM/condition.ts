import { messaging } from "firebase-admin";
import * as functions from "firebase-functions";
import MainAdmin from '../Admin/MainAdmin'

//状況
//UGCアプリであるユーザーの新規投稿ブロックしている他のユーザーには配信しない。
export const SendFCMToCondition = functions.firestore.document('post/{postID}')
    .onCreate(async (snapshot, context) => {
        const uid = snapshot.data().by //投稿者のユーザーID
        const userName = snapshot.data().userName //投稿者の名前
        const title = snapshot.data().title //投稿のタイトル
        //通知の内容
        const message:messaging.MessagingPayload = {
            notification:{
                title: `${title}`,
                body: `${userName} さんが新しく投稿しました。`
            }
        }
        const block = `block_${uid}` //このようなトピックをユーザーがブロックしたときに予め登録しておく
        const condition: string = `!('${block}' in topics )` // => blockに登録されていない他の全てのtokenが対象
        //公式ドキュメントには使える条件式が &&, || のみであったが上記の通り! も使える。
        //conditionの一般形は　" 'TopicA' in topics "

        //sendToConditionで送る
        MainAdmin.messaging().sendToCondition(condition, message)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.error(err)
            })
    })