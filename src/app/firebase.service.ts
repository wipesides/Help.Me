import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, collection, getDocs, doc, setDoc, query, where, updateDoc, arrayRemove, getDoc, deleteDoc, addDoc, disablePersistentCacheIndexAutoCreation} from '@angular/fire/firestore';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Functions } from '@angular/fire/functions';
import { IUser } from './i-user';
import { v4 as uuidv4} from 'uuid';
import { Post } from './post';
import { New } from './new';
import { arrayUnion } from 'firebase/firestore';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: Auth, private db: Firestore, private storage: Storage, private cfn: Functions) {}
  // Signing in/up/out
  async _signIn(user: IUser){
    const auth = getAuth();
    await signInWithEmailAndPassword(this.auth,user.email,user.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`${user.displayName} has signed in! Welcome ${user.displayName}`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`❗️ ErrorCode: ${errorCode} \n ErrorMessage: ${errorMessage}`);
    })
  }
  async _signUp(newUser: IUser){
    const auth = getAuth();
    await createUserWithEmailAndPassword(this.auth,newUser.email,newUser.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
      const userDoc = doc(this.db,"users",uid)
      await setDoc(userDoc, {
        id: uid,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        bookmarkedPosts: [],
        createdPosts: [],
        helpedPosts: []
      })
      console.log(`${user.displayName} has signed up! Welcome ${user.displayName}`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`❗️ ErrorCode: ${errorCode} \n ErrorMessage: ${errorMessage}`);
    })
  }
  async signOut(){
    const auth = getAuth();
    await signOut(this.auth)
    .then(() => {
      console.log(`User has successfully signed out!`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`❗️ ErrorCode: ${errorCode} \n ErrorMessage: ${errorMessage}`);
    })
  }
  // Getting the posts and the news
  async getPosts(){
    const postsCollection = collection(this.db,'posts');
    const postSnapshot = await getDocs(postsCollection);
    const postList = postSnapshot.docs.map(doc => doc.data());
    return postList;
  }
  async getNews(){
    const newsCollection = collection(this.db,'news');
    const newsSnapshot = await getDocs(newsCollection);
    const newsList = newsSnapshot.docs.map(doc => doc.data());
    return newsList;
  }
  // Create a post and a new
  async _createPost(newPost: Post,attachments: any[] = []){
    // Create empty post and it's reference.
    const postsCollectionRef = collection(this.db,"posts");
    const newPostRef = doc(postsCollectionRef)
    newPost.id = newPostRef.id;
    // Create attachments and store them if they exist.
    if (attachments.length > 0){
      attachments?.forEach(async (attachment) => {
        const attachmentId = uuidv4();
        const attachmentFilePath = `${newPost.id}/${attachmentId}`
        const attachmentRef = ref(this.storage,attachmentFilePath)
        newPost.attachmentsFilePaths.push(attachmentFilePath)
        const task = uploadBytesResumable(attachmentRef,attachment);
        await task;
        const downloadURL = await getDownloadURL(attachmentRef);
        newPost.attachmentsDownloadUrls.push(downloadURL);
      })
    }
    // İnitialize the post and store it.
    await setDoc(newPostRef,newPost);
  }
  async _createNew(newNew: New){
    const newsCollectionRef = collection(this.db,"news");
    const newDocRef = doc(newsCollectionRef);
    newNew.newId = newDocRef.id;
    await setDoc(newDocRef,newNew);
  }
  // Remove a post and a new
  async _removePost(currentPost: Post){
    // Remove attachments if it exists
    if (currentPost.attachmentsFilePaths.length > 0){
      for (const attachmentFilePath of currentPost.attachmentsFilePaths){
        const removeFilePath = ref(this.storage,attachmentFilePath);
        await deleteObject(removeFilePath).then(() => {
          console.log("File deleted successfully");
        }).catch((error) => {
          console.error(`❗️ Error: ${error.message}`)
        })
      }
    }
    // Remove post
    const currentPostId = currentPost.id;
    const currentPostRef = doc(this.db,"posts",currentPostId);
    await deleteDoc(currentPostRef);
  }
  async _removeNew(currentNew: New){
    const newId = currentNew.newId;
    const newRef = doc(this.db,"news",newId);
    await deleteDoc(newRef);
  }
  // Post actions
  async _bookmarkPost(post: Post){
    const postId = post.id;
    const uid = this.auth.currentUser?.uid;
    if (uid){
      const userDocRef = doc(this.db,"users",uid);
      await updateDoc(userDocRef,{
        bookmarkedPosts: arrayUnion(postId)
      });
    }
  }
  async _unbookmarkPost(post: Post){
    const postId = post.id;
    const uid = this.auth.currentUser?.uid;
    if (uid){
      const userDocRef = doc(this.db,"users",uid);
      await updateDoc(userDocRef,{
        bookmarkedPosts: arrayRemove(postId)
      });
    }
  }
  async seeDetails(){}
  async reportPost(){}
  async askQuestion(){}
  // Profile actions
  async getUserPosts(){
    const uid = this.auth.currentUser?.uid;
    if (uid){
      const userDocRef = doc(this.db,"users",uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()){
        const userData = userDocSnap.data();
        const createdPostsIds = userData['createdPosts'];
        return createdPostsIds;
      }
    }
  }
  async getUserHelps(){
    const uid = this.auth.currentUser?.uid;
    if (uid){
      const userDocRef = doc(this.db,"users",uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()){
        const userData = userDocSnap.data();
        const helpedPostsIds = userData['helpedPosts'];
        return helpedPostsIds;
      }
    }
  }
  async getUserBookmarks(){
    const uid = this.auth.currentUser?.uid;
    if (uid){
      const userDocRef = doc(this.db,"users",uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()){
        const userData = userDocSnap.data();
        const bookmarkedPostsIds = userData['bookmarkedPosts'];
        return bookmarkedPostsIds;
      }
    }
  }
}
