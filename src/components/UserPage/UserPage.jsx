import React from "react";
import { useSelector } from "react-redux";

function UserPage() {
  const user = useSelector((store) => store.user);
  const items = useSelector((store) => store.items);

  return (
    <div className="dashBoardContainer">
      <div>
        <h2>Welcome, {user.username}!</h2>
        <h2>Location</h2>
        <button className="button-54">View Items</button>
        <button className="button-54">Add New Item</button>
        <button className="button-54">Add New Container</button>
        <h3>Recent Items:</h3>
        <h1>
          {items &&
            items.map((item) => {
              return (
                <div key={item.item_id}>
                  <h5>
                    {item.item_name} @ {item.container_name}
                  </h5>
                </div>
              );
            })}
        </h1>
      </div>
    </div>
  );
}

export default UserPage;
