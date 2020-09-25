---
title: FirestoreでReference型のデータを扱う
date: 2020-09-25
tags:
  - firestore
---

Firestore には参照型が使えます。
`firebase.DocumentReference` や `firebase.CollectionReference`を入れるといい感じになります。

```
const ref = await this.$firestore
  .collection('users')
  .doc("testUser")

await this.$firestore
  .collection('notes')
  .add({
    body: "test",
    user: ref,
    updatedAt: this.$firebase.firestore.FieldValue.serverTimestamp(),
  })
```
