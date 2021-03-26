import * as functions from "firebase-functions";
import {FixedImageUrl} from "./FixedImageUrl";

//関数の複数ファイルへ分割
//このように書くことでファイルの分割が行える。
//CloudFunctionsではindexで全ての関数を読み込ませるようにしなければならない。
module.exports = {
    FixedImageUrl
}