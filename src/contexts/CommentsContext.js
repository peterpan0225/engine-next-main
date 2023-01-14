import { createContext, useEffect, useState, useContext } from "react";
import { getStoryComments } from "../utils/commentsActions";

export const CommentsContext = createContext();

export function CommentsProvider({ postId, children }) {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(async () => {
    setLoadingComments(true);
    try {
      const postComments = await getStoryComments(postId);
      if (!postComments) {
        console.log(error);
        setComments([]);
      } else {
        setComments(postComments);
      }
    } catch (err) {
      console.log(err);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  }, []);
  return (
    <CommentsContext.Provider
      value={{
        comments,
        setComments,
        loadingComments,
        setLoadingComments,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export default function useComments() {
  return useContext(CommentsContext);
}
