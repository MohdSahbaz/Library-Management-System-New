const Home = () => {
  const currentDate = new Date().toLocaleDateString(); // Format: MM/DD/YYYY

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{currentDate}</p>
    </div>
  );
};

export default Home;
