import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = ()=>  useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Liked data
  const [bookmarks, setBookmarks] = useState([])
 
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


   const addBookmarks = (videoId) =>{
    setBookmarks([...bookmarks, videoId])
   }

   const removeBookmark = (videoId) =>{
    setBookmarks(bookmarks.filter(id => id !== videoId))
   }


  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading, bookmarks, addBookmarks, removeBookmark }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;