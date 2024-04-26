/* eslint-disable @next/next/no-img-element */
import useSWRInfinite from "swr/infinite";
import { useState, useEffect } from "react";
import ImageList from "../components/ImageList";
import { FieldMessage } from "../types/message";
import { User } from "../types/user";
import SendMessage from "../components/SendMessage";
import qs from "qs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
require("dayjs/locale/zh-cn");
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

import TopicList from "../components/TopicList";
import NavBar from "../components/NavBar";
import MessageList from "../components/MessageList";
import Footer from "../components/Footer";


export default function Home() {
  const [topicId, setTopicId] = useState<number>(0);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    setUser(JSON.parse(window.sessionStorage.getItem("user") || "null"));
  }, []);


  return (
    <>
      <NavBar/>
      <main className="min-h-screen max-w-5xl mx-auto flex gap-5 mt-5">
        <div className="sticky top-14 bg-white w-52 flex-none rounded-sm shadow-sm">
          <TopicList value={topicId} onChange={setTopicId} />
        </div>
        <div className="flex-auto space-y-3">
          {user && !!topicId && (
            <SendMessage user={user} topicId={topicId} />
          )}
          <MessageList topicId={topicId}/>
        </div>
      </main>
      <Footer/>
    </>
  );
}
