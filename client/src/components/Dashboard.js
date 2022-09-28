import React from "react";

const Dashboard = () => {
  /*
  const items = [
    { title: "item 1", description: "this is the first item" },
    { title: "item 2", description: "this is the second item" },
    { title: "item 3", description: "this is the third item" },
    { title: "item 4", description: "this is the fourth item" },
  ];

  const renderExampleItems = () => {
    return items.map((item) => {
      return (
        <>
          <h1 className="text-xl">{item.title}</h1>
          <div className="text-cyan-900">{item.description}</div>
        </>
      );
    });
  };

  */

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* renderExampleItems() */}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
