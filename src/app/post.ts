export interface Post {
    id: string;
    date: string;
    user: string;
    postTitle: string;
    postBody: string;
    attachmentsDownloadUrls?: string[];
    attachmentsFilePaths?: string[]; // Firebase Storage Image Url
    reports?: [];
    questions?: Object[];
    updates?: string[];
}
