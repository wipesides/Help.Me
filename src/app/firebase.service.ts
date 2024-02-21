import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { Firestore, collection, getDocs, doc, setDoc, query, where, updateDoc, arrayRemove, getDoc, deleteDoc, addDoc, disablePersistentCacheIndexAutoCreation} from '@angular/fire/firestore';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Functions } from '@angular/fire/functions';
import { IUser } from './i-user';
import { v4 as uuidv4} from 'uuid';
import { Post } from './post';
import { New } from './new';
import { arrayUnion } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: Auth, private db: Firestore, private storage: Storage, private cfn: Functions) {}
  // Signing in/up/out
  async _signIn(email: string, password: string){
    const auth = getAuth()
    await signInWithEmailAndPassword(this.auth,email,password)
    .then((userCredential) => {
      console.log(userCredential);
      const user = userCredential.user;
      console.log(`${user.email} has signed in! Welcome ${user.email}`);
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
      await updateProfile(user,{ displayName: `${newUser.name} ${newUser.surname}`});
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
    if (attachments && attachments.length > 0){
      for (const attachment of attachments){
        const attachmentId = uuidv4();
        const attachmentFilePath = `${newPost.id}/${attachmentId}`
        const attachmentRef = ref(this.storage,attachmentFilePath)
        newPost.attachmentsFilePaths?.push(attachmentFilePath)
        const task = uploadBytesResumable(attachmentRef,attachment);
        await task;
        const downloadURL = await getDownloadURL(attachmentRef);
        newPost.attachmentsDownloadUrls?.push(downloadURL);
      }
    }
    console.log("Done!");
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
    if (currentPost.attachmentsFilePaths && currentPost.attachmentsFilePaths.length > 0){
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
  async _editPost(currentPost: Post){
    // Implementation later.
  }
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
  async _helpPost(post: Post){
    const postId = post.id;
    const uid = this.auth.currentUser?.uid;
    if (uid){
      const userDocRef = doc(this.db,"users",uid);
      await updateDoc(userDocRef,{
        helpedPosts: arrayUnion(postId)
      })
    }
  }
  async _seeUpdates(currentPost: Post){

    const uid = currentPost.id
    const currentPostRef = doc(this.db,"posts",uid);
    const currentPostSnap = await getDoc(currentPostRef);
    if (currentPostSnap.exists()){
      const currentPostData = currentPostSnap.data();
      const currentPostUpdates = currentPostData['updates'];
      return currentPostUpdates;
    }
  }
  async _addUpdate(currentPost: Post,update: string){
    // Implementation later.
  }
  async _askQuestion(currentPost: Post,question: string){
    if (!currentPost.questions){
      currentPost.questions = [];
    }
    currentPost.questions.push({question:question, answer:""});
    const postRef = doc(this.db,"posts",currentPost.id);
    await updateDoc(postRef,{questions: currentPost.questions})
  }
  async _answerQuestion(currentPost: Post,answer: string){

  }
  async reportPost(){
    // Implementation later.
  }
  // Profile actions
  async getUserData(){
    const uid = this.auth.currentUser?.uid;
    if (uid){
      const userDocRef = doc(this.db,"users",uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()){
        const userData = userDocSnap.data();
        return userData;
      }
    }
    return null;
  }
  async getUserPosts(userData: any){

      const createdPostsIds = userData['createdPosts'];
      if (createdPostsIds.length === 0){
        return [{postTitle: "You have not created a help"}]
      }
      const createdPosts = [];
      const postsCollection = collection(this.db,'posts');
      for (const createdPostId of createdPostsIds){
        const postDoc = doc(postsCollection,createdPostId);
        const postSnapshot = await getDoc(postDoc);
        if (postSnapshot.exists()){
          createdPosts.push(postSnapshot.data());
        }
      }
      return createdPosts;
  }
  async getUserHelps(userData: any){
    const donePostsIds = userData['helpedPosts'];
    if (donePostsIds.length === 0){
      return [{postTitle: "You have not helped anyone yet."}]
    }
    const donePosts = [];
    const postsCollection = collection(this.db,'posts');
    for (const donePostId of donePostsIds){
      const postDoc = doc(postsCollection,donePostId);
      const postSnapshot = await getDoc(postDoc);
      if (postSnapshot.exists()){
        donePosts.push(postSnapshot.data());
      }
    }
    return donePosts;
  }
  async getUserBookmarks(userData: any){
      const bookmarkedPostsIds = userData['bookmarkedPosts'];
      if (bookmarkedPostsIds.length === 0){
        return [{postTitle: "You have not bookmarked a help"}]
      }
      const bookmarkedPosts = [];
      const postsCollection = collection(this.db,'posts');
      for (const bookmarkedPostId of bookmarkedPostsIds){
        const postDoc = doc(postsCollection,bookmarkedPostId);
        const postSnapshot = await getDoc(postDoc);
        if (postSnapshot.exists()){
          bookmarkedPosts.push(postSnapshot.data());
        }
      }
      return bookmarkedPosts;
  }
}
