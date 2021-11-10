import React from 'react';
import { useEffect, useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';

const AddToBookmarks: React.FC = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const id = user._id;
  console.log(id, '<<<<<IN ADD TO BOOKMARKS');

  // useEffect(() => {
  //   setLoading(true);
  //   setError(false);
  //   addBookmark(id)
  //     .then((res) => {
  //       user.saved = [...user.saved, res];
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       setError(true);
  //     });
  // }, [id]);
  return <button>Bookmark</button>;
};

export default AddToBookmarks;
