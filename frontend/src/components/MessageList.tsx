import useSWRInfinite from "swr/infinite";
import { fetcher } from "../lib/request";
import { FieldMessage } from "../types/message";
import ImageList from "./ImageList";
import qs from "qs";
import dayjs from "dayjs";

const PAGE_SIZE = 20;

interface MessageListProps {
  topicId: number;
}

const MessageList = ({ topicId }: MessageListProps) => {
  const { data, size, setSize, isValidating, mutate } = useSWRInfinite<
    FieldMessage[]
  >((pageIndex: number, previousPageData: []) => {
    // 一个函数，拿到每个页面的 key，
    // `fetcher` 接受它的返回值。
    // 如果返回是 `null`，该页面不会开始请求。
    if (previousPageData && !previousPageData.length) return null; // reached the end

    let filters: any = undefined;
    if (topicId) {
      filters = {
        topic: {
          id: {
            $eq: topicId,
          },
        },
      };
    }
    const query = qs.stringify(
      {
        populate: "*",
        sort: "createdAt:DESC",
        filters,
        pagination: {
          page: pageIndex + 1,
          pageSize: PAGE_SIZE,
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    return [`/api/messages?${query}`]; // SWR key
  }, fetcher);

  const messages = data ? ([] as FieldMessage[]).concat(...data) : [];
  const isEmpty = !isValidating && messages.length === 0;
  const isReachingEnd = isEmpty || (data && messages.length < PAGE_SIZE);

  return (
    <>
      {messages.map((message) => {
        return (
          <div key={message.id} className="bg-white rounded-sm shadow-sm p-3">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">
                {message.attributes.user?.data?.attributes.username || "匿名"}
              </span>

              <span>{dayjs().to(dayjs(message.attributes.createdAt))}</span>
            </div>
            <p> {message.attributes.content}</p>
            <ImageList value={message.attributes.images.data} />
          </div>
        );
      })}
      {isEmpty && <div className="text-center text-gray-500">暂无数据</div>}
      {isValidating && (
        <div className="text-center text-gray-500">加载中...</div>
      )}
      {isReachingEnd && (
        <div className="text-center text-gray-500">没有更多数据</div>
      )}
    </>
  );
};

export default MessageList;
