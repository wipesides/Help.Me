import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { Functions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: Auth, private db: Firestore, private storage: Storage, private cfn: Functions) {}
  // Signing in/up/out
  async signIn(){}
  async signUp(){}
  async signOut(){}
  // Getting the posts and the news
  async getPosts(){}
  async getNews(){}
  // Create a post and a new
  async createPost(){}
  async createNew(){}
  // Remove a post and a new
  async removePost(){}
  async removeNew(){}
  // Post actions
  async savePost(){}
  async seeDetails(){}
  async reportPost(){}
  // Profile actions
  async getUserPosts(){}
  async getUserHelps(){}
  async getUserBookmarks(){}
}
