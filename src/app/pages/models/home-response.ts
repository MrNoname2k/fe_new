
export interface DataCommon {
  id?: string;
  createDate?: string;
  delFlg?: number;
  updateDate?: string;

}

export interface PageDataCommon {
  totalPage: number,
  currentPage: number,
  noRecordInPage: number,
  totalRecords: number,
}

export interface PostPage extends PageDataCommon {
  results: Post[];
}

export interface MessagePage extends PageDataCommon {
  results: Message[];
}

export interface NotificationPage extends PageDataCommon {
  results: Notification[];
}

export interface User extends DataCommon {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  birthDay: string;
  gender: string;
  lastLoginDate?: string;
  linkIg: string;
  linkFacebook: string;
  mail: string;
  online: boolean;
  passwords?: string;
  phone: string;
  status: string;
  description: string;
  posts?: Post[];
  avatars?: Post[];
  banners?: Post[];
  // authorities: Role[];
}

export interface Role extends DataCommon {
  authority: string;
}

export interface Relationship extends DataCommon {
  idUserOne: User;
  idUserTow: User;
  status: string;
  messages?: Message[];
}

export interface FileEntity extends DataCommon {
  fileName: string;
  isCurrenAvatar: number;
  isCurrenBanner: number;
}

export interface Album extends DataCommon {
  name: string;
  typeAlbum: string;
}

export interface Post extends DataCommon {
  accessModifierLevel: string;
  content: string;
  fileEntities: FileEntity[];
  idAlbum: Album;
  idUserCreate: User;
  typePost: string;
  likes: Like[];
  comments: Comment[]
}

export interface Message extends DataCommon {
  content: string
  status: string
  userFrom: User
}

export interface Comment extends DataCommon {
  content: string;
  idComment: string;
  idPost: Post;
  userEntityComment: User;
}

export interface Like extends DataCommon {
  userEntityLike: User;
}

export interface Notification extends DataCommon {
  content: string;
  postEntity: Post;
  userEntity: User;
  type: string;
  status: 'checked' | 'unchecked';
}

export interface HomePageResponse {
  userEntity?: User;
  relationshipEntities?: Relationship[];
  postEntityPage?: PostPage;
  messageEntityPage?: MessagePage;
  notificationEntityPage?: NotificationPage;
}

export interface AsideBarData {
  notifications?: Notification[];
  adv?: any;
  friendZone?: User[];
  pages?: any;
  news?: any;
}
