import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumListItem from "./AlbumListItem";
function AlbumsList({ user }) {
  //fetch query
  const { data, error, isFetching } = useFetchAlbumsQuery(user);

  // add album mutation
  const [addAlbum, results] = useAddAlbumMutation();
  // console.log(results);
  const handleAddAlbum = () => {
    addAlbum(user);
  };
  let content;
  if (isFetching) {
    content = <Skeleton times={3} className="h-6 w-full" />;
  } else if (error) {
    content = <div>Error Loading Albums...😥</div>;
  } else {
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button onClick={handleAddAlbum} loading={results.isLoading}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
