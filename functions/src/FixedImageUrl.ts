import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
//FirebseStorageに保存した画像のダウンロードトークンを固定化
//今回は、{userID}で保存した画像のダウンロードトークンを{userID}に固定
//画像の保存場所は,users/{userID}
export const FixedImageUrl = functions.storage.object().onFinalize(async (object) => {
    const filePath = object.name || "";
    // filePath = image/123
    const userId = filePath.split("/")[1]
    // uid = 123
    admin.storage().bucket().file(`users/${userId}`).setMetadata({
        metadata: {
            firebaseStorageDownloadTokens: userId
        }
    })
    //この処理によってダウンロードトークンが{userId}に書き換えられる
})

