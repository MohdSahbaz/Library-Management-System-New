import { useParams } from "react-router-dom";

const SearchBook = () => {
  const { searchKey } = useParams();
  return (
    <div className="bg-emerald-50">
      <h1>Searching {searchKey} Book</h1>
    </div>
  );
};

export default SearchBook;
