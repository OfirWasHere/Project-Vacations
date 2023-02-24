import {Button,Card,CardActions,CardContent,CardMedia,IconButton,Tooltip,Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import userService from "../../../../Services/UserService";
import VacationModel from "../../../../Models/VacationModel";
import { vacationsStore } from "../../../../Redux/VacationState";
import {FlightTakeoff,FlightLand,ArrowRightAlt,CalendarMonth} from "@mui/icons-material";

interface VacationCardProps {
  vacation: VacationModel;
}

function UserDataCard(props: VacationCardProps): JSX.Element {
  const [isFollow, setIsFollow] = useState<number>(props.vacation.isFollowing);
  const [followersAmount, setFollowersAmount] = useState<number>(
    props.vacation.followersCount
  );
  const [color, setColor] = useState<string>("rgb(200, 200, 200)");

  // First time setting up like button color:
  useEffect(() => {
    isFollow === 1 ? setColor("pink") : setColor("rgb(200, 200, 200)");
  });

  // Format time so it looks nicer
  function formatTime(time: string): string {
    const d = new Date(time);
    return d.toLocaleDateString();
  }

  // // Updating in real time if user follows, unfollow vacation
  async function followVacation() {
    console.log(isFollow);

    if (isFollow) {
      setFollowersAmount(followersAmount - 1);
      setIsFollow(0);
      await userService.unFollowVacation(props.vacation.vacationId);
    } else {
      setFollowersAmount(followersAmount + 1);
      setIsFollow(1);
      await userService.followVacation(props.vacation.vacationId);
    }
  }

  return (
    <div className="DataCard BoxCard">
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          className="background"
          sx={{ height: 400 }}
          image={`${props.vacation.imageUrl}`}
          title={props.vacation.destination}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.vacation.destination}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.vacation.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <CalendarMonth fontSize="small" color="primary" />
            <span> - </span>
            {formatTime(props.vacation.startDate)}
            <span> - </span>
            {formatTime(props.vacation.endDate)}
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Like">
            <IconButton aria-label="add to favorites" onClick={followVacation}>
              <FavoriteIcon style={{ color: color}} />
              {followersAmount}
            </IconButton>
          </Tooltip>
          <Button size="small" variant="contained" fullWidth>
            {props.vacation.price}$
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default UserDataCard;
