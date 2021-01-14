import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export class EntryUser {
  constructor(readonly fbLoginUid: string, readonly nickname: string) {}
}
export const EntryUserConverter = {
  toFirestore({
    fbLoginUid,
    nickname,
  }: EntryUser): firebase.default.firestore.DocumentData {
    return { fbLoginUid, nickname }
  },
  fromFirestore(
    snapshot: firebase.default.firestore.QueryDocumentSnapshot,
    options: firebase.default.firestore.SnapshotOptions
  ): EntryUser {
    const { fbLoginUid, nickname } = snapshot.data(options)!
    return new EntryUser(fbLoginUid, nickname)
  },
}
