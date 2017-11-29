Mealpler.service('WeekModel', WeekModel);

function WeekModel () {
   const week = [
       {id: 0, name: 'Sun', fullName: 'Sunday'},
       {id: 1, name: 'Mon', fullName: 'Monday'},
       {id: 2, name: 'Tue', fullName: 'Tuesday'},
       {id: 3, name: 'Wed', fullName: 'Wednesday'},
       {id: 4, name: 'Thu', fullName: 'Thursday'},
       {id: 4, name: 'Fri', fullName: 'Friday'},
       {id: 6, name: 'Sat', fullName: 'Saturday'},
   ];
   this.weekDays = () => week;
}