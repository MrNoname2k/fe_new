import { Post } from "src/app/pages/models/home-response";

  export interface Message {
    toUserId?:string;
    fromUserId?:string;
    content?:string;
  }

  export interface MessageResponse {
    content: string,
    createDate: string;
    delFlg: number,
    id: string,
    status: string,
    updateDate: string,
    fromUserId: string
  }

  export interface MessageAllView {
    login: boolean,
    messages: MessageResponse[],
    toUserLastName: string,
    toUserFirstName: string,
    toUserId: string
    avatar: Post[]
  }


