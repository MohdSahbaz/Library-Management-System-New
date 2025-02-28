import { Divider } from "@mui/material";

const Header = ({ pageName }) => {
  const currentDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return (
    <>
      <div className="flex justify-between bg-emerald-200 md:px-10 p-2">
        <div>
          <h1 className="font-bold">{pageName}</h1>
          <p className="text-emerald-500">{currentDate}</p>
        </div>
        <div>
          <h1 className="bg-emerald-900 text-emerald-50 px-5 py-2">LMS</h1>
        </div>
      </div>
      <Divider className="bg-emerald-900" />
    </>
  );
};

export default Header;
