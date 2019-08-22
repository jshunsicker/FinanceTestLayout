import React, { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState({
    first: "",
    last: "",
    cell: "",
    email: "",
    thumbnail: ""
  });
  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response);
        }
      })
      .then(data => {
        console.log("data:", data);
        const {
          name: { first, last },
          email,
          picture: { thumbnail }
        } = data.results[0];
        setUser({
          first,
          last,
          email,
          thumbnail
        });
      });
  }, []);

  const { first, last, email, thumbnail } = user;
  return (
    <div>
      <div className="user">
        <img src={thumbnail} className="user__img" />
        <div className={`user__info`}>
          <div className="user__name">
            {first} {last}
          </div>
          <div className="user__email">{email}</div>
        </div>
      </div>
    </div>
  );
}
