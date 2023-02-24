class AppConfig {

    // public for all - Login/register:
    public registerUrl = "http://localhost:4000/api/auth/register/"; // POST
    public loginUrl = "http://localhost:4000/api/auth/login/"; // POST

    // only for logged in users:
    public userVacation ="http://localhost:4000/api/users/vacations/"; // GET

    // Follow vacation or unfollow
    public followVacation = "http://localhost:4000/api/users/follow/" // POST + VacationId
    public unFollowVacation = "http://localhost:4000/api/users/unfollow/" // POST + VacationId

    // only for admin:
    public adminGetOneVacation = "http://localhost:4000/api/admin/vacation/" // GET + vacationId
    public addVacation ="http://localhost:4000/api/admin/vacations/"; // POST 
    public deleteVacation ="http://localhost:4000/api/admin/vacations/"; // DELETE + vacation id
    public updateVacation = "http://localhost:4000/api/admin/vacations/"; // PUT vacation id
}

const appConfig = new AppConfig();

export default appConfig;
