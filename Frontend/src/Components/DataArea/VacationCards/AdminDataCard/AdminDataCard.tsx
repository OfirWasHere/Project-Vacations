import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import VacationModel from "../../../../Models/VacationModel";
import "./AdminDataCard.css";
import notify from "../../../../Utils/Notify";
import { CalendarMonth, DeleteForever } from "@mui/icons-material";
import BrushIcon from '@mui/icons-material/Brush';
import { useNavigate } from "react-router-dom";

interface VacationCardProps {
  vacation: VacationModel;
  deleteVacation: (vacationId: number) => Promise<void>;
}

function AdminDataCard(props: VacationCardProps): JSX.Element {
  // Format time so it looks nicer
  function formatTime(time: string): string {
    const d = new Date(time);
    return d.toLocaleDateString();
  }

  async function deleteMe() {
    try {
      if (!window.confirm("Are you sure?")) return;
      await props.deleteVacation(props.vacation.vacationId);
      notify.success("Vacation has been deleted");
    } catch (error: any) {
      notify.error(error.message);
    }
  }

  // Navigating to edit page if onclick
  const navigate = useNavigate();
  function editPage(){
    navigate("/edit/"+props.vacation.vacationId)
  }

  return (
    <div className="DataCard BoxCard adminCard">
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
          {/* Description */}
          <Typography variant="body2" color="text.primary">
            {props.vacation.description}
          </Typography>
          {/* dates */}
          <Typography variant="body2" color="text.secondary">
            <CalendarMonth fontSize="small" color="primary"/>
            <span> - </span>
            {formatTime(props.vacation.startDate)}
            <span> - </span>
            {formatTime(props.vacation.endDate)}
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Edit Vacation">
            <IconButton aria-label="Edit Vacation" onClick={editPage}>
              <BrushIcon className="editLink"/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Vacation">
            <IconButton aria-label="Delete Vacation" onClick={deleteMe}>
              <DeleteForever className="editLink"/>
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

export default AdminDataCard;
