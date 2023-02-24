import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import adminService from "../../../Services/AdminService";
import authService from "../../../Services/AuthService";
import userService from "../../../Services/UserService";
import notify from "../../../Utils/Notify";
import AuthVerify from "../../AuthArea/AuthVerify/AuthVerify";
import "./DataList.css";
import UserDataCard from "../VacationCards/UserDataCard/UserDataCard";
import AdminDataCard from "../VacationCards/AdminDataCard/AdminDataCard";
import Spinner from "../../SharedArea/Spinner/Spinner";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import LabeledSwitch from "../../LabeledSwitch/LabeledSwitch";
import AdminVerify from "../../AuthArea/AdminVerify/AdminVerify";

function DataList(): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  const [vacationsThatHaveNotStarted, setVacationsThatHaveNotStarted] =
    useState<boolean>(false);
  const [activeVacations, setActiveVacations] = useState<boolean>(false);
  const [favoriteVacations, setFavoriteVacations] = useState<boolean>(false);
  const [UnfilteredVacations, setUnFilteredVacations] = useState<
    VacationModel[]
  >([]);
  const [vacations, setVacations] = useState<VacationModel[]>([]); // Storing the Vacations
  const navigate = useNavigate();

  // If user is not logged in and still tries to enter throw them back to homepage:

  useEffect(() => {
    // Checking if user is logged in
    isUserLoggedIn();
    // Checking if user's token is valid (not expired date wise for example)
    AuthVerify();
  }, []);

  function isUserLoggedIn() {
    if (!authService.isLoggedIn()) {
      navigate("/login");
      notify.error("please log in first");
    }
  }

  // Updating in real time if user has logged in or logged out:
  useEffect(() => {
    setUser(authStore.getState().user);

    authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
  }, []);

  //get all vacations:
  useEffect(() => {
    try {
      userService
      .userVacations()
      .then((e) => {
        setVacations(e);
        setUnFilteredVacations(e);
      })
      .catch((e) => console.log(e.message));
    } catch (error:any) {
      console.log(error.message);
    }
  }, []);

  // Delete Vacation and update on the user screen:
  async function deleteSelectedVacation(vacationId: number) {
    try {
      await adminService.deleteVacation(vacationId);

      // Refreshing the list:
      const duplicatedVacations = [...vacations];
      const index = duplicatedVacations.findIndex(
        (v) => v.vacationId === vacationId
      );
      duplicatedVacations.splice(index, 0);
      setVacations(duplicatedVacations);
      setUnFilteredVacations(duplicatedVacations);
    } catch (error: any) {
      notify.error(error.message);
    }
  }

  // Filter vacations that are favorite
  function showFavorite() {
    setVacations(UnfilteredVacations);

    // Filtering only vacations that the user has liked
    const filteredVacations = vacations.filter((e) => e.isFollowing);

    if (favoriteVacations === false) {
      setVacations(filteredVacations);
      setFavoriteVacations(true);

      // Setting the rest of the buttons false
      setVacationsThatHaveNotStarted(false);
      setActiveVacations(false);
    } else {
      setVacations(UnfilteredVacations);
      setFavoriteVacations(false);
    }
  }

  // Filter vacations that are active and have started yet not ended:
  function VacationsThatHaveStarted(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = e.target;

    setVacations(UnfilteredVacations);

    // Filtering only vacations that have not ended but started
    const currentDate = new Date().toISOString();
    const filteredVacations = vacations.filter(
      (vacation) =>
        vacation.startDate < currentDate && vacation.endDate > currentDate
    );

    if (activeVacations === false) {
      setVacations(filteredVacations);
      setActiveVacations(true);

      // Setting the rest of the buttons false
      setFavoriteVacations(false);
      setVacationsThatHaveNotStarted(false);
    } else {
      setVacations(UnfilteredVacations);
      setActiveVacations(false);
    }
  }

  // Filter vacations that have not started yet
  function VacationsThatHaveNotStarted() {
    setVacations(UnfilteredVacations);

    // Filtering vacations that have not started yet:
    const currentDate = new Date().toISOString();
    const filteredVacations = vacations.filter(
      (e) => e.startDate > currentDate
    );

    if (vacationsThatHaveNotStarted === false) {
      setVacations(filteredVacations);
      setVacationsThatHaveNotStarted(true);

      // Setting the rest of the buttons false
      setFavoriteVacations(false);
      setActiveVacations(false);
    } else {
      setVacations(UnfilteredVacations);
      setVacationsThatHaveNotStarted(false);
    }
  }

  {/* Pagination */}
  const [currentPage, setCurrentPage] = useState(1);
  const vacationsPerPage: number = 6;
  const numberOfPages: number =
  Math.ceil(vacations.length / vacationsPerPage);
  const lastPageIndex = currentPage * vacationsPerPage;
  const firstPageIndex = lastPageIndex - vacationsPerPage;
  const currentVacations = vacations.slice(firstPageIndex, lastPageIndex);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="DataList">
      {/* Side Menu */}
      <div className="SideMenu">
        {/* Switches */}
        <div className="switches">
          {/* filter only Favorite vacations */}
          <LabeledSwitch label="Show Favorite" onChange={showFavorite} />

          {/* Only show Vacations that have started yet not ended */}
          <LabeledSwitch
            label="Vacations that are active"
            onChange={VacationsThatHaveStarted}
          />

          {/* Only show Vacations that are active*/}
          <LabeledSwitch
            label="Vacations that have not started"
            onChange={VacationsThatHaveNotStarted}
          />
        </div>
      </div>

      {/* Spinner */}
      {vacations.length === 0 && <Spinner />}

      {/* if the user is an admin then show admin cards else it will show user */}
      {AdminVerify()
        ? currentVacations.map((v) => (
            <AdminDataCard
              key={v.vacationId}
              vacation={v}
              deleteVacation={deleteSelectedVacation}
            />
          ))
        : currentVacations.map((v) => (
            <UserDataCard key={v.vacationId} vacation={v} />
          ))}

      {/* Pagination area */}
      <Stack className="PaginationStyling">
        <Pagination
          count={numberOfPages}
          onChange={handleChange}
          shape="rounded"
          color="primary"
          size="large"
        />
      </Stack>
    </div>
  );
}

export default DataList;
