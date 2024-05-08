import React from 'react';
import HeroCover from '../heroCover/HeroCover';

const getData = async (page, cat) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const Featured = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 1;

  return (
    <div className='w-full inline-block'>
      {posts?.map((item) => (
        <HeroCover item={item} key={item._id} />
      ))}
    </div>
  );
};

export default Featured;