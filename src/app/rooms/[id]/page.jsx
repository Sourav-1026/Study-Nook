const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;
  console.log(id, "id");

  const res = await fetch(`http://localhost:5000/rooms/${id}`);
  const room = await res.json();

  console.log(room);

  return (
    <div>
      <h1>This is room detail page</h1>
    </div>
  );
};

export default RoomDetailsPage;
