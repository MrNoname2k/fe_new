export class About {
}

export interface Album extends Common{
  name:string;
  typeAlbum:string;
}

export interface Post extends Common{
  content:string;
  accessModifierLevel:string;
  typePost:string;
  idAlbum:Album;
  fileEntities:FileEntity[];
}

export interface FileEntity extends Common{
  fileName:string;
  isCurrenAvatar:number;
  isCurrenBanner:number;
}

export interface Common{
  id:string;
  createDate:string;
  updateDate:string;
  delFlag:number;
}

export interface AlbumResponse{
  album:Album;
  posts:Post[];
}

export interface Friend extends Common{
  firstName:string;
  lastName:string;
  avatars: Post[];
}
